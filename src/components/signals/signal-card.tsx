'use client';

import React from 'react';
import { CorporateSignal } from '@/types/api';
import { Sparkles, Calendar, ExternalLink, MapPin, DollarSign, ArrowRight } from 'lucide-react';

interface SignalCardProps {
  signal: CorporateSignal;
  onMatchClick: (signal: CorporateSignal) => void;
}

export default function SignalCard({ signal, onMatchClick }: SignalCardProps) {
  // Intent Score Badge styling
  const getIntentBadge = (score: number) => {
    if (score >= 80) {
      return {
        label: `High Intent ${score}%`,
        className: 'bg-emerald-100 text-emerald-800 border-emerald-200 font-bold',
      };
    }
    if (score >= 50) {
      return {
        label: `Medium Intent ${score}%`,
        className: 'bg-amber-100 text-amber-800 border-amber-200 font-semibold',
      };
    }
    return {
      label: `Low Intent ${score}%`,
      className: 'bg-slate-100 text-slate-700 border-slate-200 font-medium',
    };
  };

  const intentBadge = getIntentBadge(signal.intent_score);

  // Format currency
  const formatIDR = (num: number | null) => {
    if (!num) return 'TIDAK TERTERA';
    if (num >= 1000000000) {
      return `Rp ${(num / 1000000000).toLocaleString('id-ID', { maximumFractionDigits: 1 })} M`;
    }
    return `Rp ${(num / 1000000).toLocaleString('id-ID', { maximumFractionDigits: 1 })} Jt`;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group">
      <div>
        {/* Header: Company Name & Intent Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {signal.industry_sector}
            </span>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              {signal.company_name}
            </h3>
          </div>

          <span
            className={`px-2.5 py-1 text-xs rounded-full border shrink-0 flex items-center gap-1 ${intentBadge.className}`}
          >
            <Sparkles className="w-3 h-3" />
            <span>{intentBadge.label}</span>
          </span>
        </div>

        {/* Source Badge & Date */}
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded uppercase">
            {signal.source_type.replace('_', ' ')}
          </span>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{new Date(signal.published_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
        </div>

        {/* Summary Description */}
        <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
          {signal.summary}
        </p>

        {/* Key Signal Attributes */}
        <div className="space-y-2 border-t border-b border-slate-100 py-3 mb-4 text-xs">
          <div className="flex items-center justify-between text-slate-700">
            <span className="font-semibold text-slate-500">Pilar ESG / CSR:</span>
            <span className="font-bold text-slate-900 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-100">
              {signal.extracted_pillar}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-700">
            <span className="font-semibold text-slate-500">Estimasi Anggaran:</span>
            <span className="font-bold text-slate-900 flex items-center gap-0.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>{formatIDR(signal.estimated_budget_signal)}</span>
            </span>
          </div>

          {signal.target_regions && signal.target_regions.length > 0 && (
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-semibold text-slate-500">Wilayah Target:</span>
              <span className="flex items-center gap-1 text-slate-800 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{signal.target_regions.join(', ')}</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Action Buttons */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <a
          href={signal.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors"
        >
          <span>Dokumen Sumber</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <button
          onClick={() => onMatchClick(signal)}
          className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 rounded-lg shadow-sm flex items-center gap-1.5 transition-all group-hover:shadow"
        >
          <span>Match Program AI</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
