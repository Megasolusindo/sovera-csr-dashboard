'use client';

import React, { useState, useEffect } from 'react';
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
  RefreshCw,
  Check,
} from 'lucide-react';
import { setClientViewAs, getClientViewAs } from '@/components/shared/public-navbar';

export function PersonaSelector() {
  const router = useRouter();
  const [activePersona, setActivePersona] = useState<'csr' | 'ngo' | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync with cookie and listen to custom event
  useEffect(() => {
    const current = getClientViewAs();
    setActivePersona(current);

    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<'csr' | 'ngo' | null>;
      if (customEvent.detail !== undefined) {
        setActivePersona(customEvent.detail);
      }
    };

    window.addEventListener('csrmatics:viewAsChange', handleCustomChange);
    return () => {
      window.removeEventListener('csrmatics:viewAsChange', handleCustomChange);
    };
  }, []);

  const handleSelect = (persona: 'csr' | 'ngo', navigateTo?: string) => {
    // 1. Immediately write cookie & dispatch event to refresh PublicNavbar
    setClientViewAs(persona);
    setActivePersona(persona);

    // 2. Set interactive notification banner
    if (persona === 'csr') {
      setNotification('Mode Korporasi aktif! Menu navbar otomatis diperbarui: "Database Lembaga" & "Solusi Korporasi" ditampilkan.');
    } else {
      setNotification('Mode NGO aktif! Menu navbar otomatis diperbarui: "Database Perusahaan" & "Solusi NGO" ditampilkan.');
    }

    // 3. If navigation requested, perform hard redirect so SSR pages receive updated cookie
    if (navigateTo) {
      setTimeout(() => {
        window.location.href = navigateTo;
      }, 150);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Interactive Segmented Switcher Header */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <span className="text-xs font-semibold text-slate-400">Pilih cepat peran:</span>
        <div className="p-1.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-1.5 shadow-lg">
          <button
            type="button"
            onClick={() => handleSelect('csr')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activePersona === 'csr'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Korporasi (viewAs=csr)</span>
            {activePersona === 'csr' && <Check className="w-3.5 h-3.5 text-indigo-200" />}
          </button>

          <button
            type="button"
            onClick={() => handleSelect('ngo')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activePersona === 'ngo'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/30 ring-1 ring-emerald-400/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>NGO / Lembaga (viewAs=ngo)</span>
            {activePersona === 'ngo' && <Check className="w-3.5 h-3.5 text-emerald-200" />}
          </button>
        </div>
      </div>

      {/* Notification banner when switched */}
      {notification && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300 max-w-2xl mx-auto">
          <div
            className={`px-4 py-3 rounded-2xl text-xs font-semibold flex items-center justify-between border backdrop-blur-md shadow-lg ${
              activePersona === 'csr'
                ? 'bg-indigo-950/80 border-indigo-700/60 text-indigo-200'
                : 'bg-emerald-950/80 border-emerald-700/60 text-emerald-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 shrink-0 animate-spin" />
              <span>{notification}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-slate-400 hover:text-white ml-2 text-sm font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* The Two Gateway Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* 1. Corporate Gateway Card */}
        <div
          onClick={() => handleSelect('csr')}
          className={`cursor-pointer p-8 sm:p-10 rounded-3xl transition-all space-y-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between relative overflow-hidden group ${
            activePersona === 'csr'
              ? 'bg-slate-900/95 border-2 border-indigo-500 shadow-indigo-950/60 ring-2 ring-indigo-500/20'
              : 'bg-slate-900/70 border-2 border-indigo-500/30 hover:border-indigo-400/70 hover:shadow-indigo-950/30'
          }`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-600/20 transition-all" />

          <div className="space-y-6 relative z-10">
            {/* Header Badge */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                <span>Untuk Perusahaan & BUMN</span>
              </span>
              {activePersona === 'csr' ? (
                <span className="text-xs font-bold text-white bg-indigo-600 px-3 py-1 rounded-full border border-indigo-400 flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mode Sedang Aktif</span>
                </span>
              ) : (
                <span className="text-xs font-semibold text-indigo-400 bg-indigo-950/60 px-2.5 py-0.5 rounded-lg border border-indigo-800/40">
                  Sisi Donor & TJSL
                </span>
              )}
            </div>

            {/* Title & Tagline */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-between">
                <span>Masuk sebagai Korporasi</span>
                {activePersona === 'csr' && (
                  <span className="text-xs font-mono font-bold text-indigo-300 bg-indigo-950/90 px-2 py-0.5 rounded border border-indigo-700">
                    viewAs=csr
                  </span>
                )}
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
          <div className="space-y-3 pt-6 border-t border-slate-800/90 relative z-10" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => handleSelect('csr', '/')}
              className="w-full py-4 px-6 rounded-2xl text-sm font-extrabold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all flex items-center justify-center gap-2 group/btn"
            >
              <span>{activePersona === 'csr' ? 'Buka Beranda Korporasi' : 'Pilih & Masuk sebagai Korporasi'}</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => handleSelect('csr', '/login')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3 h-3 text-indigo-400" />
              <span>Sudah Punya Akun? Langsung Login Portal CSR</span>
            </button>
          </div>
        </div>

        {/* 2. NGO Gateway Card */}
        <div
          onClick={() => handleSelect('ngo')}
          className={`cursor-pointer p-8 sm:p-10 rounded-3xl transition-all space-y-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between relative overflow-hidden group ${
            activePersona === 'ngo'
              ? 'bg-slate-900/95 border-2 border-emerald-500 shadow-emerald-950/60 ring-2 ring-emerald-500/20'
              : 'bg-slate-900/70 border-2 border-emerald-500/30 hover:border-emerald-400/70 hover:shadow-emerald-950/30'
          }`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-600/20 transition-all" />

          <div className="space-y-6 relative z-10">
            {/* Header Badge */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5" />
                <span>Untuk Yayasan, LAZ & NGO</span>
              </span>
              {activePersona === 'ngo' ? (
                <span className="text-xs font-bold text-white bg-emerald-600 px-3 py-1 rounded-full border border-emerald-400 flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mode Sedang Aktif</span>
                </span>
              ) : (
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-lg border border-emerald-800/40">
                  Sisi Penggerak Dampak
                </span>
              )}
            </div>

            {/* Title & Tagline */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-between">
                <span>Masuk sebagai NGO / Yayasan</span>
                {activePersona === 'ngo' && (
                  <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-700">
                    viewAs=ngo
                  </span>
                )}
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
          <div className="space-y-3 pt-6 border-t border-slate-800/90 relative z-10" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => handleSelect('ngo', '/')}
              className="w-full py-4 px-6 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-xl shadow-emerald-700/30 hover:shadow-emerald-600/50 transition-all flex items-center justify-center gap-2 group/btn"
            >
              <span>{activePersona === 'ngo' ? 'Buka Beranda NGO' : 'Pilih & Masuk sebagai NGO'}</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => handleSelect('ngo', '/login')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>Sudah Punya Akun? Langsung Login Portal NGO</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

