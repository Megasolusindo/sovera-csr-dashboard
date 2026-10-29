'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, FileText, Loader2, RefreshCw, AlertTriangle, Link2, Info } from 'lucide-react';
import { GOOGLE_ERROR_MESSAGES, REAUTH_CODES, type GoogleDocJob } from '@/hooks/useGoogleDocs';

export type PreviewState =
  | { kind: 'idle' }
  | { kind: 'waiting'; status: 'submitting' | 'queued' | 'processing' }
  | { kind: 'done'; job: GoogleDocJob; reloadKey: number }
  | { kind: 'failed'; code?: string; message?: string }
  | { kind: 'timeout' };

interface PreviewPanelProps {
  state: PreviewState;
  googleEmail?: string;
  canReconnect: boolean;
  onRetry: () => void;
}

const STAGES: { key: 'submitting' | 'queued' | 'processing'; label: string }[] = [
  { key: 'submitting', label: 'Mengirim permintaan' },
  { key: 'queued', label: 'Dalam antrean' },
  { key: 'processing', label: 'Menyusun dokumen & tabel anggaran' },
];

export default function PreviewPanel({ state, googleEmail, canReconnect, onRetry }: PreviewPanelProps) {
  if (state.kind === 'idle') {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500">
        <FileText className="w-12 h-12 text-slate-300" />
        <p className="mt-3 text-sm font-semibold text-slate-700">Pratinjau dokumen muncul di sini</p>
        <p className="mt-1 text-xs max-w-xs">
          Isi formulir lalu klik <strong>Buat Proposal &amp; Rincian Anggaran (Google Docs)</strong>. Dokumen dibuat di
          Google Drive akun organisasi.
        </p>
      </div>
    );
  }

  if (state.kind === 'waiting') {
    const current = STAGES.findIndex((s) => s.key === state.status);
    return (
      <div className="h-full flex flex-col p-6" aria-busy="true" aria-live="polite">
        <ol className="space-y-2 mb-6">
          {STAGES.map((s, i) => (
            <li key={s.key} className={`flex items-center gap-2 text-sm ${i <= current ? 'text-slate-800' : 'text-slate-400'}`}>
              {i < current ? (
                <span className="w-4 h-4 rounded-full bg-emerald-500" />
              ) : i === current ? (
                <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
              ) : (
                <span className="w-4 h-4 rounded-full border-2 border-slate-300" />
              )}
              {s.label}
            </li>
          ))}
        </ol>
        <div className="flex-1 bg-white border border-slate-200 rounded-xl p-8 space-y-4 animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-2/3 mx-auto" />
          <div className="h-4 bg-slate-100 rounded w-1/2 mx-auto" />
          <div className="h-4 bg-slate-100 rounded w-full mt-8" />
          <div className="h-4 bg-slate-100 rounded w-11/12" />
          <div className="h-4 bg-slate-100 rounded w-4/5" />
          <div className="h-24 bg-slate-100 rounded w-full mt-6" />
        </div>
      </div>
    );
  }

  if (state.kind === 'done') {
    const { job, reloadKey } = state;
    return (
      <div className="h-full flex flex-col">
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-slate-200 bg-white">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">{job.proposal_title}</p>
            {job.duration_ms != null && (
              <p className="text-[11px] text-slate-500">Selesai dalam {(job.duration_ms / 1000).toFixed(1)} detik</p>
            )}
          </div>
          {job.document_url && (
            <a
              href={job.document_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Buka di Google Docs
            </a>
          )}
        </div>
        <div className="px-4 py-2 bg-blue-50 border-b border-blue-100 text-[11px] text-blue-800 flex items-start gap-1.5">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span>
            Pratinjau hanya tampil jika browser ini sedang login ke akun Google
            {googleEmail ? <strong> {googleEmail}</strong> : ' organisasi'}. Jika kosong atau meminta login, gunakan tombol
            Buka di Google Docs.
          </span>
        </div>
        {job.preview_url && (
          <iframe
            key={reloadKey}
            title={`Pratinjau ${job.proposal_title}`}
            src={`${job.preview_url}?t=${reloadKey}`}
            className="flex-1 w-full bg-white min-h-[480px]"
            referrerPolicy="no-referrer"
          />
        )}
      </div>
    );
  }

  const reauth = state.kind === 'failed' && !!state.code && REAUTH_CODES.has(state.code);
  const message =
    state.kind === 'timeout'
      ? 'Pembuatan dokumen memakan waktu lebih lama dari biasanya. Dokumen mungkin masih diproses; cek riwayat beberapa saat lagi atau coba lagi.'
      : (state.code && GOOGLE_ERROR_MESSAGES[state.code]) || state.message || 'Dokumen gagal dibuat.';

  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8" role="alert">
      <AlertTriangle className="w-10 h-10 text-amber-500" />
      <p className="mt-3 text-sm font-semibold text-slate-800">
        {state.kind === 'timeout' ? 'Masih menunggu' : 'Dokumen gagal dibuat'}
      </p>
      <p className="mt-1 text-xs text-slate-600 max-w-sm">{message}</p>
      <div className="flex gap-2 mt-4">
        {reauth ? (
          canReconnect ? (
            <Link
              href="/settings/integrations"
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2"
            >
              <Link2 className="w-4 h-4" /> Hubungkan ulang
            </Link>
          ) : (
            <p className="text-xs text-slate-500">Minta Administrator organisasi untuk menghubungkan ulang akun Google.</p>
          )
        ) : (
          <button
            onClick={onRetry}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Coba lagi
          </button>
        )}
      </div>
    </div>
  );
}
