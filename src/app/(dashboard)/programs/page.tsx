import React from 'react';
import { BookOpen } from 'lucide-react';

export default function ProgramsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Institution Programs Manager</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola portofolio program unggulan lembaga & sinkronisasi AI vector embedding.</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center">
        <BookOpen className="w-12 h-12 text-emerald-700 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-900">Institution Programs Module Scaffold</h2>
        <p className="text-sm text-slate-500 mt-1">Halaman manajemen master program lembaga siap diintegrasikan pada fase selanjutnya.</p>
      </div>
    </div>
  );
}
