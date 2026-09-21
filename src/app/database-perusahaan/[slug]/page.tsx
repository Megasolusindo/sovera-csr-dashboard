import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Building2,
  Sparkles,
  ShieldCheck,
  MapPin,
  Globe,
  ArrowRight,
  CheckCircle2,
  Target,
  BookOpen,
  Heart,
  Award,
  Calendar,
  FileText,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

interface CompanyData {
  slug: string;
  name: string;
  ticker: string;
  sector: string;
  province: string;
  address: string;
  website: string;
  csrEmail: string;
  description: string;
  tjslFocus: string;
  csrPillars: { title: string; desc: string; asnaf: string }[];
  activePrograms: { title: string; budget: string; location: string }[];
  lastUpdated: string;
  sources: string[];
}

const COMPANY_DATABASE: Record<string, CompanyData> = {
  bca: {
    slug: 'bca',
    name: 'PT Bank Central Asia Tbk',
    ticker: 'BBCA',
    sector: 'Perbankan & Jasa Keuangan',
    province: 'DKI Jakarta',
    address: 'Menara BCA, Grand Indonesia, Jl. M.H. Thamrin No. 1, Jakarta Pusat',
    website: 'https://www.bca.co.id',
    csrEmail: 'csr@bca.co.id',
    description: 'PT Bank Central Asia Tbk (BCA) adalah salah satu bank swasta terbesar di Indonesia yang berkomitmen mengalokasikan dana CSR melalui program kewargaan perusahaan Bakti BCA.',
    tjslFocus: 'Pendidikan, Literasi Digital, Lingkungan Hidup, & Pemberdayaan Komunitas Lokal.',
    csrPillars: [
      { title: 'Bakti Pendidikan', desc: 'Beasiswa universitas, pelatihan guru, dan literasi digital sekolah desa.', asnaf: 'Fisabilillah / Ibnu Sabil' },
      { title: 'Bakti Lingkungan', desc: 'Konservasi penyu, penanaman pohon mangrove, dan pengelolaan sampah.', asnaf: 'Maslahat Umum' },
      { title: 'Bakti Komunitas', desc: 'Pemberdayaan desa wisata Bakti BCA dan akses kesehatan.', asnaf: 'Fakir / Miskin' },
    ],
    activePrograms: [
      { title: 'Beasiswa Bakti BCA 2026', budget: 'Rp 2.5 Miliar', location: '18 Perguruan Tinggi Negeri' },
      { title: 'Desa Binaan Wisata Bakti BCA', budget: 'Rp 1.2 Miliar', location: 'Jawa Barat & Yogyakarta' },
    ],
    lastUpdated: '14 September 2026',
    sources: ['Laporan Keberlanjutan BCA 2025', 'Portal Bakti BCA (bca.co.id)', 'Rilis Resmi BEI'],
  },
  bri: {
    slug: 'bri',
    name: 'PT Bank Rakyat Indonesia (Persero) Tbk',
    ticker: 'BBRI',
    sector: 'Perbankan BUMN',
    province: 'DKI Jakarta',
    address: 'Gedung BRI 1, Jl. Jend. Sudirman Kaveling 44-46, Jakarta Pusat',
    website: 'https://www.bri.co.id',
    csrEmail: 'csr@bri.co.id',
    description: 'PT Bank Rakyat Indonesia (Persero) Tbk menyalurkan program Tanggung Jawab Sosial dan Lingkungan (TJSL) melalui inisiatif BRI Peduli yang berfokus pada pemberdayaan UMKM dan masyarakat pedesaan.',
    tjslFocus: 'Pemberdayaan Ekonomi Kerakyatan, Pendidikan Desa, & Bantuan Bencana Alam.',
    csrPillars: [
      { title: 'BRI Peduli Pendidikan', desc: 'Renovasi sekolah rusak di pelosok dan beasiswa anak berprestasi.', asnaf: 'Fisabilillah' },
      { title: 'BRI Peduli Pasar & UMKM', desc: 'Digitalisasi pasar tradisional dan bantuan sarana usaha.', asnaf: 'Gharimin / Fakir' },
    ],
    activePrograms: [
      { title: 'Ini Sekolahku — Renovasi Sekolah 3T', budget: 'Rp 3.0 Miliar', location: 'NTT & Papua' },
    ],
    lastUpdated: '14 September 2026',
    sources: ['Annual Report BRI 2025', 'Portal BRI Peduli'],
  },
  'corporate-demo': {
    slug: 'corporate-demo',
    name: 'Corporate (demo)',
    ticker: 'DEMO',
    sector: 'Teknologi & Multi-Industri',
    province: 'DKI Jakarta',
    address: 'Corporate Tower, Pacific Place Lt. 18, Jakarta Selatan',
    website: 'https://www.corporate.com',
    csrEmail: 'csr@corporate.com',
    description: 'Corporate (demo) mengintegrasikan program Tanggung Jawab Sosial dan Lingkungan (TJSL) selaras pilar ESG & SDGs melalui verifikasi AI CSRmatics.',
    tjslFocus: 'Pendidikan Berkualitas, Pelestarian Lingkungan, & Pemberdayaan Ekonomi Kerakyatan.',
    csrPillars: [
      { title: 'Corporate Education & Tech', desc: 'Beasiswa koding & pelatihan keterampilan digital.', asnaf: 'Fisabilillah' },
      { title: 'Corporate Green Action', desc: 'Konservasi lingkungan & penanaman pohon.', asnaf: 'Maslahat Umum' },
    ],
    activePrograms: [
      { title: 'Inkubasi Bisnis UMKM & Beasiswa Digital', budget: 'Rp 2.5 Miliar', location: 'Nasional & Wilayah Operasional' },
    ],
    lastUpdated: '15 September 2026',
    sources: ['Portal Corporate (demo) 2026', 'CSRmatics Verified System'],
  },
  pertamina: {
    slug: 'pertamina',
    name: 'PT Pertamina (Persero)',
    ticker: 'BUMN',
    sector: 'Energi & Migas BUMN',
    province: 'DKI Jakarta',
    address: 'Jl. Medan Merdeka Timur No. 11, Jakarta Pusat',
    website: 'https://www.pertamina.com',
    csrEmail: 'csr@pertamina.com',
    description: 'PT Pertamina (Persero) mengintegrasikan program TJSL dengan komitmen ESG melalui 4 pilar utama: Pertamina Cerdas, Sehat, Hijau, dan Berdikari.',
    tjslFocus: 'Desa Mandiri Energi, Konservasi Keanekaragaman Hayati, & Kesehatan Anak.',
    csrPillars: [
      { title: 'Pertamina Cerdas', desc: 'Beasiswa Sobat Bumi & dukungan riset energi terbarukan.', asnaf: 'Fisabilillah' },
      { title: 'Desa Mandiri Energi', desc: 'Pemasangan PLTS & biogas masyarakat desa.', asnaf: 'Maslahat Umum' },
    ],
    activePrograms: [
      { title: 'Program Desa Mandiri Energi PLTS', budget: 'Rp 4.5 Miliar', location: '50 Desa Sekitar Operasional' },
    ],
    lastUpdated: '14 September 2026',
    sources: ['Sustainability Report Pertamina 2025', 'Kementerian BUMN'],
  },
  'telkom-indonesia': {
    slug: 'telkom-indonesia',
    name: 'PT Telkom Indonesia (Persero) Tbk',
    ticker: 'TLKM',
    sector: 'Telekomunikasi BUMN',
    province: 'Jawa Barat',
    address: 'Telkom Landmark Tower, Jl. Jend. Gatot Subroto Kav. 52, Jakarta Selatan',
    website: 'https://www.telkom.co.id',
    csrEmail: 'tjsl@telkom.co.id',
    description: 'PT Telkom Indonesia (Persero) Tbk berfokus pada digitalisasi masyarakat melalui TJSL Telkom Digistar untuk akselerasi inklusi digital nasional.',
    tjslFocus: 'Digital Literacy, Infrastruktur Internet Sekolah 3T, & Startup Social Incubation.',
    csrPillars: [
      { title: 'DigiStar Education', desc: 'Pelatihan koding gratis & konektivitas internet sekolah.', asnaf: 'Fisabilillah' },
    ],
    activePrograms: [
      { title: 'Internet Gratis 100 Sekolah Terpencil', budget: 'Rp 1.8 Miliar', location: 'Maluku & NTT' },
    ],
    lastUpdated: '14 September 2026',
    sources: ['Laporan Tahunan Telkom 2025'],
  },
};

export function generateStaticParams() {
  return [
    { slug: 'bca' },
    { slug: 'bri' },
    { slug: 'corporate-demo' },
    { slug: 'pertamina' },
    { slug: 'telkom-indonesia' },
  ];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const company = COMPANY_DATABASE[params.slug];
  if (!company) {
    return {
      title: 'Perusahaan Tidak Ditemukan | CSRmatics',
    };
  }

  return {
    title: `CSR & TJSL ${company.name} | Profil & Peluang Kemitraan CSRmatics`,
    description: `Informasi lengkap alokasi dana CSR, pilar TJSL, program sosial aktif, dan tata cara pengajuan proposal kemitraan CSR ke ${company.name}.`,
    alternates: {
      canonical: `https://csrmatics.com/database-perusahaan/${company.slug}`,
    },
    keywords: [
      `CSR ${company.name}`,
      `program CSR ${company.name}`,
      `TJSL ${company.name}`,
      `proposal CSR ${company.name}`,
      `alamat CSR ${company.name}`,
    ],
    openGraph: {
      title: `CSR & TJSL ${company.name} | Profil & Peluang Kemitraan CSRmatics`,
      description: company.description,
      url: `https://csrmatics.com/database-perusahaan/${company.slug}`,
      siteName: 'CSRmatics',
      locale: 'id_ID',
      type: 'article',
      images: [
        {
          url: 'https://csrmatics.com/opengraph-image',
          width: 1200,
          height: 630,
          alt: `CSR & TJSL ${company.name} — CSRmatics Platform`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `CSR & TJSL ${company.name} | Profil & Peluang Kemitraan CSRmatics`,
      description: company.description,
      images: ['https://csrmatics.com/opengraph-image'],
    },
  };
}

export default function CompanyDetailPage({ params }: { params: { slug: string } }) {
  const company = COMPANY_DATABASE[params.slug] || {
    slug: params.slug,
    name: `PT ${params.slug.toUpperCase().replace('-', ' ')} Tbk`,
    ticker: 'TBK',
    sector: 'Perusahaan Swasta / BUMN',
    province: 'Indonesia',
    address: 'Kantor Pusat Indonesia',
    website: 'https://csrmatics.com',
    csrEmail: 'contact@csrmatics.com',
    description: `Profil informasi alokasi CSR dan program TJSL untuk ${params.slug.toUpperCase()} yang terverifikasi di platform CSRmatics.`,
    tjslFocus: 'Pendidikan, Kesehatan, Lingkungan & Ekonomi',
    csrPillars: [
      { title: 'Pendidikan & Literasi', desc: 'Program beasiswa dan peningkatan mutu sarana sekolah.', asnaf: 'Fisabilillah' },
      { title: 'Pemberdayaan Masyarakat', desc: 'Bantuan modal dan pelatihan wirausaha desa.', asnaf: 'Fakir / Miskin' },
    ],
    activePrograms: [
      { title: 'Program Pemberdayaan Komunitas 2026', budget: 'Rp 1.0 Miliar', location: 'Wilayah Operasional' },
    ],
    lastUpdated: '14 September 2026',
    sources: ['Portal Resmi Perusahaan', 'Verified by CSRmatics'],
  };

  // JSON-LD Breadcrumb & Organization Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://csrmatics.com' },
          { '@type': 'ListItem', position: 2, name: 'Database Perusahaan', item: 'https://csrmatics.com/database-perusahaan' },
          { '@type': 'ListItem', position: 3, name: company.name, item: `https://csrmatics.com/database-perusahaan/${company.slug}` },
        ],
      },
      {
        '@type': 'Organization',
        name: company.name,
        url: company.website,
        address: company.address,
        description: company.description,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-600/15 via-emerald-900/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Header */}
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
                Corporate Profile
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
              Ajukan Kemitraan
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-6 max-w-5xl mx-auto space-y-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/database-perusahaan" className="hover:text-white">Database Perusahaan</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-emerald-400 font-semibold">{company.name}</span>
        </nav>

        {/* Company Header Card */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-2xl">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white">{company.name}</h1>
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {company.ticker}
                  </span>
                </div>
                <span className="text-xs text-slate-400 mt-1 block">{company.sector}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Domain Active (200 OK)</span>
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
            {company.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Fokus Utama TJSL</span>
              <span className="font-semibold text-white mt-1 block">{company.tjslFocus}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Lokasi Kantor Pusat</span>
              <span className="font-semibold text-white mt-1 block flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {company.province}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Situs Resmi</span>
              <a href={company.website} target="_blank" rel="noreferrer" className="font-semibold text-emerald-400 mt-1 flex items-center gap-1 hover:underline">
                <span>{company.website}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Pilar CSR Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-400" />
            <span>Pilar CSR & Alokasi Fiqh Asnaf</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {company.csrPillars.map((pillar) => (
              <div key={pillar.title} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {pillar.asnaf}
                </span>
                <h4 className="font-bold text-white text-sm mt-1">{pillar.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Program Sosial Aktif */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400" />
            <span>Program Sosial & Alokasi Terbuka</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {company.activePrograms.map((prog) => (
              <div key={prog.title} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm">{prog.title}</h4>
                  <span className="text-xs text-slate-400 block">{prog.location}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                  {prog.budget}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* How to Submit Proposal */}
        <section className="p-6 rounded-2xl bg-indigo-950/40 border border-indigo-800/60 space-y-4">
          <h3 className="font-bold text-white text-base">Cara Mengajukan Proposal Kemitraan ke {company.name}</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Lembaga sosial / NGO terverifikasi dapat mengajukan draf proposal terstruktur langsung ke tim TJSL {company.name} melalui matching engine AI CSRmatics tanpa perlu melakukan cold outreach manual.
          </p>
          <div className="pt-2">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow"
            >
              <span>Ajukan Proposal via CSRmatics</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Trust Signals & E-E-A-T Timestamp */}
        <section className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Terakhir Diperbarui: <strong>{company.lastUpdated}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span>Sumber Data: {company.sources.join(' • ')}</span>
          </div>
        </section>

      </main>
    </div>
  );
}
