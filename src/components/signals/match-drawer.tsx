'use client';

import React from 'react';
import { CorporateSignal, SignalMatchResponse } from '@/types/api';
import { X, Sparkles, CheckCircle2, ArrowRight, BookOpen, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface MatchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  signal: CorporateSignal | null;
  matchData: SignalMatchResponse | null;
  isLoading: boolean;
}

export default function MatchDrawer({
  isOpen,
  onClose,
  signal,
  matchData,
  isLoading,
}: MatchDrawerProps) {
  const router = useRouter();

  if (!isOpen || !signal) return null;

  const handleClaimToPipeline = (programId: string) => {
    // Navigate to pipeline with deal creation parameter
    router.push(`/pipeline?action=create&signal_id=${signal.id}&program_id=${programId}&company=${encodeURIComponent(signal.company_name)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Slide-over Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 bg-emerald-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-300" />
              <h2 className="text-lg font-bold">Rekomendasi Match Program AI</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Target Signal Info Summary */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Target Prospek Korporasi
                </span>
                <span className="px-2 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 rounded border border-emerald-200">
                  Intent {signal.intent_score}%
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-500" />
                <span>{signal.company_name}</span>
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {signal.summary}
              </p>
            </div>

            {/* AI Vector Match Engine Results */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>3 Program Lembaga Paling Selaras</span>
                </h4>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Cosine Similarity
                </span>
              </div>

              {isLoading ? (
                <div className="space-y-4 py-8 text-center">
                  <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">Menghitung Vektor Semantik AI...</p>
                  <p className="text-xs text-slate-400">Mencocokkan profil CSR korporasi dengan portofolio program lembaga.</p>
                </div>
              ) : matchData && matchData.top_matched_programs ? (
                <div className="space-y-4">
                  {matchData.top_matched_programs.map((prog, index) => {
                    const matchPercent = Math.round(prog.similarity_score * 100);

                    return (
                      <div
                        key={prog.program_id}
                        className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                              Peringkat #{index + 1} Match
                            </span>
                            <h5 className="text-sm font-bold text-slate-900 mt-0.5">
                              {prog.title}
                            </h5>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-base font-extrabold text-emerald-700 block">
                              {matchPercent}%
                            </span>
                            <span className="text-[10px] font-semibold text-emerald-600 block">
                              Match Score
                            </span>
                          </div>
                        </div>

                        {/* Similarity Progress Bar */}
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${matchPercent}%` }}
                          />
                        </div>

                        {/* Metadata Pills */}
                        <div className="flex flex-wrap gap-2 text-[11px] pt-1">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-medium rounded">
                            Asnaf: {prog.asnaf_category}
                          </span>
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-medium rounded border border-emerald-100">
                            {prog.esg_pillar}
                          </span>
                        </div>

                        {/* Action CTA */}
                        <button
                          onClick={() => handleClaimToPipeline(prog.program_id)}
                          className="w-full mt-2 py-2 px-3 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-700 hover:text-white rounded-lg transition-colors flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Klaim ke Pipeline & Buat Deal</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-slate-500 text-sm">
                  Tidak ada data rekomendasi program yang ditemukan.
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
            <span>Sovera Vector Intelligence Engine</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-colors"
            >
              Tutup Drawer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
