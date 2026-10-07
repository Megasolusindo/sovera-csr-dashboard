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

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Database Perusahaan CSR & TJSL Indonesia | CSRmatics',
  description:
    'Direktori perusahaan aktif penyalur CSR & BUMN di Indonesia. Filter pilar ESG, lokasi wilayah, dan riwayat program keberlanjutan.',
  alternates: {
    canonical: 'https://csrmatics.com/database-perusahaan',
  },
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
      'Direktori publik ribuan profil korporasi BUMN, Tbk, Bank, dan Swasta yang aktif menyalurkan alokasi dana CSR & program sosial.',
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
      'Direktori publik ribuan profil korporasi BUMN, Tbk, Bank, dan Swasta yang aktif menyalurkan alokasi dana CSR & program sosial.',
    images: ['https://csrmatics.com/opengraph-image'],
  },
};

// Server-side base URL for SSR fetches.
const API_BASE_URL =
  process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1';

type DirectoryCompany = {
  slug: string;
  name: string;
  ticker: string;
  sector: string;
  province: string;
  website: string;
  csrPillars: string[];
  verified: boolean;
};

// Fetch real companies from the public API, mapping to the shape the UI renders.
// When the API is unreachable or empty the page says so; it no longer lists sample companies (one of them
// was "Corporate (demo)") with invented CSR programs and a verified badge.
async function getCompanies(): Promise<{ companies: DirectoryCompany[]; total: number; failed: boolean }> {
  try {
    const res = await fetch(`${API_BASE_URL}/companies?limit=60&offset=0`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const rows: any[] = Array.isArray(json.data) ? json.data : [];
    const total: number = json?.pagination?.total ?? rows.length;
    const companies: DirectoryCompany[] = rows.map((r) => ({
      slug: r.slug || r.id,
      name: r.name || r.legal_name || '—',
      ticker: r.ticker || (r.company_type || 'CORP'),
      sector: r.industry_sector || r.csr_category || 'Multi-Industri',
      province: r.headquarters || '',
      website: r.website || '',
      csrPillars: r.csr_category ? [r.csr_category] : [],
      verified: r.website_status === 'VALID' || r.is_claimed === true,
    }));
    return { companies, total, failed: false };
  } catch {
    return { companies: [], total: 0, failed: true };
  }
}

export default async function DatabasePerusahaanPage() {
  const { companies, total, failed } = await getCompanies();
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
            <Link href="/blog" className="hover:text-emerald-400">Blog</Link>
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
            <span>{failed ? 'Direktori Perusahaan' : `Direktori ${total.toLocaleString('id-ID')} Perusahaan`}</span>
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

        {(failed || companies.length === 0) && (
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center text-sm text-slate-300">
            {failed
              ? 'Data perusahaan tidak dapat dimuat saat ini. Silakan coba lagi beberapa saat lagi.'
              : 'Belum ada perusahaan yang dapat ditampilkan.'}
          </div>
        )}

        {/* Company Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companies.map((company) => (
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
                <span>Profil CSR {company.ticker}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

      </main>
    </div>
  );
}
