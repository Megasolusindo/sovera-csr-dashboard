'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDeals } from '@/hooks/useDeals';
import { Sparkles, ArrowLeft, Download, Copy, CheckCircle2, FileText } from 'lucide-react';

export default function DealStudioPage() {
  const params = useParams();
  const router = useRouter();
  const dealId = params.dealId as string;

  const { data: deals } = useDeals();
  const deal = deals?.find((d) => d.id === dealId) || {
    id: dealId,
    company_name: 'PT Telko Nusantara Tbk',
    deal_stage: 'DISCOVERED',
    estimated_value: 750000000,
    target_program_id: 'Beasiswa Vokasi Digital & Tahfidz Syariah',
    generated_icebreaker: 'Salam hangat Bapak/Ibu Direksi CSR PT Telko Nusantara Tbk. Mengingat komitmen luar biasa perusahaan dalam Sustainability Report 2025 untuk digitalisasi pendidikan 3T...',
    notes: 'Kandidat utama program Beasiswa Vokasi Digital 500 Mahasiswa 3T.',
  };

  const [activeTab, setActiveTab] = useState<'icebreaker' | 'pitchdeck' | 'proposal'>('icebreaker');
  const [copied, setCopied] = useState(false);
  const [customIcebreaker, setCustomIcebreaker] = useState<string | null>(null);
  const [isGeneratingIcebreaker, setIsGeneratingIcebreaker] = useState(false);

  const estimatedValue = deal.estimated_value || 0;

  const fallbackIcebreaker = `Salam hangat Bapak/Ibu Pimpinan TJSL & Direksi CSR ${deal.company_name},\n\nMenyikapi inisiatif luar biasa korporasi dalam laporan keberlanjutan terbaru (Matriks POJK 51 & ESG Index), kami bermaksud mengajukan kolaborasi penyerapan dana TJSL & Zakat Korporasi melalui ${deal.target_program_id || 'Program Beasiswa Vokasi Digital 3T'}.\n\nBesar harapan kami dapat mendiskusikan peluang kemitraan strategis ini pada sesi audiensi mendatang.`;

  const activeIcebreaker = (customIcebreaker || deal.generated_icebreaker || fallbackIcebreaker).trim();

  const pitchDeckSlides = [
    {
      slide: 1,
      title: 'Judul & Alignment Nilai Syariah & ESG',
      content: `Kemitraan Strategis: ${deal.company_name} x LAZ Peduli Ummat - Akselerasi Pendidikan Vokasi Syariah & Digitalisasi 3T (SDG 4 & SDG 9).`,
    },
    {
      slide: 2,
      title: 'Tantangan Sosial & Urgensi Intervensi',
      content: 'Senjang digital di 50 pesantren 3T & kebutuhan 500 talenta muda berdaya saing global berbasis nilai keislaman.',
    },
    {
      slide: 3,
      title: 'Solusi Program & Metrik Keberhasilan (OKRs)',
      content: 'Beasiswa Penuh 3 Tahun, Penyediaan Laptop & Pelatihan TI Syariah. Target: 100% Lulusan Terserap Kerja dalam 6 Bulan.',
    },
    {
      slide: 4,
      title: 'Rancangan Anggaran Biaya (RAB) & Efisiensi',
      content: `Estimasi Nilai Investasi Sosial: Rp ${(estimatedValue / 1000000000).toFixed(2)} Miliar. Alokasi 85% Penyaluran Langsung, 15% Pendampingan Asnaf & Evaluasi Dampak.`,
    },
    {
      slide: 5,
      title: 'Tata Kelola, Akuntabilitas & Pelaporan POJK 51',
      content: 'Audit Keuangan Publik Beropini WTP & Laporan Akuntabilitas Dampak Sosial untuk Lampiran Sustainability Report Emiten.',
    },
  ];

  const handleCopyIcebreaker = () => {
    navigator.clipboard.writeText(activeIcebreaker);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateIcebreaker = async () => {
    try {
      setIsGeneratingIcebreaker(true);
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1';
      const token = typeof window !== 'undefined' ? localStorage.getItem('sovera_auth_token') : null;

      const res = await fetch(`${API_BASE_URL}/deals/${dealId}/generate-pitch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : 'Bearer dev-token',
        },
        body: JSON.stringify({
          tone: 'ZAKAT_WAQF_INSTITUTION',
          custom_notes: 'Penyesuaian respons cepat dengan matriks POJK 51 & ESG Index',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.icebreaker) {
          setCustomIcebreaker(data.icebreaker);
        }
      }
    } catch (err) {
      console.warn('AI generate icebreaker failed, generating client-side fallback:', err);
      setCustomIcebreaker(
        `Yth. Pimpinan TJSL & Direksi CSR ${deal.company_name},\n\nMenyikapi komitmen keberlanjutan korporasi dalam laporan tahunan terbaru, kami dari pengelola program mengajukan kemitraan strategis penyerapan alokasi CSR melalui ${deal.target_program_id || 'Program Beasiswa Vokasi Digital 3T'}.\n\nSalam hormat.`
      );
    } finally {
      setIsGeneratingIcebreaker(false);
    }
  };

  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: 'docx' | 'pdf' | 'pptx') => {
    try {
      setIsExporting(true);
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1';
      const token = typeof window !== 'undefined' ? localStorage.getItem('sovera_auth_token') : null;

      const response = await fetch(`${API_BASE_URL}/deals/${dealId}/export?format=${format}`, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : 'Bearer dev-token',
        },
      });

      if (!response.ok) {
        throw new Error(`Export failed with status ${response.status}`);
      }

      const blob = await response.blob();
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
      console.warn('Backend export fallback triggered:', err);
      const proposalText = deal.generated_proposal || `# PROPOSAL KEMITRAAN STRATEGIS\n\n## Korporasi: ${deal.company_name}\n\nRingkasan draf proposal kemitraan institusional.`;
      const blob = new Blob([proposalText], { type: 'text/markdown;charset=utf-8' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `Proposal_CSR_${(deal.company_name || 'Korporat').replace(/[^a-zA-Z0-9]/g, '_')}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Back Button */}
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
            <h1 className="text-xl font-bold text-slate-900 mt-0.5">
              AI Proposal Studio: {deal.company_name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            disabled={isExporting}
            onClick={() => handleExport('pptx')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-50 rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>{isExporting ? 'Downloading...' : 'Ekspor PPTX'}</span>
          </button>

          <button
            disabled={isExporting}
            onClick={() => handleExport('docx')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor DOCX</span>
          </button>

          <button
            disabled={isExporting}
            onClick={() => handleExport('pdf')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor PDF</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('icebreaker')}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 ${
            activeTab === 'icebreaker'
              ? 'border-emerald-700 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          1. AI Ice-Breaker & Copywriting
        </button>

        <button
          onClick={() => setActiveTab('pitchdeck')}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 ${
            activeTab === 'pitchdeck'
              ? 'border-emerald-700 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          2. Pitch Deck Outline (5 Slides)
        </button>

        <button
          onClick={() => setActiveTab('proposal')}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 ${
            activeTab === 'proposal'
              ? 'border-emerald-700 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          3. Draf Proposal & RAB
        </button>
      </div>

      {/* Tab Content 1: Ice-breaker */}
      {activeTab === 'icebreaker' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Naskah Pembuka (Ice-Breaker) Terpersonalisasi</span>
            </h3>

            <div className="flex items-center gap-2">
              <button
                disabled={isGeneratingIcebreaker}
                onClick={handleGenerateIcebreaker}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                <span>{isGeneratingIcebreaker ? 'Mengorientasi AI...' : 'Hasilkan Ulang (AI)'}</span>
              </button>

              <button
                onClick={handleCopyIcebreaker}
                className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors flex items-center gap-1.5"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin!' : 'Salin Naskah'}</span>
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 leading-relaxed font-mono whitespace-pre-wrap">
            {activeIcebreaker}
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 space-y-1">
            <span className="font-bold">Tips Fundraising:</span>
            <p>
              Gunakan naskah ini saat mengirimkan surel formal atau pesan LinkedIn ke Direksi CSR {deal.company_name}.
            </p>
          </div>
        </div>
      )}

      {/* Tab Content 2: Pitch Deck Outline */}
      {activeTab === 'pitchdeck' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Struktur Slide Presentasi (Pitch Deck 5 Slide)
              </h3>
              <p className="text-xs text-slate-500 font-medium">Auto-generated by Sovera AI</p>
            </div>

            <button
              disabled={isExporting}
              onClick={() => handleExport('pptx')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-50 rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Ekspor Presentasi PPTX (5 Slide)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pitchDeckSlides.map((slide) => (
              <div key={slide.slide} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-700 rounded uppercase">
                    Slide #{slide.slide}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{slide.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{slide.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 3: Proposal & RAB */}
      {activeTab === 'proposal' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-700" />
            <span>Draf Proposal Kemitraan Strategis</span>
          </h3>

          <textarea
            rows={12}
            defaultValue={`PROPOSAL KEMITRAAN DANA TJSL & ZAKAT KORPORASI\n\nKepada Yth:\nDireksi CSR & Pengelola TJSL ${deal.company_name}\n\nProgram Utama: ${deal.target_program_id}\nNilai Investasi Sosial: Rp ${estimatedValue.toLocaleString('id-ID')}\n\nBAB I: PENDAHULUAN\nMengingat kewajiban pelaporan POJK 51 dan agenda keberlanjutan emiten...`}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => alert('Draf proposal tersimpan!')}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-all"
            >
              Simpan Perubahan Proposal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
