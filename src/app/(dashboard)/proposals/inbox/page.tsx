'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Search, Calendar, RefreshCw } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import QueryError, { errorMessage } from '@/components/shared/query-error';

interface IncomingProposal {
  id: string;
  title: string;
  summary?: string;
  budget_requested: number;
  status: string;
  reviewer_notes?: string;
  created_at: string;
}

const STATUS_LABEL: Record<string, string> = {
  SUBMITTED: 'Proposal Baru',
  UNDER_REVIEW: 'Dalam Penilaian',
  MEETING: 'Jadwal Pertemuan',
  ACCEPTED: 'Disetujui',
  REJECTED: 'Ditolak',
};

// The inbox shows the proposals the server holds for this corporate. It used to show three fixed
// proposals with invented NGO names and budgets.
export default function ProposalsInboxPage() {
  const [proposals, setProposals] = useState<IncomingProposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<unknown>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const load = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const res: any = await apiClient.get('/corporate/proposals');
      if (!Array.isArray(res?.data)) throw new Error('Respons proposal dari server tidak lengkap.');
      setProposals(res.data);
    } catch (err) {
      console.error('Failed to load proposals:', err);
      setProposals([]);
      setLoadError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // The status only changes in the list after the server confirmed it.
  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    setActionError(null);
    try {
      await apiClient.patch(`/corporate/proposals/${id}/status`, { status });
      setProposals((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    } catch (err) {
      setActionError(`Status proposal tidak berubah: ${errorMessage(err)}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const formatIDR = (n: number) => `Rp ${Number(n || 0).toLocaleString('id-ID')}`;

  const filtered = proposals.filter((p) => {
    const matchesSearch = (p.title || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Proposal Masuk</h1>
          <p className="text-sm text-slate-500 mt-1">Proposal program CSR/TJSL yang diajukan kepada perusahaan Anda.</p>
        </div>
        <button
          onClick={load}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 self-start"
          aria-label="Muat ulang"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loadError ? (
        <QueryError title="Proposal tidak dapat dimuat." error={loadError} onRetry={load} />
      ) : (
        <>
          {actionError && <QueryError title="Perubahan gagal." error={{ message: actionError }} />}

          <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Cari judul proposal..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="sm:w-56">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Semua Status</option>
                {Object.entries(STATUS_LABEL).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-slate-500 font-medium">Memuat proposal...</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-slate-500 bg-white border border-slate-200 rounded-2xl text-sm">
              {proposals.length === 0 ? 'Belum ada proposal masuk.' : 'Tidak ada proposal yang cocok.'}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((prop) => (
                <div key={prop.id} className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(prop.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <h3 className="font-bold text-slate-900 text-lg">{prop.title}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-slate-900">{formatIDR(prop.budget_requested)}</div>
                      <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {STATUS_LABEL[prop.status] || prop.status}
                      </span>
                    </div>
                  </div>

                  {prop.summary && (
                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">{prop.summary}</p>
                  )}

                  <div className="flex flex-wrap gap-2 pt-1">
                    {['UNDER_REVIEW', 'MEETING', 'ACCEPTED', 'REJECTED']
                      .filter((s) => s !== prop.status)
                      .map((s) => (
                        <button
                          key={s}
                          disabled={updatingId === prop.id}
                          onClick={() => updateStatus(prop.id, s)}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 rounded-lg"
                        >
                          {STATUS_LABEL[s]}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
