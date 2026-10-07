import type { Metadata } from 'next';
import PublicCompanyProfile from '@/components/companies/public-company-profile';
import { profileMetadata } from '@/lib/company-profiles';

// The profile is shared with the other public route and read from the API; see src/lib/company-profiles.ts.
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return profileMetadata(params.slug);
}

export default function CompanyProfilePage({ params }: { params: { slug: string } }) {
  return <PublicCompanyProfile slug={params.slug} />;
}
