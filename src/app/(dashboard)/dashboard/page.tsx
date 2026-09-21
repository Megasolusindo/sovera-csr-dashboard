'use client';

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
            <span>2 Kemitraan Disetujui</span>
          </div>
        </div>
      </div>

      {/* Quick Action Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span>Akselerasi Kemitraan CSR Berbasis AI</span>
          </h2>
          <p className="text-xs text-emerald-100 max-w-2xl">
            Sistem secara otomatis mendeteksi sinyal publik anggaran CSR perusahaan dan mencocokkannya dengan program lembaga Anda.
          </p>
        </div>
        <Link
          href="/signals"
          className="px-4 py-2.5 bg-white hover:bg-slate-100 text-emerald-900 rounded-xl text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5 shadow-sm"
        >
          <span>Eksplor Sinyal Publik</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Overview Analytics Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Active Signals */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base">Sinyal Intelijen Terbaru</h3>
            <Link href="/signals" className="text-xs font-semibold text-emerald-700 hover:text-emerald-800">
              Lihat Semua →
            </Link>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">PT Bank Mandiri (Persero) Tbk</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Intent: High (88)</span>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2">
                Mengalokasikan anggaran TJSL Rp 15 Miliar untuk pemulihan ekonomi masyarakat pesisir & program beasiswa digital.
              </p>
              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                <span>Pilar: Pemberdayaan Ekonomi</span>
                <span>2 jam yang lalu</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">PT Telkom Indonesia Tbk</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">Intent: High (82)</span>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2">
                Membuka kemitraan program Digiland 2026 untuk penyediaan sarana internet sekolah daerah 3T.
              </p>
              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                <span>Pilar: Pendidikan & Teknologi</span>
                <span>5 jam yang lalu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pipeline Stage Summary */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base">Status Deal Pipeline</h3>
          </div>

          <div className="space-y-3 text-xs font-medium">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
              <span className="text-slate-600">Terdeteksi (Discovered)</span>
              <span className="font-bold text-slate-900">5 Deals</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-blue-50/60">
              <span className="text-blue-700 font-semibold">Pitched (Proposal Terkirim)</span>
              <span className="font-bold text-blue-900">3 Deals</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-50/60">
              <span className="text-amber-700 font-semibold">Negosiasi & Audiensi</span>
              <span className="font-bold text-amber-900">3 Deals</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50">
              <span className="text-emerald-700 font-semibold">Closed Won (Sepakat)</span>
              <span className="font-bold text-emerald-900">2 Deals</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/pipeline"
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
            >
              <span>Buka Pipeline CRM</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
