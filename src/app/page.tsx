import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  Building2,
  Radio,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Globe,
  ShieldCheck,
  Zap,
  Target,
  Award,
  Heart,
  Handshake,
} from 'lucide-react';
import InteractiveDemo from '@/components/home/interactive-demo';
import OpportunitiesFeed from '@/components/home/opportunities-feed';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'CSRmatics | Platform Kemitraan CSR & TJSL Berbasis AI',
  description:
    'Hubungkan dana CSR korporasi BUMN & Tbk dengan NGO terverifikasi. Akselerasi kemitraan berdampak selaras ESG, SDGs, dan standar syariah.',
  alternates: {
    canonical: 'https://csrmatics.com',
  },
};

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white relative overflow-x-hidden">
      
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-600/20 via-emerald-900/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-96 left-10 w-[400px] h-[400px] bg-indigo-600/10 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[800px] right-10 w-[500px] h-[500px] bg-teal-600/10 blur-3xl pointer-events-none -z-10" />

      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/60 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group mr-6 lg:mr-10 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-600/20 group-hover:scale-105 transition-transform shrink-0">
              <Sparkles className="w-5 h-5 text-emerald-200" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-extrabold text-xl tracking-tight text-white block leading-none">
                CSRmatics
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block mt-1 whitespace-nowrap">
                Two-Sided CSR Platform
              </span>
            </div>
          </Link>

          {/* 2-Sided Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-emerald-400 transition-colors whitespace-nowrap">Platform</a>
            <Link href="/untuk-korporasi" className="hover:text-indigo-300 flex items-center gap-1.5 whitespace-nowrap">
              <span>For Corporates</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">3.000+</span>
            </Link>
            <Link href="/untuk-ngo" className="hover:text-emerald-400 flex items-center gap-1.5 whitespace-nowrap">
              <span>For NGOs</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">1.200+</span>
            </Link>
            <a href="#opportunities" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 whitespace-nowrap">
              <span>Opportunities</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </a>
            <a href="#how-it-works" className="hover:text-emerald-400 transition-colors whitespace-nowrap">How It Works</a>
            <Link href="/blog" className="hover:text-emerald-400 transition-colors whitespace-nowrap">Blog</Link>
            <Link href="/pricing" className="hover:text-emerald-400 transition-colors whitespace-nowrap">Pricing</Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/login"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all border border-transparent hover:border-slate-700"
            >
              Masuk
            </Link>
            <Link
              href="/untuk-korporasi"
              className="hidden sm:flex px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-950/80 hover:bg-indigo-900/80 text-indigo-200 border border-indigo-700/50 transition-all items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Join Korporasi</span>
            </Link>
            <Link
              href="/untuk-ngo"
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-lg shadow-emerald-700/25 transition-all flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 text-emerald-200" />
              <span>Join NGO</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="pt-16 pb-20 px-6 max-w-7xl mx-auto text-center space-y-8 relative">
        
        {/* Two-Sided Platform Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/80 border border-emerald-700/40 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>✦ 2-Sided CSR Partnership Platform</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </div>

        {/* Hero Main Headline */}
        <div className="max-w-4xl mx-auto space-y-5">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.15]">
            Where CSR Meets Impact — Akselerasi Kemitraan{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              Berbasis AI.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            Platform terpadu dua arah untuk <strong className="text-emerald-300 font-semibold">akselerasi kemitraan CSR berbasis AI</strong> yang mempertemukan <strong className="text-indigo-300 font-semibold">Korporasi</strong> dan <strong className="text-emerald-300 font-semibold">Lembaga Sosial (NGO)</strong> demi menciptakan <strong className="text-teal-300 font-semibold">real impact</strong> (dampak sosial keberlanjutan) secara presisi, terverifikasi, dan akuntabel.
          </p>
        </div>

        {/* Dual Split Persona CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link
            href="/untuk-korporasi"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all flex items-center justify-center gap-2 border border-indigo-400/30 group"
          >
            <Building2 className="w-4 h-4 text-indigo-200 group-hover:scale-110 transition-transform" />
            <span>Saya Korporasi</span>
            <ArrowRight className="w-4 h-4 text-indigo-200 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/untuk-ngo"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-2 border border-emerald-400/30 group"
          >
            <Heart className="w-4 h-4 text-emerald-200 group-hover:scale-110 transition-transform" />
            <span>Saya NGO / Yayasan</span>
            <ArrowRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Balanced Two-Sided Live Metrics Cards */}
        <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
          
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-1 hover:border-indigo-500/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-white">3.000+</span>
              <Building2 className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="text-xs font-semibold text-slate-400 block">Perusahaan Verified</span>
            <p className="text-[11px] text-slate-500">BUMN, Tbk, Bank & Swasta</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-1 hover:border-emerald-500/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-white">1.200+</span>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-xs font-semibold text-slate-400 block">NGO Terverifikasi</span>
            <p className="text-[11px] text-slate-500">Legalitas & Rekam Jejak</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-1 hover:border-teal-500/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-white">850+</span>
              <Heart className="w-5 h-5 text-teal-400" />
            </div>
            <span className="text-xs font-semibold text-slate-400 block">Program Sosial Aktif</span>
            <p className="text-[11px] text-slate-500">Siap Didanai & Bermitra</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-1 hover:border-indigo-500/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-white">AI Engine</span>
              <Target className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-xs font-semibold text-slate-400 block">Bidirectional Match</span>
            <p className="text-[11px] text-slate-500">Pencocokan 2 Arah Real-time</p>
          </div>

        </div>

      </section>

      {/* 2.5. Problem-Solution Bridge Section (Symmetrical 2-Sided Value) */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-800/60 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold">
            <Handshake className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ekosistem Kemitraan Dua Arah</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Menghubungkan{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-indigo-200 bg-clip-text text-transparent">
              Niat Baik Korporasi
            </span>{' '}
            dengan{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
              Dampak Nyata NGO
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Proses kemitraan CSR tradisional terhambat oleh proposal manual, riset lambat, serta minimnya transparansi. CSRmatics hadir mendorong akselerasi kemitraan berbasis AI untuk hasilkan impact positif bagi ekosistem keberlanjutan.
          </p>
        </div>

        {/* Side-by-Side Symmetrical Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Untuk Korporasi & TJSL */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-indigo-500/30 hover:border-indigo-500/60 transition-all space-y-6 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest block">Untuk Korporasi & Tim TJSL</span>
                  <p className="text-xl font-extrabold text-white">Penyaluran Dana Presisi & Berdampak</p>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">Kurasi NGO & Program Terverifikasi</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Jelajahi yayasan dan lembaga sosial yang telah diverifikasi legalitas, izin operasional, dan rekam jejak penyalurannya.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">Selaras ESG, SDGs & Fiqh Asnaf</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Pencocokan AI memastikan program sosial selaras dengan pilar ESG perusahaan dan kriteria syariah zakat/wakaf.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">Skor Kecocokan 2-Arah Automatis</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Dapatkan rekomendasi mitra NGO dengan Match Score tertinggi tanpa perlu menyeleksi ratusan proposal fisik secara manual.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/untuk-korporasi"
                className="w-full py-3 px-4 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-700/20"
              >
                <span>Eksplor Solusi Korporasi</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Untuk Lembaga Sosial & NGO */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-emerald-500/30 hover:border-emerald-500/60 transition-all space-y-6 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest block">Untuk Lembaga Sosial & NGO</span>
                  <p className="text-xl font-extrabold text-white">Pendanaan Berkelanjutan Tanpa Cold Outreach</p>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">Target Korporasi yang Tepat Sasaran</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Hubungi perusahaan yang terdeteksi sedang membuka alokasi CSR dan memiliki pilar fokus yang cocok dengan program Anda.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">Transparansi Status Proposal</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Pantau pergerakan proposal Anda secara real-time dari peninjauan awal hingga persetujuan pendanaan.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">Tampilkan Program di Marketplace Feed</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Daftarkan program unggulan Anda di katalog terbuka yang diakses langsung oleh manajer CSR & TJSL perusahaan BUMN/Tbk.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/untuk-ngo"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20"
              >
                <span>Eksplor Solusi NGO</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </section>

      {/* 3. Balanced Bento Grid Features Section */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-800/50 space-y-16">
        
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
            Fitur Utama Platform
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Perkakas Kemitraan CSR Berbasis Data
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Perkakas lengkap untuk Korporasi dan Lembaga Sosial dalam meneliti, mencocokkan, dan mengeksekusi kemitraan berdampak tinggi.
          </p>
        </div>

        {/* Bento Grid (4 Balanced Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1 - Corporate Intelligence Signal Feed */}
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80 hover:border-indigo-500/40 transition-all space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold">
              <Radio className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20 inline-block">
              Sisi Korporasi
            </span>
            <p className="text-xl font-bold text-white">1. Real-Time Corporate Signal Feed</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Crawler otomatis memantau rilis berita, laporan tahunan BEI, portal BUMN, dan rilis ESG 24 jam sehari untuk mendeteksi pencairan anggaran CSR baru.
            </p>
            <ul className="space-y-2 pt-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Deteksi sinyal intent alokasi dana CSR</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Analisis pilar keberlanjutan & lokasi prioritas</span>
              </li>
            </ul>
          </div>

          {/* Card 2 - NGO Program Feed */}
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80 hover:border-emerald-500/40 transition-all space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">
              <Heart className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 inline-block">
              Sisi NGO
            </span>
            <p className="text-xl font-bold text-white">2. Verified NGO Program Catalog</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Katalog program sosial terverifikasi yang siap didanai, mencakup detail RAB, lokasi penerima manfaat, dan klasifikasi Fiqh Asnaf.
            </p>
            <ul className="space-y-2 pt-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verifikasi izin operasional & rekam jejak NGO</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Proposal terstruktur siap ditinjau tim TJSL</span>
              </li>
            </ul>
          </div>

          {/* Card 3 - AI Vector Matching Engine */}
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80 hover:border-teal-500/40 transition-all space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20 inline-block">
              Kecerdasan Buatan
            </span>
            <p className="text-xl font-bold text-white">3. AI Bidirectional Match Engine</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Algoritma AI berbasis Gemini & 1536d vector embedding yang secara otomatis mencocokkan program NGO dengan alokasi korporasi dari dua arah.
            </p>
            <ul className="space-y-2 pt-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Match score otomatis berdasarkan Pilar ESG & Fiqh</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Rekomendasi kemitraan presisi tinggi</span>
              </li>
            </ul>
          </div>

          {/* Card 4 - Verified Directory */}
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80 hover:border-indigo-500/40 transition-all space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20 inline-block">
              Data & Direktori
            </span>
            <p className="text-xl font-bold text-white">4. Direktori 3.000+ Korporasi & 1.200+ NGO</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Database terverifikasi lengkap dengan kontak penanggung jawab, situs resmi aktif (HTTP 200 OK), serta data historis penyaluran CSR.
            </p>
            <ul className="space-y-2 pt-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Filter sektor, Tbk ticker, dan lokasi wilayah</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Discovery enrichment otomatis via HTTP ping</span>
              </li>
            </ul>
          </div>

        </div>

      </section>

      {/* 4. Interactive Product Preview Section (Bidirectional Demo) */}
      <section id="demo" className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-800/50 space-y-12">
        
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
            Interactive Product Preview
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Uji Pencocokan Dua Arah Engine CSRmatics
          </h2>
          <p className="text-slate-400 text-sm">
            Pilih perspektif pencocokan di bawah ini untuk melihat bagaimana algoritma AI bekerja dari sudut pandang Korporasi maupun NGO.
          </p>
        </div>

        <InteractiveDemo />

      </section>

      {/* 5. NEW SECTION: CSR Opportunities / Marketplace Feed */}
      <section id="opportunities" className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-800/50 space-y-12">
        
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/40 text-emerald-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>Live Impact Marketplace</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            CSR Opportunities Feed
          </h2>
          <p className="text-slate-400 text-sm">
            Eksplorasi peluang kemitraan aktif real-time dari program sosial NGO yang butuh mitra maupun kebutuhan CSR terbuka dari korporasi.
          </p>
        </div>

        <OpportunitiesFeed />

      </section>

      {/* 6. NEW SECTION: How It Works (4 Universal Steps) */}
      <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-800/50 space-y-16">
        
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
            Alur Kerja Platform
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bagaimana CSRmatics Bekerja
          </h2>
          <p className="text-slate-400 text-sm">
            4 langkah mudah menghubungkan korporasi dan lembaga sosial untuk kemitraan yang transparan dan terukur.
          </p>
        </div>

        {/* 4 Steps Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <p className="font-bold text-white text-lg">1. Discover</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Eksplorasi sinyal alokasi dana CSR korporasi atau katalog program sosial terverifikasi dari NGO.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <p className="font-bold text-white text-lg">2. Match</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Engine AI mencocokkan target ESG, lokasi wilayah, anggaran, serta Fiqh Asnaf dengan Match Score presisi.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <p className="font-bold text-white text-lg">3. Connect</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kirim draf icebreaker dan proposal terstruktur secara langsung tanpa perlu melakukan cold outreach manual.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-sm">
              04
            </div>
            <p className="font-bold text-white text-lg">4. Impact</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Realisasikan penyaluran dana program keberlanjutan dan pantau status laporan dampak secara akuntabel.
            </p>
          </div>

        </div>

      </section>

      {/* 7. SDG & Fiqh Alignment Section */}
      <section id="sdgs" className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-800/50 space-y-12 text-center">
        
        <div className="space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
            Compliance & Syariah Alignment
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Diselaraskan dengan 17 SDGs & 8 Asnaf Fiqh
          </h2>
          <p className="text-slate-400 text-sm">
            Menjamin tata kelola kemitraan yang memenuhi kriteria Syariah Zakat/Wakaf dan standar ESG global.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
            <Heart className="w-6 h-6 text-rose-400 mx-auto" />
            <p className="font-bold text-xs text-white">SDG 1 & 2: Tanpa Kemiskinan</p>
            <span className="text-[10px] text-slate-400 block">Asnaf Fakir & Miskin</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
            <BookOpen className="w-6 h-6 text-blue-400 mx-auto" />
            <p className="font-bold text-xs text-white">SDG 4: Pendidikan Berkualitas</p>
            <span className="text-[10px] text-slate-400 block">Beasiswa & Literasi</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
            <Globe className="w-6 h-6 text-emerald-400 mx-auto" />
            <p className="font-bold text-xs text-white">SDG 13: Aksi Iklim & ESG</p>
            <span className="text-[10px] text-slate-400 block">Konservasi Lingkungan</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
            <Award className="w-6 h-6 text-amber-400 mx-auto" />
            <p className="font-bold text-xs text-white">SDG 17: Kemitraan Tujuan</p>
            <span className="text-[10px] text-slate-400 block">Kolaborasi LAZ & Korporasi</span>
          </div>
        </div>

      </section>

      {/* 8. CTA Footer Section */}
      <footer className="border-t border-slate-800 bg-slate-950 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                <Sparkles className="w-4 h-4 text-emerald-200" />
              </div>
              <span className="font-bold text-white text-lg">CSRmatics Two-Sided Platform</span>
            </div>
            <p className="text-xs text-slate-500">
              © 2026 CSRmatics. Enterprise B2B CSR Partnership Platform.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/untuk-korporasi"
              className="px-5 py-2.5 rounded-xl bg-indigo-950/80 hover:bg-indigo-900/80 text-indigo-200 font-bold text-xs border border-indigo-700/50 transition-colors flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Daftar Mitra Korporasi</span>
            </Link>
            <Link
              href="/untuk-ngo"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-700/20 transition-colors flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 text-emerald-200" />
              <span>Daftar Mitra NGO</span>
            </Link>
          </div>

        </div>
      </footer>

    </div>
  );
}
