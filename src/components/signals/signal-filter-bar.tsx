'use client';

import React from 'react';
import { Search, Filter, Sparkles, Building, X } from 'lucide-react';

interface SignalFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedIndustry: string;
  onIndustryChange: (industry: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  minIntent: number;
  onMinIntentChange: (intent: number) => void;
  onReset: () => void;
}

const industries = [
  { label: 'Semua Sektor', value: 'ALL' },
  { label: 'Telekomunikasi', value: 'Telekomunikasi' },
  { label: 'Perbankan & Keuangan', value: 'Perbankan' },
  { label: 'Otomotif & Industri', value: 'Otomotif' },
  { label: 'Energi & Pertambangan', value: 'Energi' },
];

const verificationStatuses = [
  { label: 'Semua Status Verifikasi', value: 'ALL' },
  { label: 'Terverifikasi (Tier A/B)', value: 'VERIFIED' },
  { label: 'Verifikasi Parsial', value: 'PARTIALLY_VERIFIED' },
  { label: 'Ditarik / Retraksi Data', value: 'RETRACTED' },
];

export default function SignalFilterBar({
  searchQuery,
  onSearchChange,
  selectedIndustry,
  onIndustryChange,
  selectedStatus,
  onStatusChange,
  minIntent,
  onMinIntentChange,
  onReset,
}: SignalFilterBarProps) {
  const hasActiveFilters = searchQuery !== '' || selectedIndustry !== 'ALL' || selectedStatus !== 'ALL' || minIntent > 0;

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4 font-sans">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari nama korporasi, pilar ESG, atau kata kunci sinyal..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Industry Sector Dropdown */}
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedIndustry}
            onChange={(e) => onIndustryChange(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            {industries.map((ind) => (
              <option key={ind.value} value={ind.value}>
                {ind.label}
              </option>
            ))}
          </select>
        </div>

        {/* Verification Status Dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            {verificationStatuses.map((st) => (
              <option key={st.value} value={st.value}>
                {st.label}
              </option>
            ))}
          </select>
        </div>

        {/* Intent Score Filters */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg shrink-0">
          <button
            onClick={() => onMinIntentChange(0)}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              minIntent === 0
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua Intent
          </button>

          <button
            onClick={() => onMinIntentChange(80)}
            className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              minIntent === 80
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-emerald-700'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>High Intent (&ge;80)</span>
          </button>
        </div>
      </div>

      {/* Active Filter Tags Bar */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span>Filter Aktif:</span>

          {selectedIndustry !== 'ALL' && (
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-medium rounded border border-emerald-200">
              Sektor: {selectedIndustry}
            </span>
          )}

          {selectedStatus !== 'ALL' && (
            <span className="px-2 py-0.5 bg-cyan-50 text-cyan-800 font-medium rounded border border-cyan-200">
              Verifikasi: {selectedStatus}
            </span>
          )}

          {minIntent > 0 && (
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-medium rounded border border-emerald-200">
              Intent Score &ge; {minIntent}
            </span>
          )}

          {searchQuery && (
            <span className="px-2 py-0.5 bg-slate-100 text-slate-800 font-medium rounded border border-slate-200">
              Kata Kunci: &quot;{searchQuery}&quot;
            </span>
          )}

          <button
            onClick={onReset}
            className="ml-auto text-xs text-emerald-700 hover:text-emerald-800 font-semibold underline"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}
