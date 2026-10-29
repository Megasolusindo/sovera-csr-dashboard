'use client';

import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { FileText, Loader2, RotateCcw, Save, CheckCircle2, AlertTriangle, Link2, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useDeals } from '@/hooks/useDeals';
import BudgetTable, { BudgetRow, MAX_BUDGET_ITEMS, newBudgetRow } from '@/components/google-docs/budget-table';
import PreviewPanel, { PreviewState } from '@/components/google-docs/preview-panel';
import DocHistory from '@/components/google-docs/doc-history';
import { errorMessage } from '@/components/shared/query-error';
import {
  apiErrorCode,
  GOOGLE_ERROR_MESSAGES,
  GoogleDocRequest,
  JOB_TIMEOUT_MS,
  useCreateGoogleDoc,
  useDraftProposalFields,
  AI_DRAFT_ERROR_MESSAGES,
  useGoogleDocJob,
  useGoogleIntegration,
} from '@/hooks/useGoogleDocs';

interface FormState {
  proposal_title: string;
  company_name: string;
  program_summary: string;
  target_beneficiaries: string;
  rows: BudgetRow[];
}

const emptyForm = (): FormState => ({
  proposal_title: '',
  company_name: '',
  program_summary: '',
  target_beneficiaries: '',
  rows: [newBudgetRow()],
});

const ADMIN_ROLES = new Set(['ORG_ADMIN', 'CORP_ADMIN']);
const SPLIT_KEY = 'sovera_gdocs_split';
const draftKey = (orgId?: string) => `sovera_gdocs_draft_${orgId || 'anon'}`;

// Browser storage can be unavailable (private windows, blocked site data): every access is guarded.
function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function writeStorage(key: string, value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

// Mirrors the API's validation so most mistakes are caught before a request is sent.
function validate(f: FormState): Record<string, string> {
  const e: Record<string, string> = {};
  if (!f.proposal_title.trim()) e.proposal_title = 'Judul proposal wajib diisi.';
  else if (f.proposal_title.trim().length > 255) e.proposal_title = 'Maksimal 255 karakter.';
  if (!f.company_name.trim()) e.company_name = 'Nama perusahaan wajib diisi.';
  else if (f.company_name.trim().length > 255) e.company_name = 'Maksimal 255 karakter.';
  if (f.program_summary.length > 20000) e.program_summary = 'Maksimal 20.000 karakter.';
  if (f.target_beneficiaries.length > 5000) e.target_beneficiaries = 'Maksimal 5.000 karakter.';
  if (f.rows.length > MAX_BUDGET_ITEMS) e.rows = `Maksimal ${MAX_BUDGET_ITEMS} item.`;
  for (const r of f.rows) {
    if (!r.description.trim()) e[`${r.id}.description`] = 'Wajib diisi.';
    const q = Number(r.quantity);
    if (!Number.isInteger(q) || q <= 0) e[`${r.id}.quantity`] = 'Bilangan bulat > 0.';
    const p = Number(r.unit_price || '0');
    if (!Number.isInteger(p) || p < 0) e[`${r.id}.unit_price`] = 'Bilangan bulat ≥ 0.';
  }
  return e;
}

function toRequest(f: FormState, dealId: string | null): GoogleDocRequest {
  return {
    ...(dealId ? { deal_id: dealId } : {}),
    proposal_title: f.proposal_title.trim(),
    company_name: f.company_name.trim(),
    program_summary: f.program_summary.trim(),
    target_beneficiaries: f.target_beneficiaries.trim(),
    budget_items: f.rows.map((r) => ({
      description: r.description.trim(),
      quantity: Number(r.quantity),
      unit_price: Number(r.unit_price || '0'),
    })),
  };
}

const fieldClass =
  'w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 disabled:bg-slate-50';

function GoogleDocsGenerator() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const dealId = searchParams.get('deal_id');
  const { data: deals } = useDeals();
  const integration = useGoogleIntegration();
  const create = useCreateGoogleDoc();
  const draftAI = useDraftProposalFields();
  const queryClient = useQueryClient();
  const [aiNote, setAiNote] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [draftNote, setDraftNote] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [preview, setPreview] = useState<PreviewState>({ kind: 'idle' });
  const [tab, setTab] = useState<'form' | 'preview'>('form');
  const job = useGoogleDocJob(preview.kind === 'waiting' ? jobId : null);

  // Restore the saved draft once.
  const restored = useRef(false);
  useEffect(() => {
    if (restored.current || !user) return;
    restored.current = true;
    const raw = readStorage(draftKey(user.org_id));
    if (!raw) return;
    try {
      const d = JSON.parse(raw) as FormState;
      if (d && Array.isArray(d.rows)) {
        setForm(d);
        setDraftNote('Draf tersimpan dimuat.');
      }
    } catch {
      /* a corrupt draft is ignored */
    }
  }, [user]);

  // Prefill from the deal the user came from (AI Proposal Studio), without overwriting typed text.
  const prefilled = useRef(false);
  useEffect(() => {
    if (prefilled.current || !dealId || !deals) return;
    const deal = deals.find((d) => d.id === dealId);
    if (!deal) return;
    prefilled.current = true;
    setForm((f) => ({
      ...f,
      company_name: f.company_name || deal.company_name,
      proposal_title: f.proposal_title || (deal.target_program_name ? `Proposal ${deal.target_program_name}` : ''),
    }));
  }, [dealId, deals]);

  // Follow the job.
  useEffect(() => {
    if (preview.kind !== 'waiting') return;
    const data = job.data;
    if (job.isError) {
      setPreview({ kind: 'failed', code: apiErrorCode(job.error), message: job.error?.message });
      return;
    }
    if (!data) return;
    if (data.status === 'completed') {
      setPreview({ kind: 'done', job: data, reloadKey: Date.now() });
      setTab('preview');
      queryClient.invalidateQueries({ queryKey: ['google-doc-jobs'] });
    } else if (data.status === 'failed') {
      setPreview({ kind: 'failed', code: data.error_code, message: data.error_message });
      setTab('preview');
      queryClient.invalidateQueries({ queryKey: ['google-doc-jobs'] });
    } else if (data.status !== preview.status) {
      setPreview({ kind: 'waiting', status: data.status });
    }
  }, [job.data, job.isError, job.error, preview, queryClient]);

  // Stop waiting after the timeout; the job may still finish and appear in the history.
  useEffect(() => {
    if (preview.kind !== 'waiting' || !jobId) return;
    const t = setTimeout(() => setPreview({ kind: 'timeout' }), JOB_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [preview.kind, jobId]);

  const busy = preview.kind === 'waiting';
  const connected = integration.data?.connected === true;
  const integrationCode = apiErrorCode(integration.error);
  const canReconnect = !!user && ADMIN_ROLES.has(user.role);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

  const submit = useCallback(() => {
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      setTab('form');
      return;
    }
    setPreview({ kind: 'waiting', status: 'submitting' });
    setTab('preview');
    create.mutate(toRequest(form, dealId), {
      onSuccess: (res) => {
        setJobId(res.job_id);
        setPreview({ kind: 'waiting', status: res.status === 'processing' ? 'processing' : 'queued' });
      },
      onError: (err) => setPreview({ kind: 'failed', code: apiErrorCode(err), message: err.message }),
    });
  }, [form, dealId, create]);

  // Fills the summary, beneficiaries and budget table with an AI draft of the deal's proposal.
  // Typed content is only replaced after confirmation; budget figures are estimates to review.
  const fillFormWithAI = () => {
    if (!dealId) return;
    const hasContent =
      form.program_summary.trim() !== '' ||
      form.target_beneficiaries.trim() !== '' ||
      form.rows.some((r) => r.description.trim() !== '' || r.unit_price.trim() !== '');
    if (hasContent && !window.confirm('Ganti ringkasan, penerima manfaat, dan rincian anggaran yang sudah diisi dengan draf AI?')) return;
    setAiNote(null);
    draftAI.mutate(dealId, {
      onSuccess: (d) => {
        setForm((f) => ({
          ...f,
          program_summary: d.program_summary,
          target_beneficiaries: d.target_beneficiaries,
          rows: d.budget_items.map((it) => ({
            ...newBudgetRow(),
            description: it.description,
            quantity: String(it.quantity),
            unit_price: String(it.unit_price),
          })),
        }));
        setErrors({});
        setAiNote(
          `Draf AI dimuat (${d.budget_items.length} item anggaran). Angka anggaran adalah estimasi: periksa dan sunting sebelum membuat dokumen.`,
        );
      },
      onError: (err) => {
        const code = apiErrorCode(err);
        setAiNote((code && AI_DRAFT_ERROR_MESSAGES[code]) || `Draf AI gagal dibuat: ${errorMessage(err)}`);
      },
    });
  };

  const saveDraft = () => {
    writeStorage(draftKey(user?.org_id), JSON.stringify(form));
    setDraftNote('Draf disimpan di browser ini.');
  };
  const reset = () => {
    setForm(emptyForm());
    setErrors({});
    writeStorage(draftKey(user?.org_id), null);
    setDraftNote(null);
    setPreview({ kind: 'idle' });
    setJobId(null);
  };

  // Resizable split: the left panel's width in percent, remembered per browser.
  const containerRef = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(45);
  useEffect(() => {
    const v = Number(readStorage(SPLIT_KEY));
    if (v >= 30 && v <= 70) setSplit(v);
  }, []);
  const startDrag = (e: React.PointerEvent) => {
    e.preventDefault();
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    let last = split;
    const move = (ev: PointerEvent) => {
      last = Math.min(70, Math.max(30, ((ev.clientX - rect.left) / rect.width) * 100));
      setSplit(last);
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      writeStorage(SPLIT_KEY, String(Math.round(last)));
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  const nudge = (delta: number) =>
    setSplit((s) => {
      const v = Math.min(70, Math.max(30, s + delta));
      writeStorage(SPLIT_KEY, String(v));
      return v;
    });

  const formPanel = (
    <div className="space-y-5">
      {/* Google connection banner */}
      {integration.isLoading ? null : integrationCode === 'FEATURE_DISABLED' ? (
        <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600">
          {GOOGLE_ERROR_MESSAGES.FEATURE_DISABLED}
        </div>
      ) : connected ? (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span className="truncate">
            Dokumen dibuat di Google Drive <strong>{integration.data?.google_email}</strong>
          </span>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex flex-wrap items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span className="flex-1">
            {integration.data?.status === 'expired' || integration.data?.status === 'error'
              ? 'Akses ke akun Google kedaluwarsa.'
              : 'Akun Google organisasi belum terhubung.'}
            {!canReconnect && ' Minta Administrator organisasi untuk menghubungkannya.'}
          </span>
          {canReconnect && (
            <Link href="/settings/integrations" className="font-bold underline flex items-center gap-1">
              <Link2 className="w-3.5 h-3.5" /> Hubungkan
            </Link>
          )}
        </div>
      )}

      <fieldset disabled={busy} className="space-y-4">
        {dealId ? (
          <div className="p-3 rounded-xl bg-violet-50 border border-violet-200">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-violet-900 flex-1 min-w-[180px]">
                Susun ringkasan, penerima manfaat, dan estimasi anggaran dari program target dan data perusahaan deal ini.
              </p>
              <button
                type="button"
                onClick={fillFormWithAI}
                disabled={draftAI.isPending}
                className="px-3 py-1.5 rounded-lg bg-violet-700 hover:bg-violet-800 text-white text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50"
              >
                {draftAI.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                {draftAI.isPending ? 'Menyusun...' : 'Isi formulir dengan AI'}
              </button>
            </div>
            {aiNote && (
              <p className="text-[11px] text-violet-800 mt-2" role="status">
                {aiNote}
              </p>
            )}
          </div>
        ) : (
          <p className="text-[11px] text-slate-400">
            Buka generator dari AI Proposal Studio di Deal Pipeline untuk mengisi formulir dengan AI.
          </p>
        )}
        <div>
          <label htmlFor="proposal_title" className="block text-xs font-semibold text-slate-700 mb-1">
            Judul proposal <span className="text-rose-600">*</span>
          </label>
          <input
            id="proposal_title"
            className={fieldClass}
            value={form.proposal_title}
            maxLength={255}
            onChange={(e) => set('proposal_title', e.target.value)}
            placeholder="Program Pemberdayaan UMKM Hijau 2026"
          />
          {errors.proposal_title && <p className="text-[11px] text-rose-600 mt-1">{errors.proposal_title}</p>}
        </div>
        <div>
          <label htmlFor="company_name" className="block text-xs font-semibold text-slate-700 mb-1">
            Nama perusahaan tujuan <span className="text-rose-600">*</span>
          </label>
          <input
            id="company_name"
            className={fieldClass}
            value={form.company_name}
            maxLength={255}
            onChange={(e) => set('company_name', e.target.value)}
            placeholder="PT Nusantara Sejahtera"
          />
          {errors.company_name && <p className="text-[11px] text-rose-600 mt-1">{errors.company_name}</p>}
        </div>
        <div>
          <label htmlFor="program_summary" className="block text-xs font-semibold text-slate-700 mb-1">
            Ringkasan program
          </label>
          <textarea
            id="program_summary"
            className={`${fieldClass} min-h-[110px]`}
            value={form.program_summary}
            onChange={(e) => set('program_summary', e.target.value)}
            placeholder="Latar belakang, tujuan, dan kegiatan utama program."
          />
          {errors.program_summary && <p className="text-[11px] text-rose-600 mt-1">{errors.program_summary}</p>}
        </div>
        <div>
          <label htmlFor="target_beneficiaries" className="block text-xs font-semibold text-slate-700 mb-1">
            Sasaran penerima manfaat
          </label>
          <textarea
            id="target_beneficiaries"
            className={`${fieldClass} min-h-[70px]`}
            value={form.target_beneficiaries}
            onChange={(e) => set('target_beneficiaries', e.target.value)}
            placeholder="100 pelaku UMKM di Kabupaten Bogor"
          />
          {errors.target_beneficiaries && <p className="text-[11px] text-rose-600 mt-1">{errors.target_beneficiaries}</p>}
        </div>
        <div>
          <span className="block text-xs font-semibold text-slate-700 mb-1">Rincian anggaran</span>
          <BudgetTable rows={form.rows} onChange={(rows) => set('rows', rows)} disabled={busy} errors={errors} />
          {errors.rows && <p className="text-[11px] text-rose-600 mt-1">{errors.rows}</p>}
        </div>
      </fieldset>

      <div className="pt-2 space-y-2">
        <button
          onClick={submit}
          disabled={busy || !connected}
          className="w-full px-4 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold flex items-center justify-center gap-2"
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
          Buat Proposal &amp; Rincian Anggaran (Google Docs)
        </button>
        <div className="flex gap-2">
          <button
            onClick={saveDraft}
            disabled={busy}
            className="flex-1 px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" /> Simpan draf
          </button>
          <button
            onClick={reset}
            disabled={busy}
            className="flex-1 px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
        {draftNote && <p className="text-[11px] text-slate-500 text-center">{draftNote}</p>}
      </div>
    </div>
  );

  const previewPanel = (
    <PreviewPanel
      state={preview}
      googleEmail={integration.data?.google_email}
      canReconnect={canReconnect}
      onRetry={submit}
    />
  );

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
          <FileText className="w-6 h-6 text-emerald-700" />
          <span>Proposal Google Docs</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Susun proposal CSR dan rincian anggaran, lalu buat dokumennya langsung di Google Docs organisasi.
        </p>
      </div>

      {/* Below lg: one panel at a time */}
      <div className="lg:hidden flex rounded-xl border border-slate-200 bg-white p-1 text-sm font-semibold" role="tablist">
        {(['form', 'preview'] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg ${tab === t ? 'bg-emerald-700 text-white' : 'text-slate-600'}`}
          >
            {t === 'form' ? 'Formulir' : 'Pratinjau'}
          </button>
        ))}
      </div>

      <div ref={containerRef} className="lg:flex lg:h-[calc(100vh-12rem)] lg:min-h-[600px]">
        <div
          className={`${tab === 'form' ? 'block' : 'hidden'} lg:block bg-white border border-slate-200 rounded-2xl p-5 lg:overflow-y-auto`}
          style={{ flexBasis: `${split}%` }}
        >
          {formPanel}
        </div>
        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="Ubah lebar panel"
          aria-valuenow={Math.round(split)}
          aria-valuemin={30}
          aria-valuemax={70}
          tabIndex={0}
          onPointerDown={startDrag}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') nudge(-2);
            if (e.key === 'ArrowRight') nudge(2);
          }}
          className="hidden lg:flex w-3 mx-1 cursor-col-resize items-center justify-center group focus:outline-none"
        >
          <div className="w-1 h-12 rounded-full bg-slate-300 group-hover:bg-emerald-500 group-focus:bg-emerald-500" />
        </div>
        <div
          className={`${tab === 'preview' ? 'block' : 'hidden'} lg:block flex-1 min-w-0 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden min-h-[520px] lg:min-h-0`}
        >
          {previewPanel}
        </div>
      </div>

      <DocHistory dealId={dealId} title={dealId ? 'Riwayat dokumen untuk deal ini' : 'Riwayat dokumen'} />
    </div>
  );
}

export default function GoogleDocsGeneratorPage() {
  return (
    <Suspense fallback={null}>
      <GoogleDocsGenerator />
    </Suspense>
  );
}
