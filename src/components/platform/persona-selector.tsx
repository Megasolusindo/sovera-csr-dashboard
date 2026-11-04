'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Building2,
  Heart,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Target,
  FileCheck2,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export function PersonaSelector() {
  const router = useRouter();

  const handleSelectCorporate = (e: React.MouseEvent) => {
    // Immediate client cookie set for instant reactivity
    if (typeof document !== 'undefined') {
      document.cookie = 'viewAs=csr; path=/; max-age=2592000; SameSite=Lax';
    }
  };

  const handleSelectNgo = (e: React.MouseEvent) => {
    // Immediate client cookie set for instant reactivity
    if (typeof document !== 'undefined') {
      document.cookie = 'viewAs=ngo; path=/; max-age=2592000; SameSite=Lax';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
      {/* 1. Corporate Gateway Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border-2 border-indigo-500/40 hover:border-indigo-400 transition-all space-y-8 backdrop-blur-xl shadow-2xl hover:shadow-indigo-950/40 flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-600/20 transition-all" />

        <div className="space-y-6 relative z-10">
          {/* Header Badge */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Untuk Perusahaan & BUMN</span>
            </span>
            <span className="text-xs font-semibold text-indigo-400 bg-indigo-950/60 px-2.5 py-0.5 rounded-lg border border-indigo-800/40">
              Sisi Donor & TJSL
            </span>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Masuk sebagai Korporasi
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Solusi presisi bagi Direksi, Manajer CSR, dan Tim TJSL untuk menyalurkan anggaran keberlanjutan ke mitra lembaga sosial yang terverifikasi dan selaras standar ESG.
            </p>
          </div>

          {/* Benefits Checkpoints */}
          <div className="border-t border-slate-800/90 pt-5 space-y-3.5">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white font-semibold">Kurasi Mitra Terverifikasi:</strong> Akses database 435+ lembaga NGO & Yayasan yang telah dicek legalitas operasional dan rekam jejaknya.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white font-semibold">AI Match Engine:</strong> Algoritma cerdas mencocokkan pilar prioritas ESG, SDGs, dan standar syariah (Fiqh Asnaf zakat/wakaf).
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white font-semibold">Eliminasi Proposal Fisik Acak:</strong> Review proposal secara terstruktur dengan transparansi RAB dan indikator dampak terukur.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white font-semibold">Audit Trail & Kepatuhan:</strong> Dokumentasi terpadu untuk pelaporan resmi TJSL BUMN dan audit ESG emiten pasar modal.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-6 border-t border-slate-800/90 relative z-10">
          <Link
            href="/as-csr"
            onClick={handleSelectCorporate}
            className="w-full py-4 px-6 rounded-2xl text-sm font-extrabold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all flex items-center justify-center gap-2 group/btn"
          >
            <span>Pilih & Masuk sebagai Korporasi</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
          </Link>

          <Link
            href="/as-csr?redirect=/login"
            onClick={handleSelectCorporate}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center justify-center gap-1.5"
          >
            <Lock className="w-3 h-3 text-indigo-400" />
            <span>Sudah Punya Akun? Langsung Login Portal CSR</span>
          </Link>
        </div>
      </div>

      {/* 2. NGO Gateway Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border-2 border-emerald-500/40 hover:border-emerald-400 transition-all space-y-8 backdrop-blur-xl shadow-2xl hover:shadow-emerald-950/40 flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-600/20 transition-all" />

        <div className="space-y-6 relative z-10">
          {/* Header Badge */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5" />
              <span>Untuk Yayasan, LAZ & NGO</span>
            </span>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-lg border border-emerald-800/40">
              Sisi Penggerak Dampak
            </span>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Masuk sebagai NGO / Yayasan
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Jalan tol pendanaan bagi Lembaga Swadaya Masyarakat, Lembaga Amil Zakat (LAZ), dan Yayasan untuk terhubung langsung dengan donor korporasi tanpa cold outreach manual.
            </p>
          </div>

          {/* Benefits Checkpoints */}
          <div className="border-t border-slate-800/90 pt-5 space-y-3.5">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white font-semibold">Database Korporasi Aktif:</strong> Jelajahi profil 1.700+ korporasi BUMN & Tbk lengkap dengan riwayat alokasi CSR dan fokus pilarnya.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white font-semibold">Katalog Program Terbuka:</strong> Daftarkan program sosial unggulan Anda ke marketplace yang langsung diakses para penentu kebijakan CSR.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white font-semibold">Status Proposal Transparan:</strong> Hentikan ketidakpastian; pantau pergerakan proposal Anda secara real-time dari review hingga persetujuan.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white font-semibold">Kemitraan Jangka Panjang:</strong> Buka peluang program multi-tahun dan hibah dana abadi untuk perluasan dampak penerima manfaat.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-6 border-t border-slate-800/90 relative z-10">
          <Link
            href="/as-ngo"
            onClick={handleSelectNgo}
            className="w-full py-4 px-6 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-xl shadow-emerald-700/30 hover:shadow-emerald-600/50 transition-all flex items-center justify-center gap-2 group/btn"
          >
            <span>Pilih & Masuk sebagai NGO</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
          </Link>

          <Link
            href="/as-ngo?redirect=/login"
            onClick={handleSelectNgo}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center justify-center gap-1.5"
          >
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>Sudah Punya Akun? Langsung Login Portal NGO</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
