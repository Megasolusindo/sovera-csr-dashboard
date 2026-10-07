import type { Metadata } from 'next';

// A public company profile shows what the platform holds for the company, read from the public API. The
// two profile routes used to be five hand-written entries (addresses, CSR e-mails, program budgets, "last
// updated" dates and source lists that nothing in this repository backs up) plus an invented company for
// any other address; the directory list links every company it shows to this page, so it has to work for
// all of them, and for nothing else.
const API_BASE_URL =
  process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1';

export interface PublicCompanyProfile {
  slug: string;
  name: string;
  legalName?: string;
  ticker?: string;
  sector?: string;
  headquarters?: string;
  website?: string;
}

export type ProfileLookup =
  | { status: 'found'; company: PublicCompanyProfile }
  | { status: 'not_found' }
  | { status: 'unavailable' };

function asText(v: unknown): string | undefined {
  return typeof v === 'string' && v.trim() !== '' ? v.trim() : undefined;
}

// Only an http(s) address is shown as a link.
function asWebsite(v: unknown): string | undefined {
  const url = asText(v);
  return url && /^https?:\/\//i.test(url) ? url : undefined;
}

export async function lookupCompanyProfile(slug: string): Promise<ProfileLookup> {
  try {
    const res = await fetch(`${API_BASE_URL}/companies?limit=10&offset=0&search=${encodeURIComponent(slug)}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return { status: 'unavailable' };
    const json = await res.json();
    const rows: any[] = Array.isArray(json?.data) ? json.data : [];
    // The search is a substring match; the profile is the company whose slug (or id) is exactly this.
    const row = rows.find((r) => r?.slug === slug || r?.id === slug);
    if (!row) return { status: 'not_found' };
    return {
      status: 'found',
      company: {
        slug: row.slug || row.id,
        name: asText(row.name) || asText(row.legal_name) || slug,
        legalName: asText(row.legal_name),
        ticker: asText(row.ticker),
        sector: asText(row.industry_sector),
        headquarters: asText(row.headquarters),
        website: asWebsite(row.website),
      },
    };
  } catch {
    return { status: 'unavailable' };
  }
}

// The slugs of the companies the sitemap lists: the ones the public directory shows (first page of the list).
// An unreachable API gives an empty list, never a fixed one.
export async function listCompanySlugs(limit = 60): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/companies?limit=${limit}&offset=0`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    const rows: any[] = Array.isArray(json?.data) ? json.data : [];
    return rows.map((r) => r?.slug || r?.id).filter((v): v is string => typeof v === 'string' && v !== '');
  } catch {
    return [];
  }
}

// Both public routes show the same page, so the canonical address is the same: only one is indexed.
export async function profileMetadata(slug: string): Promise<Metadata> {
  const lookup = await lookupCompanyProfile(slug);
  if (lookup.status !== 'found') return { title: 'Profil Perusahaan | CSRmatics', robots: { index: false } };
  const { company } = lookup;
  const title = `${company.name} | Profil Perusahaan CSRmatics`;
  const description = `Profil ${company.name} di direktori CSRmatics: identitas perusahaan dan jalur pengajuan kemitraan CSR.`;
  return {
    title,
    description,
    alternates: { canonical: `https://csrmatics.com/database-perusahaan/${company.slug}` },
    openGraph: {
      title,
      description,
      url: `https://csrmatics.com/database-perusahaan/${company.slug}`,
      siteName: 'CSRmatics',
      locale: 'id_ID',
      type: 'article',
    },
  };
}
