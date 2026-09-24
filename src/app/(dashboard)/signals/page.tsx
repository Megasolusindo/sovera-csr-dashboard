'use client';

import React, { useState } from 'react';
import SignalFilterBar from '@/components/signals/signal-filter-bar';
import SignalCard from '@/components/signals/signal-card';
import SignalSkeleton from '@/components/signals/signal-skeleton';
import MatchDrawer from '@/components/signals/match-drawer';
import { useSignals } from '@/hooks/useSignals';
import { useMatchPrograms } from '@/hooks/useMatchPrograms';
import { CorporateSignal, SignalMatchResponse } from '@/types/api';
import { Radio, RefreshCw } from 'lucide-react';

export default function SignalsPage() {
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [minIntent, setMinIntent] = useState(0);

  // Drawer States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSignal, setSelectedSignal] = useState<CorporateSignal | null>(null);
  const [matchData, setMatchData] = useState<SignalMatchResponse | null>(null);

  // Data Fetching Hooks
  const { data, isLoading, isError, refetch } = useSignals({
    search: searchQuery,
    industry: selectedIndustry,
    min_intent: minIntent,
  });

  const matchMutation = useMatchPrograms();

  const handleMatchClick = (signal: CorporateSignal) => {
    setSelectedSignal(signal);
    setIsDrawerOpen(true);
    setMatchData(null);

    // Trigger AI semantic matcher mutation
    matchMutation.mutate(signal.id, {
      onSuccess: (resData) => {
        setMatchData(resData);
      },
    });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedIndustry('ALL');
    setSelectedStatus('ALL');
    setMinIntent(0);
  };

  // Filter signals by selectedStatus client-side
  const filteredSignals = (data?.data || []).filter((sig) => {
    if (selectedStatus === 'ALL') return true;
    return sig.verification_status === selectedStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <Radio className="w-6 h-6 text-emerald-700" />
            <span>Corporate Intelligence Feed</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Umpan peluang kemitraan CSR, TJSL BUMN, dan Zakat Korporasi hasil pemindaian AI & BEI.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-sm flex items-center gap-1.5 shrink-0 self-start sm:self-auto transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span>Muat Ulang Feed</span>
        </button>
      </div>

      {/* Filter Bar */}
      <SignalFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedIndustry={selectedIndustry}
        onIndustryChange={setSelectedIndustry}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        minIntent={minIntent}
        onMinIntentChange={setMinIntent}
        onReset={handleResetFilters}
      />

      {/* Signals Grid or Skeleton Loaders */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SignalSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <div className="bg-rose-50 border border-rose-200 p-6 rounded-xl text-center text-rose-800 space-y-2">
          <h3 className="font-bold text-base">Gagal Memuat Feed Sinyal Intelijen</h3>
          <p className="text-xs text-rose-600">Terjadi kendala jaringan saat menghubungi server API.</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-1.5 text-xs font-bold bg-rose-700 text-white rounded-lg hover:bg-rose-800 transition-colors mt-2"
          >
            Coba Lagi
          </button>
        </div>
      ) : filteredSignals.length > 0 ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-500 px-1">
            <span>Menampilkan <strong>{filteredSignals.length}</strong> sinyal terkurasi</span>
            <span>Urutkan: Sinyal Terbaru</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSignals.map((signal) => (
              <SignalCard key={signal.id} signal={signal} onMatchClick={handleMatchClick} />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 p-12 rounded-xl text-center space-y-3">
          <Radio className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Sinyal Tidak Ditemukan</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Tidak ada prospek korporasi yang cocok dengan kata kunci atau filter intent yang Anda pilih.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-xs font-semibold bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors"
          >
            Reset Semua Filter
          </button>
        </div>
      )}

      {/* AI Vector Matcher Drawer */}
      <MatchDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        signal={selectedSignal}
        matchData={matchData}
        isLoading={matchMutation.isPending}
      />
    </div>
  );
}
