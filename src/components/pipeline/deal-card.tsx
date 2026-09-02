'use client';

import React from 'react';
import { DealPipelineItem, DealStage } from '@/types/api';
import { DollarSign, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface DealCardProps {
  deal: DealPipelineItem;
  onMoveStage: (dealId: string, currentStage: DealStage, direction: 'prev' | 'next') => void;
}

const stageOrder: DealStage[] = [
  'DISCOVERED',
  'RESEARCH',
  'PITCHED',
  'NEGOTIATION',
  'CLOSED_WON',
  'CLOSED_LOST',
];

export default function DealCard({ deal, onMoveStage }: DealCardProps) {
  const currentIndex = stageOrder.indexOf(deal.deal_stage);
  const canMovePrev = currentIndex > 0;
  const canMoveNext = currentIndex < stageOrder.length - 1;

  // Format currency
  const formatIDR = (num: number) => {
    if (num >= 1000000000) {
      return `Rp ${(num / 1000000000).toLocaleString('id-ID', { maximumFractionDigits: 1 })} M`;
    }
    return `Rp ${(num / 1000000).toLocaleString('id-ID', { maximumFractionDigits: 0 })} Jt`;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all space-y-3 group">
      {/* Header: Company Name & Estimated Value */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
            {deal.company_name}
          </h4>
          <span className="text-[11px] font-semibold text-slate-500 block mt-0.5">
            ID: {deal.id}
          </span>
        </div>

        <div className="text-right shrink-0">
          <span className="text-sm font-extrabold text-emerald-700 flex items-center justify-end gap-0.5">
            <DollarSign className="w-3.5 h-3.5" />
            <span>{formatIDR(deal.estimated_value || 0)}</span>
          </span>
        </div>
      </div>

      {/* Target Program & Notes */}
      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1 text-xs">
        <div className="flex items-center justify-between text-slate-600 font-medium">
          <span>Target Program:</span>
          <span className="font-bold text-slate-900 truncate max-w-[150px]">
            {deal.target_program_id || 'Program Unggulan'}
          </span>
        </div>

        {deal.notes && (
          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed pt-1 border-t border-slate-200/60">
            {deal.notes}
          </p>
        )}
      </div>

      {/* Action Bar: Stage Navigation & Proposal Studio Link */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
        <div className="flex items-center gap-1">
          {canMovePrev && (
            <button
              onClick={() => onMoveStage(deal.id, deal.deal_stage, 'prev')}
              title="Mundurkan Tahap"
              className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          )}

          {canMoveNext && (
            <button
              onClick={() => onMoveStage(deal.id, deal.deal_stage, 'next')}
              title="Majukan Tahap"
              className="p-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <Link
          href={`/pipeline/${deal.id}`}
          className="px-2.5 py-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-700 hover:text-white rounded transition-colors flex items-center gap-1 shadow-2xs"
        >
          <Sparkles className="w-3 h-3 text-emerald-600 group-hover:text-white" />
          <span>AI Proposal Studio</span>
        </Link>
      </div>
    </div>
  );
}
