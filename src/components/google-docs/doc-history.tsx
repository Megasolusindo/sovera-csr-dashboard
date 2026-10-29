'use client';

import React, { useState } from 'react';
import { ExternalLink, Loader2, History, ChevronLeft, ChevronRight } from 'lucide-react';
import QueryError from '@/components/shared/query-error';
import { apiErrorCode, GOOGLE_ERROR_MESSAGES, useGoogleDocJobs, type GoogleDocJobStatus } from '@/hooks/useGoogleDocs';

const STATUS: Record<GoogleDocJobStatus, { label: string; className: string }> = {
  queued: { label: 'Antre', className: 'bg-slate-100 text-slate-700 border-slate-200' },
  processing: { label: 'Diproses', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  completed: { label: 'Selesai', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  failed: { label: 'Gagal', className: 'bg-rose-50 text-rose-700 border-rose-200' },
};

interface DocHistoryProps {
  dealId?: string | null;
  limit?: number;
  title?: string;
  emptyText?: string;
}

// Documents generated for the organization (or one deal). Opening a document goes to Google Docs.
export default function DocHistory({ dealId, limit = 10, title = 'Riwayat dokumen', emptyText }: DocHistoryProps) {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error, refetch } = useGoogleDocJobs({ dealId, page, limit });

  if (apiErrorCode(error) === 'FEATURE_DISABLED') return null;

  const pages = data ? Math.max(1, Math.ceil(data.total / data.limit)) : 1;

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5">
      <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
        <History className="w-4 h-4 text-slate-500" /> {title}
      </h2>
      <div className="mt-3">
        {isLoading ? (
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" /> Memuat riwayat...
          </div>
        ) : isError ? (
          <QueryError title="Riwayat dokumen tidak dapat dimuat." error={error} onRetry={() => refetch()} />
        ) : !data || data.jobs.length === 0 ? (
          <p className="text-xs text-slate-500">{emptyText || 'Belum ada dokumen Google Docs yang dibuat.'}</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {data.jobs.map((j) => {
              const s = STATUS[j.status] ?? STATUS.queued;
              return (
                <li key={j.job_id} className="py-2.5 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{j.proposal_title || 'Tanpa judul'}</p>
                    <p className="text-[11px] text-slate-500">
                      {new Date(j.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                      {j.status === 'failed' && j.error_code && (
                        <span className="text-rose-600"> · {GOOGLE_ERROR_MESSAGES[j.error_code] || j.error_code}</span>
                      )}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${s.className}`}>{s.label}</span>
                  {j.status === 'completed' && j.document_url ? (
                    <a
                      href={j.document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-blue-700 flex items-center gap-1 shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Buka
                    </a>
                  ) : (
                    <span className="w-[62px] shrink-0" />
                  )}
                </li>
              );
            })}
          </ul>
        )}
        {data && pages > 1 && (
          <div className="flex items-center justify-end gap-2 mt-3 text-xs text-slate-600">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              aria-label="Halaman sebelumnya"
              className="p-1 rounded border border-slate-200 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>
              {page} / {pages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page >= pages}
              aria-label="Halaman berikutnya"
              className="p-1 rounded border border-slate-200 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
