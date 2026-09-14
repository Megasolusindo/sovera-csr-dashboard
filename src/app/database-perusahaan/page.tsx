import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2,
  Sparkles,
  Search,
  ShieldCheck,
  MapPin,
  ExternalLink,
  Filter,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Database Perusahaan CSR & TJSL Indonesia | CSRmatics',
  description:
    'Direktori publik perusahaan aktif penyalur CSR, BUMN, Bank, Emiten Tbk, dan Swasta di Indonesia. Filter pilar ESG, lokasi wilayah, dan riwayat program keberlanjutan.',
  keywords: [
    'Database Perusahaan CSR',
    'Direktori CSR Indonesia',
    'TJSL BUMN',
    'Daftar CSR Perusahaan',
    'Perusahaan Aktif CSR',
    'CSR Bank',
    'Emiten ESG',
  ],
  openGraph: {
    title: 'Database Perusahaan CSR & TJSL Indonesia | CSRmatics',
    description:
      'Direktori publik 3.000+ profil korporasi BUMN, Tbk, Bank, dan Swasta yang aktif menyalurkan alokasi dana CSR & program sosial.',
    url: 'https://csrmatics.com/database-perusahaan',
    siteName: 'CSRmatics',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://csrmatics.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'CSRmatics — Database Perusahaan CSR & TJSL Indonesia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Database Perusahaan CSR & TJSL Indonesia | CSRmatics',
    description:
      'Direktori publik 3.000+ profil korporasi BUMN, Tbk, Bank, dan Swasta yang aktif menyalurkan alokasi dana CSR & program sosial.',
    images: ['https://csrmatics.com/opengraph-image'],
  },
};

const SAMPLE_COMPANIES = [
  {
    slug: 'bca',
    name: 'PT Bank Central Asia Tbk',
    ticker: 'BBCA',
    sector: 'Perbankan & Jasa Keuangan',
    province: 'DKI Jakarta',
    website: 'https://www.bca.co.id',
    csrPillars: ['Bakti BCA', 'Pendidikan & Literasi', 'Environment & ESG'],
    verified: true,
  },
  {
    slug: 'bri',
    name: 'PT Bank Rakyat Indonesia (Persero) Tbk',
    ticker: 'BBRI',
    sector: 'Perbankan BUMN',
    province: 'DKI Jakarta',
    website: 'https://www.bri.co.id',
    csrPillars: ['Peduli BRI', 'Pemberdayaan UMKM', 'Beasiswa Desa'],
    verified: true,
  },
  {
    slug: 'bank-mandiri',
    name: 'PT Bank Mandiri (Persero) Tbk',
    ticker: 'BMRI',
    sector: 'Perbankan BUMN',
    province: 'DKI Jakarta',
    website: 'https://www.bankmandiri.co.id',
    csrPillars: ['Mandiri Bersama Mandiri', 'Inklusi Keuangan', 'Kesehatan'],
    verified: true,
  },
  {
    slug: 'pertamina',
    name: 'PT Pertamina (Persero)',
    ticker: 'BUMN',
    sector: 'Energi & Migas BUMN',
    province: 'DKI Jakarta',
    website: 'https://www.pertamina.com',
    csrPillars: ['Pertamina Hijau', 'Pertamina Cerdas', 'Desa Mandiri Energi'],
    verified: true,
  },
  {
    slug: 'telkom-indonesia',
    name: 'PT Telkom Indonesia (Persero) Tbk',
    ticker: 'TLKM',
    sector: 'Telekomunikasi BUMN',
    province: 'Jawa Barat',
    website: 'https://www.telkom.co.id',
    csrPillars: ['DigiStar', 'Internet Sekolah 3T', 'Digital Empowerment'],
    verified: true,
  },
  {
    slug: 'pln',
    name: 'PT PLN (Persero)',
    ticker: 'BUMN',
    sector: 'Ketenagalistrikan BUMN',
    province: 'DKI Jakarta',
    website: 'https://www.pln.co.id',
    csrPillars: ['PLN Peduli', 'Elektrifikasi Desa', 'Konservasi Lingkungan'],
    verified: true,
  },
  {
    slug: 'adaro-energy',
    name: 'PT Adaro Energy Indonesia Tbk',
    ticker: 'ADRO',
    sector: 'Energi & Pertambangan',
    province: 'Kalimantan Selatan',
    website: 'https://www.adaro.com',
    csrPillars: ['Adaro Nyalakan Ilmu', 'Air Bersih', 'Kesehatan Desa'],
    verified: true,
  },
  {
    slug: 'astra-international',
    name: 'PT Astra International Tbk',
    ticker: 'ASII',
    sector: 'Otomotif & Konglomerasi',
    province: 'DKI Jakarta',
    website: 'https://www.astra.co.id',
    csrPillars: ['Kampung Berseri Astra', 'Pendidikan', 'Kewirausahaan'],
    verified: true,
  },
];

export default function DatabasePerusahaanPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-600/15 via-emerald-900/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Navigation Header */}
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
                Corporate Directory SEO
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-emerald-400">Home</Link>
            <Link href="/untuk-korporasi" className="hover:text-emerald-400">For Corporates</Link>
            <Link href="/untuk-ngo" className="hover:text-emerald-400">For NGOs</Link>
            <Link href="/database-perusahaan" className="text-emerald-400 font-bold">Corporate Directory</Link>
            <Link href="/pricing" className="hover:text-emerald-400">Pricing</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white border border-slate-800"
            >
              Masuk
            </Link>
            <Link
              href="/pricing"
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg"
            >
              Akses Database Lengkap
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 px-6 max-w-7xl mx-auto space-y-12">
        
        {/* Title & SEO Description */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Directory Terverifikasi 3.000+ Perusahaan</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Database Perusahaan CSR & TJSL Indonesia
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Temukan korporasi BUMN, emiten Tbk, perbankan, dan swasta yang aktif menyalurkan alokasi dana CSR, program TJSL, dan inisiatif keberlanjutan ESG.
          </p>
        </div>

        {/* Filter Pills Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          <span className="text-xs font-bold text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Sektor:
          </span>
          <button className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 text-white shadow">
            Semua Sektor
          </button>
          <button className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 text-slate-300 hover:text-white border border-slate-800">
            Perbankan & Finansial
          </button>
          <button className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 text-slate-300 hover:text-white border border-slate-800">
            BUMN & TJSL
          </button>
          <button className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 text-slate-300 hover:text-white border border-slate-800">
            Energi & Pertambangan
          </button>
          <button className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 text-slate-300 hover:text-white border border-slate-800">
            Telekomunikasi
          </button>
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_COMPANIES.map((company) => (
            <Link
              key={company.slug}
              href={`/database-perusahaan/${company.slug}`}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-4 group backdrop-blur-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {company.ticker}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors">
                    {company.name}
                  </h3>
                  <span className="text-xs text-slate-400 block mt-0.5">{company.sector}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                  <span>{company.province}</span>
                </div>
                <div className="pt-2 border-t border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Pilar Utama CSR:</span>
                  <div className="flex flex-wrap gap-1">
                    {company.csrPillars.map((pillar) => (
                      <span key={pillar} className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
                        {pillar}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>Lihat Profil CSR</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

      </main>
    </div>
  );
}
