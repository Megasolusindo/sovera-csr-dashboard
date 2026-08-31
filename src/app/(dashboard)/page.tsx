import React from 'react';
import { TrendingUp, DollarSign, Handshake, CheckCircle2, ArrowUpRight, Radio } from 'lucide-react';
import Link from 'next/link';

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-8">
      {/* Page Title Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Executive Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Ringkasan intelijen kemitraan korporasi & performa deal pipeline lembaga.</p>
      </div>

      {/* KPI Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Peluang Aktif (Feed)</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <Radio className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">142</div>
          <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12.4% minggu ini</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Nilai Pipeline</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">Rp 4,25 M</div>
          <div className="flex items-center gap-1 text-xs font-medium text-blue-600 mt-2">
            <span>Estimasi 8 Prospek</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tahap Negosiasi</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <Handshake className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">3 Deals</div>
          <div className="flex items-center gap-1 text-xs font-medium text-amber-600 mt-2">
            <span>Rp 1,5 M sedang audiensi</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Closed Won (MoU)</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">Rp 1,2 M</div>
          <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 mt-2">
            <span>2 SPK Ditandatangani</span>
          </div>
        </div>
      </div>

      {/* Main Content Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* High-Intent Quick Feed Widget */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">Sinyal High-Intent Terbaru</h2>
              <p className="text-xs text-slate-500">Prospek korporasi dengan skor keselarasan di atas 85%</p>
            </div>
            <Link href="/signals" className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
              <span>Lihat Semua</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">PT Maju Bersama Tbk</span>
                  <span className="px-2 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 rounded border border-emerald-200">Intent 92</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 line-clamp-1">Mengalokasikan dana TJSL Rp 25 Miliar untuk pilar pendidikan digital & beasiswa daerah 3T.</p>
              </div>
              <Link href="/signals" className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shrink-0 text-center">
                Match Program
              </Link>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">PT Telko Nusantara Tbk</span>
                  <span className="px-2 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 rounded border border-emerald-200">Intent 88</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 line-clamp-1">Ekspansi infrastruktur internet pedesaan & program elektrifikasi sekolah vokasi syariah.</p>
              </div>
              <Link href="/signals" className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shrink-0 text-center">
                Match Program
              </Link>
            </div>
          </div>
        </div>

        {/* Industry Sector Distribution */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-1">Distribusi Sektor Industri</h2>
            <p className="text-xs text-slate-500 mb-6">Peta sektor korporasi aktif dalam feed intelijen</p>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <span>Telekomunikasi & Teknologi</span>
                  <span>42%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-700 h-full w-[42%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <span>Energi & Pertambangan</span>
                  <span>28%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[28%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <span>Perbankan & Keuangan</span>
                  <span>18%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[18%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
            <span>Total 142 Emiten Terdaftar</span>
            <span className="text-emerald-700 font-semibold">Live Data</span>
          </div>
        </div>
      </div>
    </div>
  );
}
