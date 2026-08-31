import React from 'react';
import { FolderKanban } from 'lucide-react';

export default function PipelinePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">B2B Deal Pipeline</h1>
          <p className="text-sm text-slate-500 mt-1">Papan Kanban interaktif alur kesepakatan kemitraan korporasi.</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center">
        <FolderKanban className="w-12 h-12 text-emerald-700 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-900">Deal Pipeline Kanban Module Scaffold</h2>
        <p className="text-sm text-slate-500 mt-1">Halaman Kanban board pipeline siap diintegrasikan pada fase selanjutnya.</p>
      </div>
    </div>
  );
}
