import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Calendar,
  FileText,
  CheckCircle2,
  Building2,
  Award,
} from 'lucide-react';

interface ArticleData {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  lastUpdated: string;
  summary: string;
  contentSections: { heading: string; body: string }[];
  keyTakeaways: string[];
}

const REGULASI_DATABASE: Record<string, ArticleData> = {
  'permen-bumn-tjsl': {
    slug: 'permen-bumn-tjsl',
    title: 'Panduan Kepatuhan Regulasi TJSL BUMN (Permen BUMN)',
    subtitle: 'Standar Tata Kelola & Penyaluran Tanggung Jawab Sosial dan Lingkungan Perusahaan BUMN Indonesia',
    category: 'Regulasi BUMN',
    readTime: '6 Menit Baca',
    lastUpdated: '15 September 2026',
    summary: 'Penjelasan lengkap mengenai aturan terbaru Kementerian BUMN terkait prioritas penyaluran dana TJSL, indikator dampak sosial, serta akuntabilitas pelaporan audit.',
    contentSections: [
      {
        heading: '1. Prioritas Utama Penyaluran TJSL BUMN',
        body: 'Sesuai arahan Kementerian BUMN, program Tanggung Jawab Sosial dan Lingkungan (TJSL) wajib difokuskan pada tiga pilar utama: Pendidikan Berkualitas (SDG 4), Pelestarian Lingkungan Hidup (SDG 13), dan Pemberdayaan UMKM / Ekonomi Kerakyatan (SDG 8).',
      },
      {
        heading: '2. Prinsip Akuntabilitas & Audit Keuangan',
        body: 'Setiap penyaluran dana TJSL oleh BUMN harus memenuhi standar akuntabilitas publik, didukung dengan Rencana Kerja dan Anggaran (RKA) yang jelas, verifikasi keabsahan lembaga penerima manfaat (NGO/Yayasan), serta bukti serah terima yang auditabel.',
      },
      {
        heading: '3. Integrasi Teknologi & Platform Intelligence',
        body: 'Untuk memastikan penyaluran dana tepat sasaran dan menghindari duplikasi program, penggunaan platform digital seperti CSRmatics memfasilitasi verifikasi legalitas NGO dan pelaporan dampak real-time.',
      },
    ],
    keyTakeaways: [
      'Wajib selaras 3 pilar: Pendidikan, Lingkungan, & UMKM',
      'Membutuhkan verifikasi legalitas mitra penerima hibah',
      'Pelaporan wajib berbasis dampak terukur (Social Return on Investment)',
    ],
  },
  'esg-pojk-51': {
    slug: 'esg-pojk-51',
    title: 'Standar Pelaporan Keberlanjutan ESG & POJK 51 untuk Emiten Tbk',
    subtitle: 'Pedoman Penyusunan Sustainability Report Berdasarkan Regulasi Otoritas Jasa Keuangan',
    category: 'Regulasi ESG',
    readTime: '8 Menit Baca',
    lastUpdated: '15 September 2026',
    summary: 'Panduan praktis bagi tim Corporate Secretary dan TJSL perusahaan publik (Tbk) dalam menyelaraskan dana CSR dengan matriks pelaporan POJK 51/POJK.03/2017.',
    contentSections: [
      {
        heading: '1. Pengungkapan Matriks ESG dalam Laporan Keberlanjutan',
        body: 'POJK 51 mewajibkan Lembaga Jasa Keuangan (LJK), emiten, dan perusahaan publik untuk menyampaikan Laporan Keberlanjutan tahunan yang mencakup aspek Environmental (Lingkungan), Social (Sosial), dan Governance (Tata Kelola).',
      },
      {
        heading: '2. Mengaitkan Alokasi CSR dengan Matriks Lingkungan & Sosial',
        body: 'Dana CSR yang disalurkan ke proyek penanaman mangrove, pengurangan emisi karbon, atau pengentasan kemiskinan desa dapat diklaim sebagai pemenuhan kinerja sosial dan lingkungan dalam Laporan Keberlanjutan.',
      },
    ],
    keyTakeaways: [
      'Kewajiban pengungkapan Laporan Keberlanjutan tahunan OJK',
      'Integrasi program CSR ke dalam matriks penilaian ESG global',
      'Pengukuran rasio pengurangan emisi & manfaat komunitas',
    ],
  },
  'fiqh-asnaf-csr': {
    slug: 'fiqh-asnaf-csr',
    title: 'Panduan Kepatuhan Syariah Zakat, Wakaf & CSR Perusahaan',
    subtitle: 'Prinsip Fiqh Asnaf dalam Penyaluran Filantropi Korporasi & Lembaga Amil Zakat (LAZ)',
    category: 'Syariah & Fiqh',
    readTime: '5 Menit Baca',
    lastUpdated: '15 September 2026',
    summary: 'Kajian praktis tata cara alokasi CSR korporasi agar memenuhi kriteria 8 Asnaf zakat dan prinsip produktivitas wakaf sesuai rekomendasi Dewan Syariah Nasional.',
    contentSections: [
      {
        heading: '1. Klasifikasi 8 Asnaf dalam Program CSR Korporasi',
        body: 'Penyaluran CSR yang bersumber dari Zakat Perusahaan wajib disalurkan kepada 8 golongan Asnaf yang berhak (Fakir, Miskin, Amil, Muallaf, Riqab, Gharimin, Fisabilillah, Ibnu Sabil).',
      },
      {
        heading: '2. Wakaf Produktif untuk Pemberdayaan Berkelanjutan',
        body: 'Alokasi CSR berbentuk wakaf produktif (seperti fasilitas medis desa atau alat pertanian) dapat menjamin manfaat sosial jangka panjang sekaligus menjaga ketaatan Syariah.',
      },
    ],
    keyTakeaways: [
      'Penyaluran zakat perusahaan wajib sesuai 8 Asnaf',
      'Skema wakaf produktif menjamin dampak sosial berkelanjutan',
      'Verifikasi akreditasi LAZ penerima dana hibah syariah',
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(REGULASI_DATABASE).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = REGULASI_DATABASE[params.slug];
  if (!article) {
    return { title: 'Panduan Tidak Ditemukan | CSRmatics' };
  }

  return {
    title: `${article.title} | Knowledge Base CSRmatics`,
    description: article.summary,
    keywords: [
      article.category,
      'Regulasi CSR',
      'TJSL BUMN',
      'POJK 51 ESG',
      'Fiqh Asnaf Zakat',
      'Laporan Keberlanjutan',
    ],
    alternates: {
      canonical: `https://csrmatics.com/regulasi/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      url: `https://csrmatics.com/regulasi/${article.slug}`,
      siteName: 'CSRmatics',
      locale: 'id_ID',
      type: 'article',
      images: [
        {
          url: 'https://csrmatics.com/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${article.title} — Knowledge Base CSRmatics`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.summary,
      images: ['https://csrmatics.com/opengraph-image'],
    },
  };
}

export default function KnowledgeBaseArticlePage({ params }: { params: { slug: string } }) {
  const article = REGULASI_DATABASE[params.slug] || {
    slug: params.slug,
    title: params.slug.replace(/-/g, ' ').toUpperCase(),
    subtitle: 'Panduan Kepatuhan & Regulasi CSR Perusahaan di Indonesia',
    category: 'Regulasi CSR',
    readTime: '5 Menit Baca',
    lastUpdated: '15 September 2026',
    summary: 'Artikel panduan kepatuhan regulasi CSR, TJSL BUMN, dan ESG untuk perusahaan dan NGO di Indonesia.',
    contentSections: [
      {
        heading: 'Panduan Kepatuhan TJSL & ESG',
        body: 'Penjelasan rinci mengenai standar aturan penyaluran dana CSR korporasi di Indonesia.',
      },
    ],
    keyTakeaways: ['Kepatuhan aturan berlaku', 'Penyaluran transparan & terukur'],
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://csrmatics.com' },
          { '@type': 'ListItem', position: 2, name: 'Regulasi & Knowledge Base', item: 'https://csrmatics.com/regulasi/permen-bumn-tjsl' },
          { '@type': 'ListItem', position: 3, name: article.title, item: `https://csrmatics.com/regulasi/${article.slug}` },
        ],
      },
      {
        '@type': 'Article',
        headline: article.title,
        description: article.summary,
        author: { '@type': 'Organization', name: 'CSRmatics Team' },
        publisher: { '@type': 'Organization', name: 'CSRmatics' },
        dateModified: '2026-09-15',
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
                Knowledge Base & Regulasi
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
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg"
            >
              Coba Platform
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-6 max-w-4xl mx-auto space-y-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-300">Regulasi & Guide</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-emerald-400 font-semibold">{article.title}</span>
        </nav>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {article.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" /> {article.lastUpdated} • {article.readTime}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">{article.title}</h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">{article.subtitle}</p>
        </div>

        {/* Key Takeaways Box */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-3">
          <h3 className="font-bold text-emerald-400 text-sm flex items-center gap-2">
            <Award className="w-4 h-4" /> Poin Kunci Kepatuhan (Key Takeaways):
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {article.keyTakeaways.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Body Sections */}
        <article className="space-y-8 text-slate-300 text-sm leading-relaxed border-t border-slate-800 pt-8">
          {article.contentSections.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-xl font-bold text-white tracking-tight">{sec.heading}</h2>
              <p className="text-slate-300 text-sm leading-relaxed">{sec.body}</p>
            </div>
          ))}
        </article>

        {/* Internal Linking CTA Card */}
        <section className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 text-center">
          <h3 className="text-xl font-extrabold text-white">Kelola Kemitraan CSR Berkelanjutan dengan CSRmatics</h3>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            Gunakan platform intelijen dua arah CSRmatics untuk memverifikasi mitra NGO dan menyelaraskan penyaluran dana TJSL perusahaan Anda secara otomatis.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/untuk-korporasi"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow"
            >
              Solusi Korporasi & BUMN
            </Link>
            <Link
              href="/database-perusahaan"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow"
            >
              Cari Perusahaan Aktif CSR
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
