'use client';

import React from 'react';
import { Info, Building } from 'lucide-react';

// The server has no endpoint that lists or edits a corporate's own CSR programs. This view used to show three
// invented programs ("Corporate (demo)") and let the user add, edit and delete them in the browser only,
// as if they were saved. It now says what is true.
export default function CorporateProgramPortfolioView() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
          <Building className="w-6 h-6 text-indigo-700" />
          <span>Portofolio Program CSR Perusahaan</span>
        </h1>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3 text-sm text-slate-600">
        <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
        <p>
          Pengelolaan program CSR milik perusahaan belum tersedia: server belum menyediakan data dan penyimpanannya.
          Untuk menerbitkan peluang CSR bagi mitra NGO atau memeriksa proposal masuk, gunakan menu Proposal Masuk.
        </p>
      </div>
    </div>
  );
}
