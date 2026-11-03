import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PublicNavbar } from '@/components/shared/public-navbar';
import {
  Building2,
  Sparkles,
  ShieldCheck,
  Target,
  ArrowRight,
  CheckCircle2,
  Zap,
  BarChart3,
  Globe,
  Award,
  Users,
} from 'lucide-react';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Platform CSR Perusahaan & Software Management TJSL | CSRmatics',
  description:
    'Platform intelijen CSR perusahaan & BUMN Indonesia. Verifikasi mitra NGO, otomatisasi matching AI, dan audit dana TJSL selaras ESG & SDGs.',
  alternates: {
    canonical: 'https://csrmatics.com/untuk-korporasi',
  },
  keywords: [
    'platform CSR perusahaan',
    'software CSR',
    'aplikasi CSR',
    'platform TJSL',
    'CSR management platform',
    'CSR intelligence',
    'BUMN TJSL',
    'ESG alignment',
  ],
  openGraph: {
    title: 'Platform CSR Perusahaan & Software Management TJSL | CSRmatics',
    description:
      'Solusi intelijen CSR terpadu untuk tim TJSL, BUMN, Bank, dan Korporasi Tbk. Kurasi mitra NGO terverifikasi dan ukur dampak sosial secara presisi.',
    url: 'https://csrmatics.com/untuk-korporasi',
    siteName: 'CSRmatics',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://csrmatics.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'CSRmatics — Platform CSR Perusahaan & TJSL BUMN',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Platform CSR Perusahaan & Software Management TJSL | CSRmatics',
    description:
      'Solusi intelijen CSR terpadu untuk tim TJSL, BUMN, Bank, dan Korporasi Tbk. Kurasi mitra NGO terverifikasi dan ukur dampak sosial secara presisi.',
    images: ['https://csrmatics.com/opengraph-image'],
  },
};

export default function UntukKorporasiPage() {
  const cookieStore = cookies();
  const viewAs = cookieStore.get('viewAs')?.value as 'csr' | 'ngo' | undefined;

  if (viewAs === 'ngo') {
    redirect('/untuk-ngo');
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-600/20 via-purple-900/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Header Navigation */}
      <PublicNavbar initialViewAs={viewAs} />

      {/* Main Content */}
      <main className="py-16 px-6 max-w-7xl mx-auto space-y-20">
        
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950/80 border border-indigo-700/40 text-indigo-300 text-xs font-semibold">
            <Building2 className="w-4 h-4 text-indigo-400" />
            <span>Solusi Khusus Korporasi, BUMN & Tim TJSL</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Platform Intelligence CSR & Management TJSL Perusahaan
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Kurasi mitra NGO terverifikasi, otomatisasi matching program sosial berbasis AI, dan pastikan setiap rupiah alokasi dana CSR selaras dengan indikator ESG & SDGs.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={viewAs === 'csr' ? '/login' : '/pricing'}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              <span>{viewAs === 'csr' ? 'Masuk ke Portal CSR' : 'Jadwalkan Konsultasi Korporasi'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/database-perusahaan"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-extrabold text-sm border border-slate-800 flex items-center justify-center gap-2"
            >
              <span>Jelajahi Directory Perusahaan</span>
            </Link>
          </div>
        </section>

        {/* Corporate Pain Points vs Solutions */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">1. Verifikasi Legalitas & Rekam Jejak NGO</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hindari risiko penyaluran ke lembaga fiktif. Seluruh NGO di katalog CSRmatics dipilah melalui audit izin operasional Kemenkumham, transparansi laporan keuangan, dan rekam jejak penyaluran lapangan.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">2. AI Precision Vector Matchmaker</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Teknologi AI Gemini mencocokkan target pilar CSR perusahaan (Pendidikan, Kesehatan, Lingkungan, Pemberdayaan Ekonomi) dengan ribuan proposal aktif untuk menghasilkan rekomendasi berperingkat Match Score tertinggi.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">3. Pelaporan ESG & SDGs Otomatis</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dapatkan data penyaluran yang siap diintegrasikan langsung ke dalam Laporan Keberlanjutan (Sustainability Report) tahunan perusahaan Anda sesuai standar GRI dan kriteria syariah Zakat/Wakaf.
            </p>
          </div>
        </section>

        {/* Corporate FAQ */}
        <section className="border-t border-slate-800/80 pt-16 space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block">Corporate FAQ</span>
            <h2 className="text-3xl font-extrabold text-white">Pertanyaan Sering Diajukan Seputar Platform CSR Perusahaan</h2>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">Bagaimana CSRmatics membantu proses pengadaan (procurement) BUMN / Bank?</h4>
              <p className="text-slate-400 leading-relaxed">
                CSRmatics menyediakan paket Enterprise khusus BUMN & Perusahaan Tbk dengan dukungan kontrak kustom, SLA layanan, faktur pajak resmi, serta alur penagihan manual yang sesuai dengan standar audit audit internal/BPK.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">Apakah data strategi CSR perusahaan kami dijamin kerahasiaannya?</h4>
              <p className="text-slate-400 leading-relaxed">
                Ya. Seluruh data rincian alokasi internal dan preferensi kemitraan dilindungi dengan enkripsi tingkat enterprise (AES-256) serta jaminan Non-Disclosure Agreement (NDA).
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
