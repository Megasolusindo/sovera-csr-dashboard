import React from 'react';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { PublicNavbar } from '@/components/shared/public-navbar';
import {
  PublicNgoDirectory,
  type DirectoryOrganization,
} from '@/components/ngo/public-ngo-directory';
import { Heart, Sparkles } from 'lucide-react';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Database Lembaga NGO, Yayasan & LAZ Indonesia | CSRmatics',
  description:
    'Direktori publik lembaga non-pemerintah (NGO), yayasan sosial, dan Lembaga Amil Zakat (LAZ) terverifikasi di Indonesia. Jelajahi program sosial siap didanai, pilar fokus, dan wilayah jangkauan.',
  alternates: {
    canonical: 'https://csrmatics.com/database-lembaga',
  },
  keywords: [
    'Database NGO Indonesia',
    'Direktori Yayasan Sosial',
    'Daftar LAZ Indonesia',
    'Mitra CSR Yayasan',
    'Lembaga Filantropi',
    'Penyalur Dana CSR',
    'Program Sosial NGO',
    'Lembaga Terverifikasi CSR',
  ],
  openGraph: {
    title: 'Database Lembaga NGO, Yayasan & LAZ Indonesia | CSRmatics',
    description:
      'Direktori publik ratusan profil lembaga sosial, yayasan filantropi, dan LAZ terverifikasi yang siap bermitra dan menyalurkan alokasi dana CSR korporasi secara akuntabel.',
    url: 'https://csrmatics.com/database-lembaga',
    siteName: 'CSRmatics',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://csrmatics.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'CSRmatics — Database Lembaga NGO, Yayasan & LAZ Indonesia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Database Lembaga NGO, Yayasan & LAZ Indonesia | CSRmatics',
    description:
      'Direktori publik ratusan profil lembaga sosial, yayasan filantropi, dan LAZ terverifikasi yang siap bermitra dan menyalurkan alokasi dana CSR korporasi secara akuntabel.',
    images: ['https://csrmatics.com/opengraph-image'],
  },
};

// Server-side base URL for SSR fetches.
const API_BASE_URL =
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'http://localhost:4000/api/v1';

async function getOrganizations(): Promise<{
  organizations: DirectoryOrganization[];
  total: number;
  failed: boolean;
}> {
  try {
    let res = await fetch(`${API_BASE_URL}/organizations?limit=60&offset=0`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      res = await fetch(`${API_BASE_URL}/public/organizations?limit=60&offset=0`, {
        next: { revalidate: 3600 },
      });
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const rows: any[] = Array.isArray(json.data) ? json.data : [];
    const total: number = json?.pagination?.total ?? rows.length;

    const organizations: DirectoryOrganization[] = rows.map((r) => ({
      id: String(r.id),
      name: r.name || '—',
      slug: r.slug || String(r.id),
      logoUrl: r.logo_url || '',
      orgType: r.org_type || r.type || 'ORGANIZATION',
      isVerified: Boolean(r.is_verified),
      focusAreas: Array.isArray(r.focus_areas) ? r.focus_areas : [],
      targetRegions: Array.isArray(r.target_regions) ? r.target_regions : [],
      totalProgramsCount: Number(r.total_programs_count) || 0,
      activeProgramsCount: Number(r.active_programs_count) || 0,
      matchReasons: Array.isArray(r.match_reasons) ? r.match_reasons : [],
    }));

    return { organizations, total, failed: false };
  } catch {
    return { organizations: [], total: 0, failed: true };
  }
}

export default async function DatabaseLembagaPage() {
  const { organizations, total, failed } = await getOrganizations();
  const cookieStore = cookies();
  const viewAs = cookieStore.get('viewAs')?.value as 'csr' | 'ngo' | undefined;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-600/15 via-teal-900/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-96 right-10 w-[450px] h-[450px] bg-teal-600/10 blur-3xl pointer-events-none -z-10" />

      {/* Navigation Header */}
      <PublicNavbar initialViewAs={viewAs} />

      {/* Main Content */}
      <main className="py-16 px-6 max-w-7xl mx-auto space-y-12">
        {/* Title & SEO Description */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-semibold backdrop-blur-md">
            <Heart className="w-3.5 h-3.5" />
            <span>
              {failed
                ? 'Direktori Lembaga NGO & Yayasan'
                : `Direktori ${total.toLocaleString('id-ID')} Lembaga NGO & Yayasan`}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Database Lembaga NGO & Yayasan Indonesia
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Temukan lembaga non-pemerintah (NGO), yayasan sosial, dan Lembaga Amil Zakat (LAZ) terverifikasi yang siap bermitra dan merealisasikan program CSR korporasi secara transparan dan akuntabel.
          </p>
        </div>

        {/* Interactive Directory Section (Search, Filters, Grid, Detail Modal) */}
        <PublicNgoDirectory
          initialOrganizations={organizations}
          total={total}
          failed={failed}
        />
      </main>
    </div>
  );
}
