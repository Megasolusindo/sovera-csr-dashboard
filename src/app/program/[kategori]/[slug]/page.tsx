import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Heart,
  Sparkles,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Target,
  BookOpen,
  Award,
  Calendar,
  ChevronRight,
  Building2,
  CheckCircle2,
} from 'lucide-react';

interface ProgramData {
  category: string;
  categoryName: string;
  slug: string;
  title: string;
  ngoName: string;
  ngoVerified: boolean;
  budgetNeeded: string;
  beneficiaries: string;
  location: string;
  asnaf: string;
  description: string;
  rabBreakdown: { item: string; cost: string }[];
  lastUpdated: string;
}

const PROGRAM_DATABASE: Record<string, ProgramData> = {
  'beasiswa-coding-anak-desa': {
    category: 'pendidikan',
    categoryName: 'Pendidikan & Literasi',
    slug: 'beasiswa-coding-anak-desa',
    title: 'Beasiswa Coding & Digital Literacy Anak Desa',
    ngoName: 'Yayasan Aksara Nusantara',
    ngoVerified: true,
    budgetNeeded: 'Rp 350.000.000',
    beneficiaries: '200 Siswa SMKN & Pemuda Desa',
    location: 'Jawa Barat (Garut & Tasikmalaya)',
    asnaf: 'Fisabilillah / Ibnu Sabil',
    description: 'Program pelatihan pemrograman web, literasi digital, dan pembinaan siap kerja untuk anak-anak muda di daerah pelosok Jawa Barat.',
    rabBreakdown: [
      { item: 'Honor Instruktur & Pendamping Code Bootcamp (6 Bulan)', cost: 'Rp 150.000.000' },
      { item: 'Bantuan Modul & Laptop Pelatihan Sekolah Desa', cost: 'Rp 120.000.000' },
      { item: 'Sertifikasi Global & Penyaluran Kerja', cost: 'Rp 80.000.000' },
    ],
    lastUpdated: '15 September 2026',
  },
  'restorasi-mangrove-pesisir': {
    category: 'lingkungan',
    categoryName: 'Lingkungan & Aksi Iklim',
    slug: 'restorasi-mangrove-pesisir',
    title: 'Restorasi Mangrove & Pemberdayaan Nelayan Pesisir',
    ngoName: 'LAZ Hijau Indonesia',
    ngoVerified: true,
    budgetNeeded: 'Rp 600.000.000',
    beneficiaries: '50.000 Bibit Mangrove & 150 Kelompok Nelayan',
    location: 'Muara Gembong, Bekasi',
    asnaf: 'Maslahat Umum',
    description: 'Program restorasi ekosistem pesisir melalu penanaman 50.000 bibit mangrove dan pembinaan pengolahan produk turunan mangrove bagi ibu-ibu nelayan.',
    rabBreakdown: [
      { item: 'Pembelian & Penanaman 50.000 Bibit Mangrove', cost: 'Rp 350.000.000' },
      { item: 'Pelatihan Usaha Produk Mangrove Nelayan', cost: 'Rp 150.000.000' },
      { item: 'Monitoring Serapan Karbon & Perawatan 1 Tahun', cost: 'Rp 100.000.000' },
    ],
    lastUpdated: '15 September 2026',
  },
  'posyandu-pencegahan-stunting': {
    category: 'kesehatan',
    categoryName: 'Kesehatan Masyarakat',
    slug: 'posyandu-pencegahan-stunting',
    title: 'Posyandu Pintar & Pencegahan Stunting Daerah 3T',
    ngoName: 'Yayasan Sehat Peduli',
    ngoVerified: true,
    budgetNeeded: 'Rp 450.000.000',
    beneficiaries: '500 Balita & Ibu Hamil',
    location: '15 Desa di NTT & Maluku',
    asnaf: 'Fakir / Miskin',
    description: 'Program pemberian makanan tambahan (PMT) bergizi tinggi dan modernisasi peralatan posyandu digital untuk pengentasan stunting balita desa terpencil.',
    rabBreakdown: [
      { item: 'Paket Nutrisi PMT Balita & Ibu Hamil 6 Bulan', cost: 'Rp 250.000.000' },
      { item: 'Peralatan Timbang & Ukur Posyandu Digital', cost: 'Rp 120.000.000' },
      { item: 'Edukasi Gizi & Kunjungan Dokter', cost: 'Rp 80.000.000' },
    ],
    lastUpdated: '15 September 2026',
  },
  'pembinaan-usaha-mikro-wanita': {
    category: 'ekonomi-umkm',
    categoryName: 'Pemberdayaan Ekonomi UMKM',
    slug: 'pembinaan-usaha-mikro-wanita',
    title: 'Pembinaan & Pendampingan Usaha Mikro Wanita Desa',
    ngoName: 'Yayasan Pemberdayaan Mandiri',
    ngoVerified: true,
    budgetNeeded: 'Rp 500.000.000',
    beneficiaries: '100 Kelompok Usaha Mikro Ibu-Ibu',
    location: 'Jawa Tengah (Wonosobo & Magelang)',
    asnaf: 'Gharimin / Fakir',
    description: 'Bantuan modal usaha tanpa bunga, sertifikasi halal produk olahan pangan, serta kemasan modern bagi usaha mikro perempuan pedesaan.',
    rabBreakdown: [
      { item: 'Bantuan Modal Hibah Alat Usaha', cost: 'Rp 280.000.000' },
      { item: 'Pendampingan Sertifikasi Halal & BPOM', cost: 'Rp 120.000.000' },
      { item: 'Pelatihan Pemasaran Digital & Kemasan', cost: 'Rp 100.000.000' },
    ],
    lastUpdated: '15 September 2026',
  },
};

export function generateStaticParams() {
  return Object.values(PROGRAM_DATABASE).map((prog) => ({
    kategori: prog.category,
    slug: prog.slug,
  }));
}

export function generateMetadata({ params }: { params: { kategori: string; slug: string } }): Metadata {
  const prog = PROGRAM_DATABASE[params.slug];
  if (!prog) {
    return { title: 'Program Tidak Ditemukan | CSRmatics' };
  }

  const title = `Program CSR ${prog.title} | Kemitraan Pendanaan NGO`;
  const description = `Proposal program sosial ${prog.title} oleh ${prog.ngoName}. Kebutuhan anggaran ${prog.budgetNeeded} untuk ${prog.beneficiaries} di ${prog.location}.`;

  return {
    title,
    description,
    keywords: [
      `Proposal CSR ${prog.categoryName}`,
      `Program ${prog.title}`,
      `Pendanaan NGO ${prog.ngoName}`,
      `CSR ${prog.location}`,
      `Program Sosial ${prog.asnaf}`,
    ],
    alternates: {
      canonical: `https://csrmatics.com/program/${params.kategori}/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://csrmatics.com/program/${params.kategori}/${params.slug}`,
      siteName: 'CSRmatics',
      locale: 'id_ID',
      type: 'article',
      images: [
        {
          url: 'https://csrmatics.com/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${prog.title} — CSRmatics Platform`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://csrmatics.com/opengraph-image'],
    },
  };
}

export default function NgoProgramDetailPage({ params }: { params: { kategori: string; slug: string } }) {
  const prog = PROGRAM_DATABASE[params.slug] || {
    category: params.kategori,
    categoryName: params.kategori.toUpperCase(),
    slug: params.slug,
    title: params.slug.replace(/-/g, ' ').toUpperCase(),
    ngoName: 'Yayasan Mitra Terverifikasi',
    ngoVerified: true,
    budgetNeeded: 'Rp 300.000.000',
    beneficiaries: '150 Penerima Manfaat',
    location: 'Indonesia',
    asnaf: 'Fakir / Miskin',
    description: `Proposal program sosial terverifikasi di kategori ${params.kategori} yang siap didanai melalui skema kemitraan CSR korporasi.`,
    rabBreakdown: [
      { item: 'Penyaluran Program Lapangan', cost: 'Rp 200.000.000' },
      { item: 'Monitoring & Pelaporan Dampak', cost: 'Rp 100.000.000' },
    ],
    lastUpdated: '15 September 2026',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://csrmatics.com' },
          { '@type': 'ListItem', position: 2, name: 'Program', item: 'https://csrmatics.com/opportunities' },
          { '@type': 'ListItem', position: 3, name: prog.categoryName, item: `https://csrmatics.com/program/${prog.category}` },
          { '@type': 'ListItem', position: 4, name: prog.title, item: `https://csrmatics.com/program/${prog.category}/${prog.slug}` },
        ],
      },
      {
        '@type': 'Service',
        name: prog.title,
        provider: {
          '@type': 'NGO',
          name: prog.ngoName,
        },
        areaServed: prog.location,
        description: prog.description,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-600/15 via-teal-900/10 to-transparent blur-3xl pointer-events-none -z-10" />

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
                NGO Program SEO
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-emerald-400">Home</Link>
            <Link href="/untuk-korporasi" className="hover:text-emerald-400">For Corporates</Link>
            <Link href="/untuk-ngo" className="hover:text-emerald-400">For NGOs</Link>
            <Link href="/database-perusahaan" className="hover:text-emerald-400">Directory</Link>
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
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg"
            >
              Mulai Pendanaan CSR
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-6 max-w-5xl mx-auto space-y-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
          <Link href="/" className="hover:text-white">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/#opportunities" className="hover:text-white">Opportunities</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="capitalize text-slate-300">{prog.categoryName}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-emerald-400 font-semibold">{prog.title}</span>
        </nav>

        {/* Program Header Card */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 backdrop-blur-md">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {prog.categoryName}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>NGO Terverifikasi</span>
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">{prog.title}</h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Dikelola oleh <strong className="text-white">{prog.ngoName}</strong>
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
            {prog.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Kebutuhan Anggaran</span>
              <span className="font-extrabold text-emerald-400 text-base block">{prog.budgetNeeded}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Target Penerima Manfaat</span>
              <span className="font-bold text-white text-xs block">{prog.beneficiaries}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Lokasi Penyaluran</span>
              <span className="font-bold text-white text-xs block flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {prog.location}
              </span>
            </div>
          </div>
        </div>

        {/* RAB Budget Breakdown */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-400" />
            <span>Rencana Anggaran Biaya (RAB) Program</span>
          </h2>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            {prog.rabBreakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-slate-800/60 last:border-0">
                <span className="text-slate-300 font-medium">{item.item}</span>
                <span className="font-bold text-white font-mono">{item.cost}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Action Call for Corporate CSR Managers */}
        <section className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 space-y-4">
          <h3 className="font-bold text-white text-base">Salurkan Dana CSR Korporasi Anda ke Program Ini</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Tim TJSL / Korporasi dapat langsung mendanai atau mengajukan kemitraan bersama {prog.ngoName} melalui platform CSRmatics dengan audit pelaporan dampak yang transparan.
          </p>
          <div className="pt-2">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow"
            >
              <span>Mulai Kemitraan CSR untuk Program Ini</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Timestamp */}
        <section className="pt-4 border-t border-slate-800 text-xs text-slate-500 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Status Program Aktif • Terakhir Diperbarui: <strong>{prog.lastUpdated}</strong></span>
        </section>

      </main>
    </div>
  );
}
