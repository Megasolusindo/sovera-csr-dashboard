import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Heart,
  Sparkles,
  ShieldCheck,
  Target,
  ArrowRight,
  CheckCircle2,
  Zap,
  Handshake,
  FileCheck2,
  Users,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Platform CSR untuk NGO & Pendanaan Program Sosial | CSRmatics',
  description:
    'Platform kemitraan CSR terbaik untuk Lembaga Sosial, LAZ, dan Yayasan. Temukan perusahaan yang sedang membuka alokasi CSR, ajukan proposal terstruktur, dan dapatkan pendanaan berkelanjutan.',
  keywords: [
    'platform CSR untuk NGO',
    'mencari dana CSR',
    'mencari perusahaan untuk kerjasama',
    'kemitraan CSR',
    'pendanaan program sosial',
    'proposal CSR yayasan',
    'LAZ zakat wakaf',
  ],
  openGraph: {
    title: 'Platform CSR untuk NGO & Pendanaan Program Sosial | CSRmatics',
    description:
      'Hentikan cold proposal manual. Hubungkan program sosial yayasan Anda langsung dengan donor korporasi yang membuka alokasi CSR.',
    url: 'https://csrmatics.com/untuk-ngo',
    siteName: 'CSRmatics',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://csrmatics.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'CSRmatics — Platform CSR & Pendanaan Program Sosial NGO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Platform CSR untuk NGO & Pendanaan Program Sosial | CSRmatics',
    description:
      'Hentikan cold proposal manual. Hubungkan program sosial yayasan Anda langsung dengan donor korporasi yang membuka alokasi CSR.',
    images: ['https://csrmatics.com/opengraph-image'],
  },
};

export default function UntukNgoPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-600/20 via-teal-900/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Header Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center font-bold shadow-lg">
              <Sparkles className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white block leading-none">
                CSRmatics
              </span>
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-widest block mt-0.5">
                NGO Partnership Platform
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-emerald-400">Home</Link>
            <Link href="/untuk-korporasi" className="hover:text-emerald-400">For Corporates</Link>
            <Link href="/untuk-ngo" className="text-emerald-400 font-bold">For NGOs</Link>
            <Link href="/database-perusahaan" className="hover:text-emerald-400">Corporate Directory</Link>
            <Link href="/pricing" className="hover:text-emerald-400">Pricing</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login?persona=ngo"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
            >
              Masuk Sesi
            </Link>
            <Link
              href="/pricing?persona=ngo"
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-700/25"
            >
              Daftar NGO Sekarang
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 px-6 max-w-7xl mx-auto space-y-20">
        
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/80 border border-emerald-700/40 text-emerald-300 text-xs font-semibold">
            <Heart className="w-4 h-4 text-emerald-400" />
            <span>Solusi Kemitraan Khusus NGO, LAZ & Yayasan Sosial</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Platform Kemitraan CSR & Pendanaan Program Sosial
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Hentikan proposal manual tanpa kejelasan status. Hubungkan program sosial yayasan Anda secara presisi dengan korporasi yang aktif membuka alokasi dana CSR.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/pricing?persona=ngo"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2"
            >
              <span>Daftarkan Program NGO (Gratis)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/database-perusahaan"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-extrabold text-sm border border-slate-800 flex items-center justify-center gap-2"
            >
              <span>Cari Perusahaan Donor CSR</span>
            </Link>
          </div>
        </section>

        {/* NGO Value Proposition Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">1. Hentikan Cold Proposal Manual</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kirimkan draf program ke perusahaan yang terbukti memiliki intent pencairan anggaran CSR, pilar lokasi yang sesuai, serta kecocokan kriteria Fiqh Asnaf.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">2. Tampil di Marketplace Opportunities</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Daftarkan program unggulan Anda di katalog terbuka yang diakses langsung oleh manajer CSR & TJSL perusahaan BUMN, Tbk, dan Swasta.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">3. Badge Legalitas Terverifikasi</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tingkatkan kepercayaan calon donor korporasi dengan verifikasi dokumen resmi (SK Kemenkumham / Izin Operasional LAZ) untuk mendapatkan badge verified.
            </p>
          </div>
        </section>

        {/* NGO FAQ */}
        <section className="border-t border-slate-800/80 pt-16 space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">NGO FAQ</span>
            <h2 className="text-3xl font-extrabold text-white">Pertanyaan Sering Diajukan Seputar Pendanaan NGO</h2>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">Apakah mendaftarkan akun NGO di CSRmatics dipungut biaya?</h4>
              <p className="text-slate-400 leading-relaxed">
                Pendaftaran awal dan pendaftaran profil NGO bersifat Rp0 (Gratis) melalui verifikasi dokumen resmi legalitas yayasan.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">Bagaimana cara agar proposal program kami cepat disetujui korporasi?</h4>
              <p className="text-slate-400 leading-relaxed">
                Gunakan rekomendasi Match Score AI di platform untuk memilih perusahaan yang sedang memprioritaskan pilar keberlanjutan dan wilayah lokasi yang sama dengan program Anda.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
