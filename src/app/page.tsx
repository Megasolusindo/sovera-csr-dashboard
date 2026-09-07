'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Building2,
  Radio,
  FolderKanban,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Globe,
  ShieldCheck,
  Zap,
  Target,
  FileText,
  Search,
  BarChart3,
  Layers,
  ChevronRight,
  ExternalLink,
  Users,
  Award,
  Heart,
  TrendingUp,
} from 'lucide-react';

export default function LandingPage() {
  const [demoQuery, setDemoQuery] = useState('PT Bank Central Asia Tbk');
  const [selectedTab, setSelectedTab] = useState<'match' | 'profile' | 'proposal'>('match');

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
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white block leading-none">
                SOVERA
              </span>
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-widest block mt-0.5">
                FundIQ Enterprise
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-emerald-400 transition-colors">Fitur Platform</a>
            <Link href="/corporates" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <span>Corporate Directory</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">3.000+</span>
            </Link>
            <a href="#demo" className="hover:text-emerald-400 transition-colors">Interactive Demo</a>
            <a href="#sdgs" className="hover:text-emerald-400 transition-colors">SDG & Fiqh Alignment</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all border border-transparent hover:border-slate-700"
            >
              Masuk Sesi
            </Link>
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-lg shadow-emerald-700/25 hover:shadow-emerald-600/40 transition-all flex items-center gap-2"
            >
              <span>Buka Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="pt-16 pb-24 px-6 max-w-7xl mx-auto text-center space-y-8 relative">
        
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/80 border border-emerald-700/40 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Sovera FundIQ v2.0 — Enterprise B2B Fundraising & AI Deal Engine</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </div>

        {/* Hero Main Headline */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.15]">
            Temukan Perusahaan yang Tepat untuk{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              Membiayai Program Anda
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            AI membantu LAZ, yayasan, dan lembaga filantropi menemukan{' '}
            <strong className="text-emerald-400 font-bold">perusahaan dengan prioritas CSR & ESG yang paling sesuai</strong>{' '}
            dengan program Anda.
          </p>
          <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto">
            Akses <strong className="text-white font-bold">3.000+ perusahaan di Indonesia</strong> dan ubah pencarian donor menjadi pipeline partnership yang terukur.
          </p>
        </div>

        {/* Primary CTA Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/corporates"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-base shadow-xl shadow-emerald-700/30 hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-3 group"
          >
            <Building2 className="w-5 h-5 text-emerald-100 group-hover:scale-110 transition-transform" />
            <span>Cari Mitra CSR</span>
            <ArrowRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-base border border-slate-700/80 hover:border-emerald-500/50 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <span>Masuk Dashboard SaaS</span>
          </Link>
        </div>

        {/* Live Metrics Cards */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
          
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-1 hover:border-emerald-500/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-white">3.000+</span>
              <Building2 className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-xs font-semibold text-slate-400 block">Database Perusahaan</span>
            <p className="text-[11px] text-slate-500">BUMN, Tbk, Bank & Swasta</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-1 hover:border-emerald-500/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-white">2.800+</span>
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xs font-semibold text-slate-400 block">Website Live Verified</span>
            <p className="text-[11px] text-slate-500">100% HTTP 200 OK Ping</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-1 hover:border-emerald-500/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-white">24/7</span>
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-xs font-semibold text-slate-400 block">AI WebScraper Crawler</span>
            <p className="text-[11px] text-slate-500">Monitoring Sinyal CSR Real-Time</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-1 hover:border-emerald-500/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-white">1536d</span>
              <Target className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="text-xs font-semibold text-slate-400 block">Vector Embedding</span>
            <p className="text-[11px] text-slate-500">Pencocokan Pilar & Fiqh Asnaf</p>
          </div>

        </div>

      </section>

      {/* 3. Bento Grid Features Section */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-800/50 space-y-16">
        
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
            Fitur Utama Enterprise
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Semua Perkakas Kemitraan CSR dalam Satu Platform
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Dirancang khusus untuk membantu tim Fundraiser & Partnership LAZ / Yayasan melakukan prospecting corporate deal secara ilmiah dan berbasis data.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 - Corporate Intelligence Feed */}
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80 hover:border-emerald-500/40 transition-all space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">1. Real-Time Corporate Signal Feed</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Crawler otomatis memantau rilis berita, laporan tahunan BEI, portal BUMN, dan rilis ESG 24 jam sehari untuk mendeteksi alokasi anggaran CSR baru.
            </p>
            <ul className="space-y-2 pt-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Deteksi sinyal intent pencairan anggaran</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Analisis pilar fokus (Pendidikan, Kesehatan, ESG)</span>
              </li>
            </ul>
          </div>

          {/* Card 2 - Verified Corporate Directory */}
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80 hover:border-emerald-500/40 transition-all space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">2. Direktori 2.080+ Perusahaan Verified</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Database autentik perusahaan perbankan, BUMN, emiten Tbk, dan swasta dengan verifikasi domain resmi 100% aktif (Zero dead links).
            </p>
            <ul className="space-y-2 pt-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Filter berdasarkan sektor & ticker saham</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Enrichment discovery otomatis via Serper API</span>
              </li>
            </ul>
          </div>

          {/* Card 3 - AI Vector Matching Engine */}
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80 hover:border-emerald-500/40 transition-all space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">3. AI Program Matcher & Fiqh Asnaf</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kecerdasan buatan berbasis Gemini 1.5 Flash & 1536d vector embedding yang mencocokkan program LAZ/Yayasan dengan alokasi CSR korporasi.
            </p>
            <ul className="space-y-2 pt-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Perhitungan Match Score & kriteria Fiqh</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Rekomendasi program filantropi presisi</span>
              </li>
            </ul>
          </div>

        </div>

      </section>

      {/* 4. Live Product Interactive Preview Section */}
      <section id="demo" className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-800/50 space-y-12">
        
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
            Interactive Product Preview
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Lihat Bagaimana Engine Sovera Bekerja
          </h2>
          <p className="text-slate-400 text-sm">
            Uji pencarian kecerdasan CSR perusahaan di bawah ini secara langsung.
          </p>
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
                  placeholder="Ketik nama perusahaan..."
                />
              </div>
            </div>

            {/* Mock Tabs */}
            <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button
                onClick={() => setSelectedTab('match')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedTab === 'match'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                AI Match Score (94%)
              </button>
              <button
                onClick={() => setSelectedTab('profile')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedTab === 'profile'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Domain Status (Verified)
              </button>
              <button
                onClick={() => setSelectedTab('proposal')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedTab === 'proposal'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Draf Icebreaker Pitch
              </button>
            </div>

          </div>

          {/* Demo Content Preview */}
          <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-lg">
                  B
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-base">{demoQuery}</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      BBCA
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">Sektor Perbankan & Jasa Keuangan</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>https://www.bca.co.id (Verified 200 OK)</span>
                </span>
              </div>
            </div>

            {selectedTab === 'match' && (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    AI Vector Match Score: 94.8% (Sangat Cocok)
                  </span>
                  <span className="text-slate-500">Estimasi Alokasi: Rp 1,5 Miliar</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Program "Bakti BCA Education & Digital Literacy" memiliki relevansi tinggi dengan Program Beasiswa & Pemberdayaan Ekonomi LAZ Peduli Ummat (Asnaf: Fakir/Fisabilillah).
                </p>
              </div>
            )}

            {selectedTab === 'profile' && (
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Pilar Utama CSR</span>
                  <span className="font-semibold text-white mt-1 block">Bakti BCA, Pendidikan, Environment</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Partner NGO Sebelumnya</span>
                  <span className="font-semibold text-white mt-1 block">Baznas, Kitabisa, Kick Andy</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Kontak Publik CSR</span>
                  <span className="font-semibold text-emerald-400 mt-1 block">csr@bca.co.id</span>
                </div>
              </div>
            )}

            {selectedTab === 'proposal' && (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <span className="text-slate-400 font-mono text-[11px] block">Generated Executive Icebreaker:</span>
                <p className="text-slate-200 italic leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                  "Yth. Tim Bakti BCA, seiring komitmen Bakti BCA dalam literasi digital, LAZ Peduli Ummat mengundang sinergi Program Beasiswa Digital Berkelanjutan untuk 500 penerima manfaat..."
                </p>
              </div>
            )}

          </div>

        </div>

      </section>

      {/* 5. SDG & Fiqh Alignment Section */}
      <section id="sdgs" className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-800/50 space-y-12 text-center">
        
        <div className="space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
            Compliance & Fiqh Alignment
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

      {/* 6. CTA Footer Section */}
      <footer className="border-t border-slate-800 bg-slate-950 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                <Sparkles className="w-4 h-4 text-emerald-200" />
              </div>
              <span className="font-bold text-white text-lg">SOVERA FundIQ Enterprise</span>
            </div>
            <p className="text-xs text-slate-500">
              © 2026 SOVERA. Enterprise B2B Philanthropy & CSR Match Engine.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/corporates"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-800 transition-colors"
            >
              Corporate Directory
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-700/20 transition-colors"
            >
              Buka System Dashboard
            </Link>
          </div>

        </div>
      </footer>

    </div>
  );
}
