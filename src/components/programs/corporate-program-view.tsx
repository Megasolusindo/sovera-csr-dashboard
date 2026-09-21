'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Building,
  DollarSign,
  PieChart,
  CheckCircle2,
  Calendar,
  Layers,
  Award,
} from 'lucide-react';

const mockCorporatePrograms = [
  {
    id: 'corp-prog-1',
    name: 'Program Penanaman 100.000 Mangrove Pesisir',
    companyName: 'Corporate (demo)',
    pillar: 'ENVIRONMENT',
    status: 'ACTIVE',
    budgetAmount: 'Rp 1.500.000.000',
    impactSummary: 'Restorasi 50 hektar lahan pesisir dan pengurangan jejak karbon sebesar 120 ton CO2e/tahun.',
    startDate: '2026-01-15',
    endDate: '2026-12-31',
    partnerNGO: 'Yayasan Konservasi Mangrove Indonesia',
  },
  {
    id: 'corp-prog-2',
    name: 'Beasiswa Coding Digital & AI Talenta Muda',
    companyName: 'Corporate (demo)',
    pillar: 'EDUCATION',
    status: 'ACTIVE',
    budgetAmount: 'Rp 850.000.000',
    impactSummary: 'Pelatihan intensif 6 bulan dan penyaluran kerja untuk 200 pemuda berprestasi.',
    startDate: '2026-03-01',
    endDate: '2026-11-30',
    partnerNGO: 'LAZ Peduli Ummat',
  },
  {
    id: 'corp-prog-3',
    name: 'Program Pembinaan & Perizinan Halal 100 UMKM',
    companyName: 'Corporate (demo)',
    pillar: 'ECONOMIC_EMPOWERMENT',
    status: 'PLANNED',
    budgetAmount: 'Rp 600.000.000',
    impactSummary: 'Pendampingan sertifikasi halal dan digitalisasi pemasaran UMKM wanita di Jawa Barat.',
    startDate: '2026-06-01',
    endDate: '2026-12-15',
    partnerNGO: 'Belum Ditentukan (Peluang Kemitraan)',
  },
];

export default function CorporateProgramPortfolioView() {
  const [search, setSearch] = useState('');
  const [selectedPillar, setSelectedPillar] = useState('');

  const filteredPrograms = mockCorporatePrograms.filter((prog) => {
    const matchesSearch =
      prog.name.toLowerCase().includes(search.toLowerCase()) ||
      prog.impactSummary.toLowerCase().includes(search.toLowerCase()) ||
      prog.partnerNGO.toLowerCase().includes(search.toLowerCase());
    const matchesPillar = !selectedPillar || prog.pillar === selectedPillar;
    return matchesSearch && matchesPillar;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
              <BookOpen className="w-6 h-6 text-indigo-700" />
              <span>Inisiatif & Portofolio CSR Perusahaan</span>
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Kelola alokasi anggaran, pemantauan dampak ESG, dan eksekusi program CSR korporasi
          </p>
        </div>

        <button
          type="button"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Inisiatif CSR</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">3</div>
            <div className="text-xs text-slate-500 font-medium">Total Inisiatif CSR Active</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">Rp 2.95 M</div>
            <div className="text-xs text-slate-500 font-medium">Total Komitmen Anggaran CSR</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">2 Partners</div>
            <div className="text-xs text-slate-500 font-medium">Lembaga Terverifikasi Eksekutor</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari inisiatif program CSR, mitra NGO, atau dampak..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="sm:w-56">
          <select
            value={selectedPillar}
            onChange={(e) => setSelectedPillar(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Semua Pilar ESG</option>
            <option value="ENVIRONMENT">Lingkungan & Iklim</option>
            <option value="EDUCATION">Pendidikan & Literasi</option>
            <option value="ECONOMIC_EMPOWERMENT">Pemberdayaan Ekonomi</option>
          </select>
        </div>
      </div>

      {/* Programs List Grid */}
      <div className="space-y-4">
        {filteredPrograms.map((prog) => (
          <div
            key={prog.id}
            className="bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {prog.pillar}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {prog.startDate} s/d {prog.endDate}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{prog.name}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <Building className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Mitra Eksekutor: <strong className="text-slate-800">{prog.partnerNGO}</strong></span>
                </p>
              </div>

              <div className="sm:text-right">
                <div className="text-lg font-extrabold text-slate-900">{prog.budgetAmount}</div>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {prog.status === 'ACTIVE' ? 'Berjalan (Active)' : 'Direncanakan'}
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700">
              <strong className="text-slate-900 font-semibold block mb-0.5">Ringkasan Dampak (Impact Summary):</strong>
              {prog.impactSummary}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
