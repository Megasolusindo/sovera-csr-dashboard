'use client';

import React, { useState } from 'react';
import KanbanBoard from '@/components/pipeline/kanban-board';
import { useDeals, useUpdateDealStage } from '@/hooks/useDeals';
import { DealStage } from '@/types/api';
import { Layers, Plus, Search, DollarSign, TrendingUp, CheckCircle2, RefreshCw } from 'lucide-react';

export default function PipelinePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: deals, isLoading, isError, refetch } = useDeals();
  const updateStageMutation = useUpdateDealStage();

  const handleMoveStage = (dealId: string, currentStage: DealStage, direction: 'prev' | 'next') => {
    const stageOrder: DealStage[] = [
      'DISCOVERED',
      'RESEARCH',
      'PITCHED',
      'NEGOTIATION',
      'CLOSED_WON',
      'CLOSED_LOST',
    ];
    const currentIndex = stageOrder.indexOf(currentStage);
    const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex >= 0 && nextIndex < stageOrder.length) {
      updateStageMutation.mutate({ dealId, stage: stageOrder[nextIndex] });
    }
  };

  const handleDirectUpdateStage = (dealId: string, targetStage: DealStage) => {
    updateStageMutation.mutate({ dealId, stage: targetStage });
  };

  const filteredDeals = deals?.filter((d) => {
    if (!searchQuery) return true;
    return (
      d.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.target_program_id?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }) || [];

  // Metrics
  const totalValue = filteredDeals.reduce((sum, d) => sum + (d.estimated_value || 0), 0);
  const closedWonDeals = filteredDeals.filter((d) => d.deal_stage === 'CLOSED_WON');
  const closedWonValue = closedWonDeals.reduce((sum, d) => sum + (d.estimated_value || 0), 0);

  const formatIDR = (num: number) => {
    if (num >= 1000000000) {
      return `Rp ${(num / 1000000000).toLocaleString('id-ID', { maximumFractionDigits: 2 })} M`;
    }
    return `Rp ${(num / 1000000).toLocaleString('id-ID', { maximumFractionDigits: 0 })} Jt`;
  };

  return (
    <div className="space-y-6">
      {/* Header & Metrics Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-emerald-700" />
            <span>B2B Deal Pipeline Kanban</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manajemen siklus penawaran CSR korporasi (Discovered hingga Closed-Won) dengan Optimistic UI.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-sm flex items-center gap-1.5 shrink-0 self-start sm:self-auto transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span>Muat Ulang Pipeline</span>
        </button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Total Nilai Pipeline</span>
            <span className="text-lg font-bold text-slate-900">{formatIDR(totalValue)}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Deals Aktif Dalam Proses</span>
            <span className="text-lg font-bold text-slate-900">{filteredDeals.length - closedWonDeals.length} Deals</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Realisasi Closed-Won</span>
            <span className="text-lg font-bold text-emerald-800">{formatIDR(closedWonValue)}</span>
          </div>
        </div>
      </div>

      {/* Search Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama korporasi atau target program..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Kanban Board */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-500">Memuat Papan Kanban Pipeline...</div>
      ) : isError ? (
        <div className="bg-rose-50 p-6 rounded-xl text-center text-rose-800 font-semibold">
          Gagal memuat data pipeline.
        </div>
      ) : (
        <KanbanBoard deals={filteredDeals} onMoveStage={handleMoveStage} onUpdateStage={handleDirectUpdateStage} />
      )}
    </div>
  );
}
