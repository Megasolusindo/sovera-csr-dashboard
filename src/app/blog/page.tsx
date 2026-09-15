import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import {
  Sparkles,
  Building2,
  BookOpen,
  ArrowRight,
  Clock,
  Calendar,
  User,
  Tag,
  ChevronRight,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog & Panduan Kemitraan CSR | CSRmatics',
  description:
    'Panduan komprehensif, regulasi TJSL, strategi ESG, dan best practices kemitraan CSR antara korporasi BUMN/Tbk dan NGO terverifikasi di Indonesia.',
  alternates: {
    canonical: 'https://csrmatics.com/blog',
  },
  openGraph: {
    url: 'https://csrmatics.com/blog',
    title: 'Blog & Panduan Kemitraan CSR | CSRmatics',
    description:
      'Panduan komprehensif, regulasi TJSL, strategi ESG, dan best practices kemitraan CSR.',
    siteName: 'CSRmatics',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Panduan Kemitraan CSR | CSRmatics',
    description:
      'Panduan komprehensif, regulasi TJSL, strategi ESG, dan best practices kemitraan CSR.',
  },
};

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white relative overflow-x-hidden">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-600/20 via-emerald-900/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-96 left-10 w-[400px] h-[400px] bg-indigo-600/10 blur-3xl pointer-events-none -z-10" />

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

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-emerald-400 transition-colors whitespace-nowrap">
              Beranda
            </Link>
            <Link href="/pricing?persona=corporate" className="hover:text-indigo-300 flex items-center gap-1.5 whitespace-nowrap">
              <span>For Corporates</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                3.000+
              </span>
            </Link>
            <Link href="/pricing?persona=ngo" className="hover:text-emerald-400 flex items-center gap-1.5 whitespace-nowrap">
              <span>For NGOs</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                1.200+
              </span>
            </Link>
            <Link href="/database-perusahaan" className="hover:text-emerald-400 transition-colors whitespace-nowrap">
              Database Perusahaan
            </Link>
            <Link href="/blog" className="text-emerald-400 font-semibold flex items-center gap-1.5 whitespace-nowrap">
              <span>Blog</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </Link>
            <Link href="/pricing" className="hover:text-emerald-400 transition-colors whitespace-nowrap">
              Pricing
            </Link>
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
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative py-16 lg:py-24 border-b border-slate-800/60">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Pusat Edukasi & Strategi CSRmatics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Blog & Panduan Kemitraan CSR Indonesia
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Artikel wawasan mendalam seputar akuntabilitas CSR, regulasi Permen BUMN & POJK 51, serta taktik penyusunan proposal CSR yang siap disetujui korporasi.
          </p>
        </div>
      </section>

      {/* 3. Main Content: Articles Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        {articles.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800/60">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">Belum ada artikel yang dipublikasikan.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="group flex flex-col bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 hover:border-emerald-500/40 rounded-2xl p-6 transition-all duration-300 shadow-xl hover:shadow-emerald-500/5 relative overflow-hidden"
              >
                {/* Glow accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Category & Read Time */}
                <div className="flex items-center justify-between mb-4 text-xs">
                  {article.category ? (
                    <span className="px-2.5 py-1 rounded-md font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                      {article.category}
                    </span>
                  ) : (
                    <span />
                  )}
                  {article.readTime && (
                    <span className="flex items-center gap-1 text-slate-400 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {article.readTime}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug mb-3">
                  <Link href={`/blog/${article.slug}`} className="focus:outline-none">
                    {article.title}
                  </Link>
                </h2>

                {/* Description Excerpt */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                  {article.description}
                </p>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700/50"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Meta Footer */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 mt-auto">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {new Date(article.date).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    {article.author && (
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        {article.author}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group/link"
                  >
                    <span>Baca</span>
                    <ChevronRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* 4. Bottom Call To Action */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900/90 to-indigo-950/60 border border-emerald-500/30 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-3xl pointer-events-none -z-10" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Siap Mengoptimalkan Program CSR Korporasi Anda?
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Temukan korporasi atau lembaga sosial yang tepat dan ajukan proposal CSR terekomendasi AI hari ini.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/pricing?persona=corporate"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2"
            >
              <span>Join Sebagai Korporasi</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing?persona=ngo"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all flex items-center gap-2"
            >
              <span>Daftarkan Lembaga / NGO</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-base">CSRmatics</span>
            <span className="text-xs text-slate-500">
              © {new Date().getFullYear()} CSRmatics. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs font-medium">
            <Link href="/" className="hover:text-slate-200">Beranda</Link>
            <Link href="/database-perusahaan" className="hover:text-slate-200">Database Perusahaan</Link>
            <Link href="/blog" className="hover:text-slate-200">Blog & Panduan</Link>
            <Link href="/pricing" className="hover:text-slate-200">Pricing</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
