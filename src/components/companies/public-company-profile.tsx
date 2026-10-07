import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Building2, Sparkles, Globe, ArrowRight, ChevronRight, Info } from 'lucide-react';
import { lookupCompanyProfile } from '@/lib/company-profiles';

// Shared by /perusahaan/[slug] and /database-perusahaan/[slug]. An unknown slug is a 404; an API that cannot
// be reached is said so, it is not a missing company.
export default async function PublicCompanyProfile({ slug }: { slug: string }) {
  const lookup = await lookupCompanyProfile(slug);
  if (lookup.status === 'not_found') notFound();
  if (lookup.status === 'unavailable') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-xl font-bold text-white">Profil tidak dapat dimuat saat ini</h1>
          <p className="text-sm text-slate-400">Data perusahaan sedang tidak dapat diambil. Silakan coba lagi beberapa saat lagi.</p>
          <Link href="/database-perusahaan" className="inline-block text-emerald-400 font-semibold hover:underline">
            Kembali ke direktori
          </Link>
        </div>
      </div>
    );
  }
  const { company } = lookup;

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
      { '@type': 'Organization', name: company.name, ...(company.website ? { url: company.website } : {}) },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-emerald-200" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">CSRmatics</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white border border-slate-800">
              Masuk
            </Link>
            <Link href="/pricing" className="px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg">
              Ajukan Kemitraan
            </Link>
          </div>
        </div>
      </header>

      <main className="py-12 px-6 max-w-5xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/database-perusahaan" className="hover:text-white">Database Perusahaan</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-emerald-400 font-semibold">{company.name}</span>
        </nav>

        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-white">{company.name}</h1>
                {company.ticker && (
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {company.ticker}
                  </span>
                )}
              </div>
              {company.sector && <span className="text-xs text-slate-400 mt-1 block">{company.sector}</span>}
            </div>
          </div>

          {(company.headquarters || company.website) && (
            <div className="pt-4 border-t border-slate-800 text-sm grid sm:grid-cols-2 gap-4">
              {company.headquarters && (
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Kantor pusat</span>
                  <div className="font-semibold text-slate-200 mt-1">{company.headquarters}</div>
                </div>
              )}
              {company.website && (
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Situs resmi</span>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-400 mt-1 flex items-center gap-1.5 hover:underline break-all"
                  >
                    <Globe className="w-4 h-4 shrink-0" />
                    <span>{company.website}</span>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3 text-sm text-slate-300">
          <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
          <p>
            Halaman ini hanya memuat identitas dasar. Profil CSR perusahaan (program, anggaran, kontak) tidak
            ditampilkan sampai datanya diverifikasi. Sinyal CSR terbaru yang bersumber dapat dilihat setelah masuk
            ke platform.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow"
          >
            <span>Ajukan Kemitraan via CSRmatics</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
