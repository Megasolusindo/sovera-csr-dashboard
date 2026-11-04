import React from 'react';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { PublicNavbar } from '@/components/shared/public-navbar';
import { PersonaSelector } from '@/components/platform/persona-selector';
import {
  Sparkles,
  Building2,
  Heart,
  ShieldCheck,
  Scale,
  Zap,
  Target,
  FileText,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Layers,
  HelpCircle,
  Clock,
  Award,
} from 'lucide-react';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Platform Kemitraan CSR & Lembaga NGO Dua Sisi Berbasis AI | CSRmatics',
  description:
    'Ekosistem dua arah pertama di Indonesia yang menghubungkan korporasi penyalur CSR dengan lembaga sosial & NGO terverifikasi. Transparan, presisi, dan akuntabel berbasis AI.',
  alternates: {
    canonical: 'https://csrmatics.com/platform',
  },
  keywords: [
    'Platform CSR Indonesia',
    'Kemitraan CSR dan NGO',
    'Platform Dua Sisi CSR',
    'Penyaluran CSR Korporasi',
    'Pendanaan NGO Yayasan',
    'TJSL BUMN',
    'ESG Indonesia',
    'CSR AI Match',
  ],
  openGraph: {
    title: 'Platform Kemitraan CSR & Lembaga NGO Dua Sisi Berbasis AI | CSRmatics',
    description:
      'Menjembatani alokasi dana CSR korporasi BUMN & swasta dengan lembaga sosial, yayasan, dan LAZ terverifikasi secara presisi, terukur, dan akuntabel.',
    url: 'https://csrmatics.com/platform',
    siteName: 'CSRmatics',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://csrmatics.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'CSRmatics — Platform Dua Sisi CSR Korporasi & Lembaga NGO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Platform Kemitraan CSR & Lembaga NGO Dua Sisi Berbasis AI | CSRmatics',
    description:
      'Menjembatani alokasi dana CSR korporasi BUMN & swasta dengan lembaga sosial, yayasan, dan LAZ terverifikasi secara presisi, terukur, dan akuntabel.',
    images: ['https://csrmatics.com/opengraph-image'],
  },
};

export default function PlatformOverviewPage() {
  const cookieStore = cookies();
  const viewAs = cookieStore.get('viewAs')?.value as 'csr' | 'ngo' | undefined;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      {/* Background Ambient Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-gradient-to-br from-indigo-600/20 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-1/4 w-[600px] h-[500px] bg-gradient-to-bl from-emerald-600/20 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[800px] left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-teal-600/10 blur-3xl pointer-events-none -z-10" />

      {/* Navigation Header */}
      <PublicNavbar initialViewAs={viewAs} />

      <main className="space-y-24 py-16 px-6 max-w-7xl mx-auto">
        {/* 1. Hero Header */}
        <section className="text-center space-y-6 max-w-4xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold backdrop-blur-md shadow-inner">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="bg-gradient-to-r from-indigo-300 via-teal-300 to-emerald-300 bg-clip-text text-transparent font-bold">
              ✦ Ekosistem Kemitraan CSR Dua Arah Pertama di Indonesia
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Where CSR Meets Real Impact —{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Platform Dua Sisi Berbasis AI.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
            CSRmatics menjembatani dua kutub ekosistem keberlanjutan: mempertemukan{' '}
            <strong className="text-indigo-300 font-semibold">Korporasi & BUMN</strong> yang ingin menyalurkan dana CSR secara presisi dan akuntabel, dengan{' '}
            <strong className="text-emerald-300 font-semibold">Lembaga Sosial & NGO</strong> yang mencari pendanaan program berdampak nyata tanpa proses manual yang lambat.
          </p>
        </section>

        {/* 2. Interactive Persona Gateway Selector */}
        <section id="select-persona" className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Pilih Akses Pengguna
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Tentukan Peran Anda di Ekosistem CSRmatics
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Pilih salah satu peran di bawah ini untuk mempersonalisasi portal dan direktori sesuai kebutuhan Anda.
            </p>
          </div>

          <PersonaSelector />
        </section>

        {/* 3. Ekosistem Dua Arah: Bagaimana Platform Bekerja? */}
        <section className="py-12 border-t border-slate-800/80 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-xs text-slate-300 border border-slate-800">
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              <span>Arsitektur Platform Dua Sisi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Menghubungkan Dua Kebutuhan dalam Satu Mesin Cerdas
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Kemitraan CSR tradisional sering terhenti karena miskomunikasi dan riset manual. CSRmatics mengintegrasikan data terverifikasi dan AI matching untuk menyelaraskan kedua sisi secara instan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Sisi Kiri: Korporasi */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-indigo-500/30 space-y-4 backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold border border-indigo-500/20">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                  Sisi Korporasi (CSR / TJSL)
                </span>
                <h3 className="text-lg font-bold text-white">Niat Baik & Alokasi Anggaran</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Memiliki alokasi dana CSR, kewajiban TJSL BUMN, dan target kepatuhan ESG, namun menghadapi kendala menyaring proposal yayasan yang terpercaya dan relevan.
              </p>
            </div>

            {/* Sisi Tengah: AI Bidirectional Bridge */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-teal-500/50 space-y-4 text-center shadow-xl shadow-teal-950/20 relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-emerald-600 text-white flex items-center justify-center font-bold mx-auto shadow-lg shadow-teal-500/20">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
                  Mesin Penghubung
                </span>
                <h3 className="text-xl font-black text-white">AI Bidirectional Match Engine</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Menyelaraskan profil ESG korporasi dengan proposal program NGO secara real-time berdasarkan 17 indikator SDGs, kesesuaian Fiqh Asnaf, dan kelayakan RAB.
              </p>
            </div>

            {/* Sisi Kanan: NGO */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-emerald-500/30 space-y-4 backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/20">
                <Heart className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Sisi NGO & Lembaga Sosial
                </span>
                <h3 className="text-lg font-bold text-white">Dampak Nyata di Lapangan</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Memiliki relawan, program sosial teruji, dan akses ke masyarakat penerima manfaat, namun terbatas dalam menjangkau manajer CSR korporasi secara langsung.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Keuntungan & Kemudahan Lengkap untuk Kedua Belah Pihak */}
        <section className="py-12 border-t border-slate-800/80 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Nilai Tambah Platform
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Keuntungan & Kemudahan yang Anda Dapatkan
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Didesain khusus untuk memangkas friksi administrasi, mempercepat persetujuan proposal, dan menjamin transparansi akuntabilitas publik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Kolom Korporasi */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-indigo-500/30 space-y-6 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Untuk Korporasi & Tim TJSL</h3>
                  <span className="text-xs text-indigo-400 font-medium">Penyaluran Dana Presisi & Berdampak</span>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    <span>Verifikasi Legalitas 100% Valid</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Setiap lembaga sosial yang terdaftar telah diverifikasi status hukumnya (AHU, Kemensos, atau izin LAZ Baznas) untuk memitigasi risiko reputasi perusahaan.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Target className="w-4 h-4 text-indigo-400" />
                    <span>Pencocokan Pilar ESG & Fiqh Asnaf</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Dana CSR maupun Zakat perusahaan otomatis dicocokkan dengan kriteria syariah (Fakir, Miskin, Fisabilillah) dan pilar ESG perusahaan secara presisi.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    <span>Hemat 80% Waktu Riset & Seleksi</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Tidak perlu lagi memilah tumpukan proposal fisik yang tidak relevan. AI Match Score langsung menyajikan program terbaik dengan skor kompatibilitas tertinggi.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span>Laporan Kepatuhan Siap Audit</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Dokumentasi progres program terstruktur dan data penerima manfaat siap disajikan untuk laporan tahunan keberlanjutan dan audit kementerian.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/as-csr"
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Mulai sebagai Korporasi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Kolom NGO */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-emerald-500/30 space-y-6 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Untuk Lembaga Sosial & NGO</h3>
                  <span className="text-xs text-emerald-400 font-medium">Pendanaan Berkelanjutan Tanpa Cold Outreach</span>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Akses 1.700+ Data Perusahaan Aktif</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Ketahui korporasi mana yang memiliki anggaran CSR terbuka, pilar yang sedang dicari, dan kontak resmi tim keberlanjutannya tanpa perantara.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Marketplace Program Terbuka</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Tampilkan program sosial unggulan lembaga Anda di katalog terbuka yang secara aktif dipantau oleh para pengambil keputusan CSR korporasi.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Transparansi Status Proposal</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Pantau pergerakan proposal Anda secara real-time dari peninjauan awal, evaluasi teknis, hingga pencairan dana kemitraan.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span>Peluang Kemitraan Jangka Panjang</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Lembaga dengan rekam jejak penyaluran yang sukses berpeluang mendapatkan kontrak multi-tahun dan hibah dana abadi dari donor korporasi.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/as-ngo"
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Mulai sebagai Lembaga NGO</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Perbandingan: Cara Konvensional vs Dengan CSRmatics */}
        <section className="py-12 border-t border-slate-800/80 space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
              Transformasi Kemitraan
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Mengapa Berpindah ke CSRmatics?
            </h2>
            <p className="text-slate-400 text-sm">
              Perbandingan langsung antara metode pengajuan kemitraan konvensional dan otomatisasi pintar CSRmatics.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-md">
              <thead className="bg-slate-900/90 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-4 px-6">Aspek Proses Kemitraan</th>
                  <th className="py-4 px-6 text-rose-400 bg-rose-950/20">Cara Lama (Konvensional)</th>
                  <th className="py-4 px-6 text-emerald-400 bg-emerald-950/20">Dengan Platform CSRmatics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-950/50">
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Riset Calon Mitra</td>
                  <td className="py-4 px-6 text-slate-400">Menebak kontak dan mengirim email proposal buta (cold proposal)</td>
                  <td className="py-4 px-6 text-emerald-300 font-medium">Database terverifikasi lengkap dengan sinyal intent alokasi dana</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Validasi Legalitas</td>
                  <td className="py-4 px-6 text-slate-400">Verifikasi manual surat izin yang memakan waktu berminggu-minggu</td>
                  <td className="py-4 px-6 text-emerald-300 font-medium">Lembaga terkurasi otomatis dengan status izin operasional sah</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Pencocokan Program</td>
                  <td className="py-4 px-6 text-slate-400">Proposal sering tidak selaras dengan pilar fokus perusahaan</td>
                  <td className="py-4 px-6 text-emerald-300 font-medium">AI Match Score 1536-dimensi selaras pilar ESG & kriteria syariah</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Pelacakan Status</td>
                  <td className="py-4 px-6 text-slate-400">Tidak ada kabar tindak lanjut; ketidakpastian tinggi</td>
                  <td className="py-4 px-6 text-emerald-300 font-medium">Pipeline real-time dengan status review dan transparansi tahapan</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Akuntabilitas Dampak</td>
                  <td className="py-4 px-6 text-slate-400">Laporan PDF terpisah-pisah dan sulit diaudit konsistensinya</td>
                  <td className="py-4 px-6 text-emerald-300 font-medium">Standar metrik dampak terukur untuk laporan TJSL BUMN & emiten</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. Statistik Platform Empiris */}
        <section className="py-12 border-t border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-white">1.700+</span>
              <p className="text-xs text-slate-400 font-semibold">Korporasi Terverifikasi</p>
              <span className="text-[10px] text-indigo-400 block">BUMN, Tbk & Swasta</span>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-white">435+</span>
              <p className="text-xs text-slate-400 font-semibold">Lembaga NGO & Yayasan</p>
              <span className="text-[10px] text-emerald-400 block">Legalitas Sah & Terdaftar</span>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-white">AI Engine</span>
              <p className="text-xs text-slate-400 font-semibold">Bidirectional Match</p>
              <span className="text-[10px] text-teal-400 block">1536-dimensi Vector Search</span>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-white">100%</span>
              <p className="text-xs text-slate-400 font-semibold">Data Riil Terverifikasi</p>
              <span className="text-[10px] text-amber-400 block">Zero Mocking Directive</span>
            </div>
          </div>
        </section>

        {/* 7. Bottom Gateway Call to Action */}
        <section className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-emerald-950/60 border border-slate-800 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Siap Menghubungkan Niat Baik dengan Dampak Nyata?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Pilih akses Anda untuk langsung menjelajahi platform CSRmatics dan wujudkan kemitraan keberlanjutan yang berdampak.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-2">
            <Link
              href="/as-csr"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              <span>Masuk sebagai Korporasi</span>
            </Link>

            <Link
              href="/as-ngo"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-700/30 transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4" />
              <span>Masuk sebagai NGO</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
