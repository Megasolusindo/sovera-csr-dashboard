'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDeals } from '@/hooks/useDeals';
import { apiClient } from '@/lib/api-client';
import QueryError, { errorMessage } from '@/components/shared/query-error';
import { Sparkles, ArrowLeft, Download, Copy, CheckCircle2, FileText } from 'lucide-react';

type Tab = 'icebreaker' | 'pitchdeck' | 'proposal';

// Everything on this page comes from the deal the server sent. It used to fall back to an invented deal
// ("PT Telko Nusantara Tbk"), a canned ice-breaker, a fixed five-slide outline with made-up figures, and,
// when an export failed, a Markdown file written in the browser and offered as the proposal.
export default function DealStudioPage() {
  const params = useParams();
  const router = useRouter();
  const dealId = params.dealId as string;

  const { data: deals, isLoading, isError, error, refetch } = useDeals();
  const deal = deals?.find((d) => d.id === dealId);

  const [activeTab, setActiveTab] = useState<Tab>('icebreaker');
  const [copied, setCopied] = useState(false);
  const [customIcebreaker, setCustomIcebreaker] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  if (isLoading) {
    return <div className="p-12 text-center text-slate-500 font-medium">Memuat deal...</div>;
  }
  if (isError) {
    return <QueryError title="Deal tidak dapat dimuat." error={error} onRetry={() => refetch()} />;
  }
  if (!deal) {
    return (
      <div className="space-y-4">
        <div className="p-6 bg-white border border-slate-200 rounded-2xl text-sm text-slate-700">
          Deal dengan ID <code className="font-mono">{dealId}</code> tidak ditemukan di pipeline organisasi Anda.
        </div>
        <button
          onClick={() => router.push('/pipeline')}
          className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg"
        >
          Kembali ke pipeline
        </button>
      </div>
    );
  }

  const icebreaker = (customIcebreaker ?? deal.generated_icebreaker ?? '').trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(icebreaker);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setActionError(null);
    try {
      const data: any = await apiClient.post(`/deals/${dealId}/generate-pitch`, {
        tone: 'ZAKAT_WAQF_INSTITUTION',
        custom_notes: '',
      });
      if (!data?.icebreaker) throw new Error('Server tidak mengirim naskah ice-breaker.');
      setCustomIcebreaker(data.icebreaker);
    } catch (err) {
      setActionError(`Naskah gagal dibuat: ${errorMessage(err)}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = async (format: 'docx' | 'pdf' | 'pptx') => {
    setIsExporting(true);
    setActionError(null);
    try {
      const blob: Blob = await apiClient.post(`/deals/${dealId}/export?format=${format}`, null, { responseType: 'blob' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      const filePrefix = format === 'pptx' ? 'Pitch_Deck_CSR' : 'Proposal_CSR';
      link.download = `${filePrefix}_${(deal.company_name || 'Korporat').replace(/[^a-zA-Z0-9]/g, '_')}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      // No file is made up in the browser: a failed export is an error.
      setActionError(`Ekspor ${format.toUpperCase()} gagal: ${errorMessage(err)}`);
    } finally {
      setIsExporting(false);
    }
  };

  const tabClass = (tab: Tab) =>
    `pb-3 px-4 text-xs font-bold transition-all border-b-2 ${
      activeTab === tab ? 'border-emerald-700 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-900'
    }`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/pipeline')}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded border border-emerald-200 uppercase">
                {deal.deal_stage}
              </span>
              <span className="text-xs text-slate-500 font-semibold">Deal ID: {deal.id}</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-0.5">AI Proposal Studio: {deal.company_name}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            disabled={isExporting}
            onClick={() => handleExport('pptx')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-50 rounded-lg shadow-sm flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>{isExporting ? 'Mengunduh...' : 'Ekspor PPTX'}</span>
          </button>
          <button
            disabled={isExporting}
            onClick={() => handleExport('docx')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 rounded-lg shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor DOCX</span>
          </button>
          <button
            disabled={isExporting}
            onClick={() => handleExport('pdf')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 rounded-lg shadow-sm flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor PDF</span>
          </button>
        </div>
      </div>

      {actionError && <QueryError title="Tindakan gagal." error={{ message: actionError }} />}

      <div className="flex items-center gap-2 border-b border-slate-200">
        <button onClick={() => setActiveTab('icebreaker')} className={tabClass('icebreaker')}>
          1. AI Ice-Breaker
        </button>
        <button onClick={() => setActiveTab('pitchdeck')} className={tabClass('pitchdeck')}>
          2. Pitch Deck
        </button>
        <button onClick={() => setActiveTab('proposal')} className={tabClass('proposal')}>
          3. Draf Proposal
        </button>
      </div>

      {activeTab === 'icebreaker' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Naskah Pembuka (Ice-Breaker)</span>
            </h3>
            <div className="flex items-center gap-2">
              <button
                disabled={isGenerating}
                onClick={handleGenerate}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 rounded-lg shadow-sm flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                <span>{isGenerating ? 'Menyusun...' : icebreaker ? 'Hasilkan Ulang (AI)' : 'Hasilkan Naskah (AI)'}</span>
              </button>
              {icebreaker && (
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 flex items-center gap-1.5"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin' : 'Salin'}</span>
                </button>
              )}
            </div>
          </div>
          {icebreaker ? (
            <p className="text-sm text-slate-800 whitespace-pre-line leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {icebreaker}
            </p>
          ) : (
            <p className="text-sm text-slate-500">Belum ada naskah untuk deal ini. Klik tombol di atas untuk menyusunnya.</p>
          )}
        </div>
      )}

      {activeTab === 'pitchdeck' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-sm text-slate-600 space-y-2">
          <p>
            Tidak ada pratinjau slide di halaman ini. Pitch deck disusun saat Anda mengekspor PPTX, ke dalam template
            lembaga Anda (Pengaturan &gt; Template).
          </p>
        </div>
      )}

      {activeTab === 'proposal' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-base font-bold text-slate-900">Draf Proposal</h3>
          {deal.generated_proposal ? (
            <p className="text-sm text-slate-800 whitespace-pre-line leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {deal.generated_proposal}
            </p>
          ) : (
            <p className="text-sm text-slate-500">
              Belum ada draf proposal tersimpan untuk deal ini. Ekspor DOCX atau PDF untuk menyusunnya dari data deal.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
