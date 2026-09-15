'use client';

import React, { useState } from 'react';
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
  Search,
  Users,
  Award,
  Heart,
  Handshake,
  ArrowUpRight,
  Layers,
  Filter,
  Check,
} from 'lucide-react';

export default function LandingPage() {
  // Demo State
  const [demoMode, setDemoMode] = useState<'CORP_TO_NGO' | 'NGO_TO_CORP'>('CORP_TO_NGO');
  const [demoQuery, setDemoQuery] = useState('PT Bank Central Asia Tbk');
  const [selectedTab, setSelectedTab] = useState<'match' | 'profile' | 'proposal'>('match');

  // Opportunities Feed State
  const [opportunityTab, setOpportunityTab] = useState<'NGO_PROGRAMS' | 'CORP_OPENCALLS'>('NGO_PROGRAMS');

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
            <Link href="/pricing?persona=corporate" className="hover:text-indigo-300 flex items-center gap-1.5 whitespace-nowrap">
              <span>For Corporates</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">3.000+</span>
            </Link>
            <Link href="/pricing?persona=ngo" className="hover:text-emerald-400 flex items-center gap-1.5 whitespace-nowrap">
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
              href="/pricing?persona=corporate"
              className="hidden sm:flex px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-950/80 hover:bg-indigo-900/80 text-indigo-200 border border-indigo-700/50 transition-all items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Join Korporasi</span>
            </Link>
            <Link
              href="/pricing?persona=ngo"
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
            Platform terpadu dua arah yang mempertemukan <strong className="text-indigo-300 font-semibold">Korporasi</strong> dan <strong className="text-emerald-300 font-semibold">Lembaga Sosial (NGO)</strong> untuk merealisasikan program keberlanjutan secara presisi, terverifikasi, dan akuntabel.
          </p>
        </div>

        {/* Dual Split Persona CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link
            href="/pricing?persona=corporate"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all flex items-center justify-center gap-2 border border-indigo-400/30 group"
          >
            <Building2 className="w-4 h-4 text-indigo-200 group-hover:scale-110 transition-transform" />
            <span>Saya Korporasi</span>
            <ArrowRight className="w-4 h-4 text-indigo-200 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/pricing?persona=ngo"
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
            Proses kemitraan CSR tradisional terhambat oleh proposal yang tidak sesuai sasaran, riset manual yang memakan waktu, serta minimnya transparansi. CSRmatics hadir sebagai hub pintar yang menyelaraskan kedua pihak.
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
                  <h3 className="text-xl font-extrabold text-white">Penyaluran Dana Presisi & Berdampak</h3>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">Kurasi NGO & Program Terverifikasi</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Jelajahi yayasan dan lembaga sosial yang telah diverifikasi legalitas, izin operasional, dan rekam jejak penyalurannya.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">Selaras ESG, SDGs & Fiqh Asnaf</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Pencocokan AI memastikan program sosial selaras dengan pilar ESG perusahaan dan kriteria syariah zakat/wakaf.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">Skor Kecocokan 2-Arah Automatis</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Dapatkan rekomendasi mitra NGO dengan Match Score tertinggi tanpa perlu menyeleksi ratusan proposal fisik secara manual.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/pricing?persona=corporate"
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
                  <h3 className="text-xl font-extrabold text-white">Pendanaan Berkelanjutan Tanpa Cold Outreach</h3>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">Target Korporasi yang Tepat Sasaran</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Hubungi perusahaan yang terdeteksi sedang membuka alokasi CSR dan memiliki pilar fokus yang cocok dengan program Anda.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">Transparansi Status Proposal</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Pantau pergerakan proposal Anda secara real-time dari peninjauan awal hingga persetujuan pendanaan.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">Tampilkan Program di Marketplace Feed</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Daftarkan program unggulan Anda di katalog terbuka yang diakses langsung oleh manajer CSR & TJSL perusahaan BUMN/Tbk.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/pricing?persona=ngo"
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
            <h3 className="text-xl font-bold text-white">1. Real-Time Corporate Signal Feed</h3>
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
            <h3 className="text-xl font-bold text-white">2. Verified NGO Program Catalog</h3>
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
            <h3 className="text-xl font-bold text-white">3. AI Bidirectional Match Engine</h3>
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
            <h3 className="text-xl font-bold text-white">4. Direktori 3.000+ Korporasi & 1.200+ NGO</h3>
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

        {/* Directional Toggle Bar (Corporate -> NGO vs NGO -> Corporate) */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg">
            <button
              onClick={() => {
                setDemoMode('CORP_TO_NGO');
                setDemoQuery('PT Bank Central Asia Tbk');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                demoMode === 'CORP_TO_NGO'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Perspektif Korporasi → NGO</span>
            </button>
            <button
              onClick={() => {
                setDemoMode('NGO_TO_CORP');
                setDemoQuery('Yayasan Literasi Nusantara');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                demoMode === 'NGO_TO_CORP'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Perspektif NGO → Korporasi</span>
            </button>
          </div>
        </div>

        {/* Interactive Mock Dashboard Preview Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Mock Top Control Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-80">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={demoQuery}
                  onChange={(e) => setDemoQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-white focus:outline-none focus:border-emerald-500 transition-all"
                  placeholder={demoMode === 'CORP_TO_NGO' ? 'Ketik nama korporasi...' : 'Ketik nama NGO/Program...'}
                />
              </div>
            </div>

            {/* Mock Tabs */}
            <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button
                onClick={() => setSelectedTab('match')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedTab === 'match'
                    ? demoMode === 'CORP_TO_NGO' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                AI Match Score ({demoMode === 'CORP_TO_NGO' ? '94.8%' : '96.2%'})
              </button>
              <button
                onClick={() => setSelectedTab('profile')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedTab === 'profile'
                    ? demoMode === 'CORP_TO_NGO' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Status Verification
              </button>
              <button
                onClick={() => setSelectedTab('proposal')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedTab === 'proposal'
                    ? demoMode === 'CORP_TO_NGO' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Draf Icebreaker Pitch
              </button>
            </div>

          </div>

          {/* Demo Content Preview */}
          <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg border ${
                  demoMode === 'CORP_TO_NGO' 
                    ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' 
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                  {demoMode === 'CORP_TO_NGO' ? <Building2 className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-base">{demoQuery}</h4>
                    {demoMode === 'CORP_TO_NGO' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        BBCA
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        NGO TERVERIFIKASI
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400">
                    {demoMode === 'CORP_TO_NGO' ? 'Sektor Perbankan & Jasa Keuangan' : 'Fokus: Beasiswa Digital & Pendidikan Desa'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{demoMode === 'CORP_TO_NGO' ? 'https://www.bca.co.id (Verified 200 OK)' : 'Legalitas Yayasan Terverifikasi (Kemenkumham)'}</span>
                </span>
              </div>
            </div>

            {selectedTab === 'match' && (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    {demoMode === 'CORP_TO_NGO' 
                      ? 'Rekomendasi Program NGO Cocok: Beasiswa Digital Berkelanjutan (Match 94.8%)' 
                      : 'Rekomendasi Donor Korporasi Cocok: PT Bank Central Asia Tbk (Match 96.2%)'}
                  </span>
                  <span className="text-slate-400 font-semibold">
                    {demoMode === 'CORP_TO_NGO' ? 'Potensi Anggaran: Rp 1,5 Miliar' : 'Estimasi Alokasi Pilar: Rp 500 Juta'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {demoMode === 'CORP_TO_NGO' 
                    ? 'Program "Bakti BCA Education & Digital Literacy" memiliki relevansi sangat tinggi dengan Program Beasiswa Digital milik Yayasan Literasi Nusantara (Asnaf: Fisabilillah/Fakir).'
                    : 'Pilar CSR Bakti BCA saat ini memprioritaskan literasi digital di 12 provinsi target. Program Beasiswa Digital Anda memenuhi 100% kriteria penerima manfaat mereka.'}
                </p>
              </div>
            )}

            {selectedTab === 'profile' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block uppercase tracking-wider text-[10px]">
                    {demoMode === 'CORP_TO_NGO' ? 'Pilar Utama CSR' : 'Cakupan Wilayah'}
                  </span>
                  <span className="font-semibold text-white mt-1 block">
                    {demoMode === 'CORP_TO_NGO' ? 'Bakti BCA, Pendidikan, Lingkungan' : 'Jawa Barat, Jawa Tengah, NTT'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block uppercase tracking-wider text-[10px]">
                    {demoMode === 'CORP_TO_NGO' ? 'Mitra NGO Historis' : 'Track Record Program'}
                  </span>
                  <span className="font-semibold text-white mt-1 block">
                    {demoMode === 'CORP_TO_NGO' ? 'Baznas, Kitabisa, Kick Andy' : '1.200+ Alumni Beasiswa'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block uppercase tracking-wider text-[10px]">
                    {demoMode === 'CORP_TO_NGO' ? 'Kontak PIC CSR' : 'Legalitas & Akreditasi'}
                  </span>
                  <span className="font-semibold text-emerald-400 mt-1 block">
                    {demoMode === 'CORP_TO_NGO' ? 'csr@bca.co.id' : 'Sk Kemenkumham AHU-0012948'}
                  </span>
                </div>
              </div>
            )}

            {selectedTab === 'proposal' && (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <span className="text-slate-400 font-mono text-[11px] block">Generated AI Executive Icebreaker:</span>
                <p className="text-slate-200 italic leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {demoMode === 'CORP_TO_NGO' 
                    ? '"Yth. Tim Bakti BCA, seiring komitmen Bakti BCA dalam literasi digital, Yayasan Literasi Nusantara mengundang sinergi Program Beasiswa Digital Berkelanjutan untuk 500 penerima manfaat..."'
                    : '"Yth. Head of Corporate Sustainability BCA, kami dari Yayasan Literasi Nusantara melihat keselarasan tinggi antara fokus Bakti BCA dan program 500 Beasiswa Digital Desa kami..."'}
                </p>
              </div>
            )}

          </div>

        </div>

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

        {/* Opportunity Tabs */}
        <div className="flex justify-center">
          <div className="p-1 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2">
            <button
              onClick={() => setOpportunityTab('NGO_PROGRAMS')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                opportunityTab === 'NGO_PROGRAMS'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Program NGO (Butuh Pendanaan)</span>
            </button>
            <button
              onClick={() => setOpportunityTab('CORP_OPENCALLS')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                opportunityTab === 'CORP_OPENCALLS'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Open Call CSR Korporasi</span>
            </button>
          </div>
        </div>

        {/* Opportunities Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {opportunityTab === 'NGO_PROGRAMS' ? (
            <>
              {/* Opportunity Card 1 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      SDG 4: Pendidikan
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">Match 95.4%</span>
                  </div>
                  <h4 className="font-bold text-white text-base leading-snug">Beasiswa Coding & Digital Literacy Anak Desa</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Yayasan Aksara Nusantara • Kebutuhan Dana: Rp 350 Juta (Target: 200 Siswa SMKN di Jawa Barat).
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                  <span className="text-[11px] text-emerald-400 font-semibold">Asnaf: Fisabilillah</span>
                  <Link href="/pricing?persona=corporate" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                    <span>Lihat Detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Opportunity Card 2 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      SDG 13: Lingkungan
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">Match 92.1%</span>
                  </div>
                  <h4 className="font-bold text-white text-base leading-snug">Restorasi Mangrove & Pemberdayaan Nelayan Pesisir</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    LAZ Hijau Indonesia • Kebutuhan Dana: Rp 600 Juta (Target: 50.000 Bibit Mangrove di Muara Gembong).
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                  <span className="text-[11px] text-teal-400 font-semibold">Asnaf: Maslahat Umum</span>
                  <Link href="/pricing?persona=corporate" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                    <span>Lihat Detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Opportunity Card 3 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      SDG 3: Kesehatan
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">Match 91.8%</span>
                  </div>
                  <h4 className="font-bold text-white text-base leading-snug">Posyandu Pintar & Pencegahan Stunting Daerah 3T</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Yayasan Sehat Peduli • Kebutuhan Dana: Rp 450 Juta (Target: 15 Desa di NTT & Maluku).
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                  <span className="text-[11px] text-amber-400 font-semibold">Asnaf: Fakir / Miskin</span>
                  <Link href="/pricing?persona=corporate" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                    <span>Lihat Detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Open Call Card 1 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      Sektor Finansial
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">Anggaran Q3-Q4</span>
                  </div>
                  <h4 className="font-bold text-white text-base leading-snug">Program Inklusi Keuangan & UMKM Wanita Desa</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    PT Bank Mandiri (Persero) Tbk • Alokasi CSR Terbuka: Rp 1.2 Miliar untuk NGO Pelaksana Terverifikasi.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                  <span className="text-[11px] text-indigo-400 font-semibold">BUMN Tbk</span>
                  <Link href="/pricing?persona=ngo" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                    <span>Ajukan Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Open Call Card 2 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      Sektor Telekomunikasi
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">Anggaran Q3</span>
                  </div>
                  <h4 className="font-bold text-white text-base leading-snug">Infrastruktur Internet Sekolah Terpencil</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    PT Telkom Indonesia Tbk • Alokasi Terbuka: Rp 850 Juta untuk 30 Sekolah di Indonesia Timur.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                  <span className="text-[11px] text-blue-400 font-semibold">Telko BUMN</span>
                  <Link href="/pricing?persona=ngo" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                    <span>Ajukan Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Open Call Card 3 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Sektor Energi & Pertambangan
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">Anggaran Tahunan</span>
                  </div>
                  <h4 className="font-bold text-white text-base leading-snug">Program Pembinaan Desa Mandiri Energi</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    PT Adaro Energy Indonesia Tbk • Alokasi Terbuka: Rp 2.0 Miliar untuk Konservasi & Pemberdayaan.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                  <span className="text-[11px] text-purple-400 font-semibold">Emiten ESG</span>
                  <Link href="/pricing?persona=ngo" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                    <span>Ajukan Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </>
          )}

        </div>

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
            <h4 className="font-bold text-white text-lg">1. Discover</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Eksplorasi sinyal alokasi dana CSR korporasi atau katalog program sosial terverifikasi dari NGO.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h4 className="font-bold text-white text-lg">2. Match</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Engine AI mencocokkan target ESG, lokasi wilayah, anggaran, serta Fiqh Asnaf dengan Match Score presisi.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h4 className="font-bold text-white text-lg">3. Connect</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kirim draf icebreaker dan proposal terstruktur secara langsung tanpa perlu melakukan cold outreach manual.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-sm">
              04
            </div>
            <h4 className="font-bold text-white text-lg">4. Impact</h4>
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
            <h4 className="font-bold text-xs text-white">SDG 1 & 2: Tanpa Kemiskinan</h4>
            <span className="text-[10px] text-slate-400 block">Asnaf Fakir & Miskin</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
            <BookOpen className="w-6 h-6 text-blue-400 mx-auto" />
            <h4 className="font-bold text-xs text-white">SDG 4: Pendidikan Berkualitas</h4>
            <span className="text-[10px] text-slate-400 block">Beasiswa & Literasi</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
            <Globe className="w-6 h-6 text-emerald-400 mx-auto" />
            <h4 className="font-bold text-xs text-white">SDG 13: Aksi Iklim & ESG</h4>
            <span className="text-[10px] text-slate-400 block">Konservasi Lingkungan</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
            <Award className="w-6 h-6 text-amber-400 mx-auto" />
            <h4 className="font-bold text-xs text-white">SDG 17: Kemitraan Tujuan</h4>
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
              href="/pricing?persona=corporate"
              className="px-5 py-2.5 rounded-xl bg-indigo-950/80 hover:bg-indigo-900/80 text-indigo-200 font-bold text-xs border border-indigo-700/50 transition-colors flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Join as Corporate</span>
            </Link>
            <Link
              href="/pricing?persona=ngo"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-700/20 transition-colors flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 text-emerald-200" />
              <span>Join as NGO</span>
            </Link>
          </div>

        </div>
      </footer>

    </div>
  );
}
