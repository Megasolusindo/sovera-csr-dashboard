'use client';

import React from 'react';
import { DealPipelineItem, DealStage } from '@/types/api';
import DealCard from './deal-card';

interface KanbanColumnProps {
  stage: DealStage;
  label: string;
  description: string;
  deals: DealPipelineItem[];
  onMoveStage: (dealId: string, currentStage: DealStage, direction: 'prev' | 'next') => void;
  onUpdateStage?: (dealId: string, targetStage: DealStage) => void;
}

const stageHeaderStyles: Record<DealStage, { bg: string; text: string; border: string }> = {
  DISCOVERED: { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-300' },
  RESEARCH: { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' },
  PITCHED: { bg: 'bg-indigo-50', text: 'text-indigo-800', border: 'border-indigo-200' },
  NEGOTIATION: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
  CLOSED_WON: { bg: 'bg-emerald-100', text: 'text-emerald-900', border: 'border-emerald-300' },
  CLOSED_LOST: { bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-200' },
};

export default function KanbanColumn({
  stage,
  label,
  description,
  deals,
  onMoveStage,
  onUpdateStage,
}: KanbanColumnProps) {
  const styles = stageHeaderStyles[stage];
  const totalValue = deals.reduce((sum, d) => sum + (d.estimated_value || 0), 0);

  const formatIDR = (num: number) => {
    if (num >= 1000000000) {
      return `Rp ${(num / 1000000000).toLocaleString('id-ID', { maximumFractionDigits: 1 })} M`;
    }
    return `Rp ${(num / 1000000).toLocaleString('id-ID', { maximumFractionDigits: 0 })} Jt`;
  };

  return (
    <div className="w-80 shrink-0 bg-slate-100/70 rounded-2xl border border-slate-200 p-3.5 flex flex-col max-h-[calc(100vh-220px)]">
      {/* Column Header */}
      <div className={`p-3 rounded-xl border ${styles.bg} ${styles.border} mb-3 shadow-2xs`}>
        <div className="flex items-center justify-between">
          <h3 className={`text-xs font-extrabold uppercase tracking-wider ${styles.text}`}>
            {label}
          </h3>
          <span className={`px-2 py-0.5 text-xs font-bold rounded-full bg-white shadow-2xs ${styles.text}`}>
            {deals.length}
          </span>
        </div>

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5 text-xs">
          <span className="text-slate-500 text-[11px]">{description}</span>
          <span className="font-bold text-slate-900">{formatIDR(totalValue)}</span>
        </div>
      </div>

      {/* Cards List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {deals.length > 0 ? (
          deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} onMoveStage={onMoveStage} onUpdateStage={onUpdateStage} />
          ))
        ) : (
          <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-xl text-xs text-slate-400">
            Belum ada deal di tahap ini
          </div>
        )}
      </div>
    </div>
  );
}
