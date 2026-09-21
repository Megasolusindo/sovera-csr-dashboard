import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import React from 'react';
import { getArticle, getArticleSlugs, getAllArticles } from '@/lib/mdx';
import {
  Sparkles,
  Building2,
  BookOpen,
  ArrowRight,
  Clock,
  Calendar,
  User,
  ArrowLeft,
  ChevronRight,
  Share2,
} from 'lucide-react';

// Custom MDX Component Styling for CSRmatics Dark Theme
const mdxComponents = {
  h2: (props: any) => (
    <h2
      className="mt-10 mb-4 text-2xl sm:text-3xl font-bold text-white tracking-tight border-b border-slate-800/80 pb-3"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="mt-8 mb-3 text-xl font-bold text-emerald-400 tracking-tight"
      {...props}
    />
  ),
  p: (props: any) => (
    <p className="mb-5 leading-relaxed text-slate-300 text-base sm:text-lg" {...props} />
  ),
  ul: (props: any) => (
    <ul className="mb-6 ml-6 list-disc space-y-2 text-slate-300 text-base" {...props} />
  ),
  ol: (props: any) => (
    <ol className="mb-6 ml-6 list-decimal space-y-2 text-slate-300 text-base" {...props} />
  ),
  li: (props: any) => <li className="leading-relaxed pl-1" {...props} />,
  blockquote: (props: any) => (
    <blockquote
      className="mb-6 border-l-4 border-emerald-500 bg-emerald-950/20 rounded-r-xl py-4 px-5 italic text-slate-200 border-slate-800"
      {...props}
    />
  ),
  code: (props: any) => (
    <code
      className="inline rounded bg-slate-900 px-2 py-0.5 font-mono text-sm text-emerald-300 border border-slate-800"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="mb-6 overflow-x-auto rounded-xl bg-slate-900/90 border border-slate-800 p-4 text-sm text-slate-200 font-mono"
      {...props}
    />
  ),
  table: (props: any) => (
    <div className="mb-6 overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="border-b border-slate-800 bg-slate-900/80 px-4 py-3 font-semibold text-slate-200" {...props} />
  ),
  td: (props: any) => (
    <td className="border-b border-slate-800/50 px-4 py-3 text-slate-300" {...props} />
  ),
  a: (props: any) => (
    <a
      className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/40 hover:decoration-emerald-400 transition-colors font-medium"
      {...props}
    />
  ),
  hr: (props: any) => (
    <hr className="my-8 border-slate-800/80" {...props} />
  ),
};

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {
      title: 'Artikel tidak ditemukan | CSRmatics',
    };
  }

  const articleUrl = `https://csrmatics.com/blog/${slug}`;

  return {
    title: `${article.title} | Blog CSRmatics`,
    description: article.description,
    authors: article.author ? [{ name: article.author }] : [{ name: 'Tim CSRmatics' }],
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      type: 'article',
      url: articleUrl,
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      modifiedTime: article.updated || article.date,
      authors: article.author ? [article.author] : ['Tim CSRmatics'],
      siteName: 'CSRmatics',
      locale: 'id_ID',
      ...(article.image ? { images: [{ url: article.image }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      ...(article.image ? { images: [article.image] } : {}),
    },
  };
}

function getArticleSchema(article: any, slug: string) {
  const articleUrl = `https://csrmatics.com/blog/${slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image || 'https://csrmatics.com/og-image.png',
    datePublished: article.date,
    dateModified: article.updated || article.date,
    inLanguage: 'id-ID',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    author: {
      '@type': 'Organization',
      name: article.author || 'Tim CSRmatics',
      url: 'https://csrmatics.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CSRmatics',
      url: 'https://csrmatics.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://csrmatics.com/favicon.ico',
      },
    },
  };
}

function getBreadcrumbSchema(article: any, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Beranda',
        item: 'https://csrmatics.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://csrmatics.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://csrmatics.com/blog/${slug}`,
      },
    ],
  };
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const allArticles = getAllArticles();
  const currentIndex = allArticles.findIndex((a) => a.slug === slug);
  const previousArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  const articleSchema = getArticleSchema(article, slug);
  const breadcrumbSchema = getBreadcrumbSchema(article, slug);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white relative overflow-x-hidden">
      {/* Article & Breadcrumb Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-emerald-600/15 via-emerald-900/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/60 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
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

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-emerald-400 transition-colors whitespace-nowrap">
              Beranda
            </Link>
            <Link href="/untuk-korporasi" className="hover:text-indigo-300 flex items-center gap-1.5 whitespace-nowrap">
              <span>For Corporates</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                3.000+
              </span>
            </Link>
            <Link href="/untuk-ngo" className="hover:text-emerald-400 flex items-center gap-1.5 whitespace-nowrap">
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
            </Link>
            <Link href="/pricing" className="hover:text-emerald-400 transition-colors whitespace-nowrap">
              Pricing
            </Link>
          </nav>

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
          </div>
        </div>
      </header>

      {/* 2. Article Header */}
      <header className="border-b border-slate-800/60 py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-6">
            <Link href="/" className="hover:text-slate-200 transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link href="/blog" className="hover:text-emerald-400 transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-200 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {article.title}
            </span>
          </nav>

          {/* Category Badge */}
          {article.category && (
            <div className="mb-4">
              <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {article.category}
              </span>
            </div>
          )}

          {/* Article Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          {/* Excerpt / Lead */}
          <p className="mt-4 text-slate-300 text-lg leading-relaxed font-normal">
            {article.description}
          </p>

          {/* Meta Info Bar */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-400" />
                {new Date(article.date).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              {article.author && (
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-indigo-400" />
                  {article.author}
                </span>
              )}
              {article.readTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-teal-400" />
                  {article.readTime}
                </span>
              )}
            </div>

            {/* Back to Blog */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Blog</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 3. Article Content (MDX Rendered) */}
      <main className="max-w-3xl mx-auto px-6 py-12 lg:py-16">
        <article className="prose prose-invert max-w-none">
          <MDXRemote
            source={article.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </article>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-slate-800/80 flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Tags:</span>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-slate-900 text-slate-300 px-3 py-1 rounded-full border border-slate-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Prev / Next Article Pagination */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid gap-4 sm:grid-cols-2">
          {previousArticle ? (
            <Link
              href={`/blog/${previousArticle.slug}`}
              className="group p-4 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 hover:border-emerald-500/30 transition-all flex flex-col gap-1"
            >
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform text-emerald-400" />
                Artikel Sebelumnya
              </span>
              <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                {previousArticle.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextArticle ? (
            <Link
              href={`/blog/${nextArticle.slug}`}
              className="group p-4 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 hover:border-emerald-500/30 transition-all flex flex-col gap-1 text-right sm:col-start-2"
            >
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-end gap-1">
                Artikel Selanjutnya
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-emerald-400" />
              </span>
              <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                {nextArticle.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>

      {/* 4. Bottom CTA */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900/90 to-indigo-950/60 border border-emerald-500/30 text-center relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Mulai Kemitraan CSR Berbasis AI Sekarang
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Gunakan platform CSRmatics untuk melakukan matching presisi antara alokasi CSR korporasi dan program sosial NGO terverifikasi.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/untuk-korporasi"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/25"
            >
              <span>Gabung Korporasi</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/untuk-ngo"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all"
            >
              <span>Daftarkan NGO</span>
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
