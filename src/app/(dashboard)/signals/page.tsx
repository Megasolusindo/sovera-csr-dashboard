import React from 'react';
import { Radio } from 'lucide-react';

export default function SignalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Corporate Intelligence Feed</h1>
          <p className="text-sm text-slate-500 mt-1">Umpan peluang CSR/TJSL korporasi hasil ekstraksi AI dan kecocokan program.</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center">
        <Radio className="w-12 h-12 text-emerald-700 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-900">Corporate Feed Module Scaffold</h2>
        <p className="text-sm text-slate-500 mt-1">Halaman feed sinyal korporasi siap diintegrasikan pada fase selanjutnya.</p>
      </div>
    </div>
  );
}
