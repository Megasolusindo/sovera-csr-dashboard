'use client';

import React, { useState } from 'react';
import { DealPipelineItem, DealStage } from '@/types/api';
import { DollarSign, ChevronLeft, ChevronRight, Sparkles, XCircle, RotateCcw, MoreVertical, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface DealCardProps {
  deal: DealPipelineItem;
  onMoveStage: (dealId: string, currentStage: DealStage, direction: 'prev' | 'next') => void;
  onUpdateStage?: (dealId: string, targetStage: DealStage) => void;
}

const stageOrder: DealStage[] = [
  'DISCOVERED',
  'RESEARCH',
  'PITCHED',
  'NEGOTIATION',
  'CLOSED_WON',
  'CLOSED_LOST',
];

const stageLabels: Record<DealStage, string> = {
  DISCOVERED: '1. Discovered',
  RESEARCH: '2. Research',
  PITCHED: '3. Pitched',
  NEGOTIATION: '4. Negotiation',
  CLOSED_WON: '5. Closed-Won',
  CLOSED_LOST: '6. Closed-Lost',
};

export default function DealCard({ deal, onMoveStage, onUpdateStage }: DealCardProps) {
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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

  // Helper to format human readable program name
  const getProgramDisplayName = (id?: string | null, name?: string | null) => {
    if (name && name.trim() !== '') return name;
    if (!id) return 'Program Unggulan CSR';

    const programMap: Record<string, string> = {
      'prog_01_beasiswa': 'Beasiswa Vokasi Digital 3T',
      'prog_02_pesantren': 'Elektrifikasi 50 Pesantren',
      'prog_03_mangrove': 'Restorasi Hutan Mangrove & ESG',
      'prog_04_modal_umkm': 'Modal Usaha UMKM Pesisir',
    };

    if (programMap[id]) return programMap[id];

    // Fallback for UUIDs or raw IDs
    return 'Beasiswa & Pemberdayaan Ekonomi';
  };

  const handleSetStage = (targetStage: DealStage) => {
    if (onUpdateStage) {
      onUpdateStage(deal.id, targetStage);
    }
    setShowMenu(false);
    setShowConfirmCancel(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all space-y-3 group relative">
      {/* Header: Company Name & Estimated Value */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
            {deal.company_name}
          </h4>
          <span className="text-[11px] font-semibold text-slate-500 block mt-0.5">
            ID: {deal.id}
          </span>
        </div>

        <div className="flex items-start gap-1.5 shrink-0">
          <div className="text-right">
            <span className="text-sm font-extrabold text-emerald-700 flex items-center justify-end gap-0.5">
              <DollarSign className="w-3.5 h-3.5" />
              <span>{formatIDR(deal.estimated_value || 0)}</span>
            </span>
          </div>

          {/* Quick Dropdown Menu Button */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              title="Opsi Deal"
              className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-6 w-48 bg-white border border-slate-200 rounded-lg shadow-xl z-20 py-1 text-xs space-y-0.5">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  Pindahkan Tahap
                </div>
                {stageOrder.map((stg) => (
                  <button
                    key={stg}
                    onClick={() => handleSetStage(stg)}
                    className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between ${deal.deal_stage === stg ? 'font-bold text-emerald-700 bg-emerald-50/50' : 'text-slate-700'
                      }`}
                  >
                    <span>{stageLabels[stg]}</span>
                    {deal.deal_stage === stg && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                ))}
                {deal.deal_stage !== 'CLOSED_LOST' && (
                  <div className="border-t border-slate-100 pt-1 mt-1">
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        setShowConfirmCancel(true);
                      }}
                      className="w-full text-left px-3 py-1.5 text-rose-700 hover:bg-rose-50 flex items-center gap-1.5 font-semibold"
                    >
                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Batalkan Deal</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Target Program & Notes */}
      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1 text-xs">
        <div className="flex items-center justify-between text-slate-600 font-medium">
          <span>Target Program:</span>
          <span
            className="font-bold text-emerald-800 truncate max-w-[170px]"
            title={getProgramDisplayName(deal.target_program_id, (deal as any).target_program_name)}
          >
            {getProgramDisplayName(deal.target_program_id, (deal as any).target_program_name)}
          </span>
        </div>

        {deal.notes && (
          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed pt-1 border-t border-slate-200/60">
            {deal.notes}
          </p>
        )}
      </div>

      {/* Confirmation Inline Banner for Cancel */}
      {showConfirmCancel ? (
        <div className="bg-rose-50 border border-rose-200 rounded-lg p-2 flex items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-rose-800 text-[11px]">Batalkan deal ini?</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleSetStage('CLOSED_LOST')}
              className="px-2 py-0.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] rounded transition-colors shadow-2xs"
            >
              Ya, Batal
            </button>
            <button
              onClick={() => setShowConfirmCancel(false)}
              className="px-2 py-0.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium text-[11px] rounded transition-colors"
            >
              Tidak
            </button>
          </div>
        </div>
      ) : (
        /* Action Bar: Stage Navigation & Proposal Studio Link */
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

            {/* Direct Cancel Button for active deals */}
            {deal.deal_stage !== 'CLOSED_LOST' && (
              <button
                onClick={() => setShowConfirmCancel(true)}
                title="Batalkan Deal (Pindahkan ke Closed-Lost)"
                className="px-2 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-[11px] flex items-center gap-1 transition-colors border border-rose-100"
              >
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>Batal</span>
              </button>
            )}

            {/* Restore button if deal is in CLOSED_LOST */}
            {deal.deal_stage === 'CLOSED_LOST' && (
              <button
                onClick={() => handleSetStage('DISCOVERED')}
                title="Pulihkan Deal ke Tahap Discovered"
                className="px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-[11px] flex items-center gap-1 transition-colors border border-blue-100"
              >
                <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
                <span>Pulihkan</span>
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
      )}
    </div>
  );
}

