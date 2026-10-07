'use client';

import React, { useState } from 'react';
import { Building2, Search, ShieldCheck, MapPin } from 'lucide-react';
import { useRecommendedOrganizations } from '@/hooks/useIntelligence';
import QueryError from '@/components/shared/query-error';

// The directory lists the organizations the platform holds (the same source as the Intelligence page).
// It used to be four fixed entries with invented ratings, verification and beneficiary counts.
export default function NGODirectoryPage() {
  const [search, setSearch] = useState('');
  const { data, isLoading, isError, error, refetch } = useRecommendedOrganizations({ search });
  const organizations = data?.data ?? [];

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">NGO Directory</h1>
        <p className="text-sm text-slate-500 mt-1">Lembaga NGO, yayasan, dan pengelola zakat yang tercatat di platform.</p>
      </div>

      <div className="relative bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <Search className="w-4 h-4 text-slate-400 absolute left-7 top-7" />
        <input
          type="text"
          placeholder="Cari nama lembaga..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-slate-500 font-medium">Memuat direktori...</div>
      ) : isError ? (
        <QueryError title="Direktori tidak dapat dimuat." error={error} onRetry={() => refetch()} />
      ) : organizations.length === 0 ? (
        <div className="p-12 text-center text-slate-500 bg-white border border-slate-200 rounded-2xl text-sm">
          {search ? 'Tidak ada lembaga yang cocok dengan pencarian.' : 'Belum ada lembaga yang tercatat.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {organizations.map((org) => (
            <div key={org.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-slate-500" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{org.name}</h3>
                    <div className="text-xs text-slate-500">{org.org_type}</div>
                  </div>
                </div>
                {org.is_verified && (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded border border-emerald-200 flex items-center gap-1 shrink-0">
                    <ShieldCheck className="w-3 h-3" />
                    Terverifikasi
                  </span>
                )}
              </div>

              {org.target_regions && org.target_regions.length > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{org.target_regions.join(', ')}</span>
                </div>
              )}

              {org.focus_areas && org.focus_areas.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {org.focus_areas.map((f) => (
                    <span key={f} className="px-2 py-0.5 text-[11px] bg-slate-100 text-slate-700 rounded border border-slate-200">
                      {f}
                    </span>
                  ))}
                </div>
              )}

              <div className="text-xs text-slate-500">
                {org.total_programs_count ?? 0} program tercatat, {org.active_programs_count ?? 0} aktif
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
