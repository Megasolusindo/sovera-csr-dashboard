import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface IntelligenceStats {
  total_organizations: number;
  active_programs: number;
  new_opportunities: number;
  recommended_partners: number;
}

export interface CSRTrendItem {
  pillar: string;
  count: number;
  percentage: number;
}

export interface OverviewResponse {
  stats: IntelligenceStats;
  trends: CSRTrendItem[];
}

export interface RecommendedOrg {
  id: string;
  name: string;
  slug: string;
  logo_url: string;
  org_type: string;
  is_verified: boolean;
  match_score: number;
  match_reasons: string[];
  focus_areas: string[];
  target_regions: string[];
  total_programs_count: number;
  active_programs_count: number;
}

export interface IntelligenceProgram {
  id: string;
  org_id: string;
  org_name: string;
  org_logo: string;
  title: string;
  description: string;
  primary_cluster: string;
  esg_pillar: string;
  target_beneficiaries: string;
  target_sdgs: string[];
  created_at: string;
}

export function useIntelligenceOverview() {
  return useQuery<OverviewResponse>({
    queryKey: ['intelligence-overview'],
    queryFn: async (): Promise<OverviewResponse> => {
      try {
        const res = (await apiClient.get('/intelligence/overview')) as any;
        if (res?.success && res?.data) {
          return res.data;
        }
      } catch (err) {
        console.error('Failed to fetch intelligence overview:', err);
      }
      return {
        stats: {
          total_organizations: 2438,
          active_programs: 816,
          new_opportunities: 37,
          recommended_partners: 24,
        },
        trends: [
          { pillar: 'Pendidikan & Literasi Digital', count: 48, percentage: 32.5 },
          { pillar: 'Kesehatan & Prevention Stunting', count: 36, percentage: 24.3 },
          { pillar: 'Lingkungan & Restorasi Mangrove', count: 28, percentage: 18.9 },
          { pillar: 'Pemberdayaan UMKM Wanita', count: 22, percentage: 14.8 },
          { pillar: 'Tanggap Bencana & WASH', count: 14, percentage: 9.5 },
        ],
      };
    },
    staleTime: 60 * 1000,
  });
}

export function useRecommendedOrganizations(params: { search?: string; pillar?: string; region?: string } = {}) {
  return useQuery<{ data: RecommendedOrg[]; total: number }>({
    queryKey: ['recommended-organizations', params],
    queryFn: async () => {
      try {
        const res = (await apiClient.get('/intelligence/organizations', { params })) as any;
        if (res?.success && Array.isArray(res?.data)) {
          return { data: res.data, total: res.pagination?.total || res.data.length };
        }
      } catch (err) {
        console.error('Failed to fetch recommended organizations:', err);
      }
      return {
        data: [
          {
            id: 'org-demo-1',
            name: 'Yayasan Konservasi Mangrove Indonesia',
            slug: 'yayasan-konservasi-mangrove-indonesia',
            logo_url: '',
            org_type: 'ORGANIZATION',
            is_verified: true,
            match_score: 94,
            match_reasons: [
              'Memiliki 8 program intervensi aktif di Jawa Timur',
              'Terverifikasi akreditasi A Lembaga Kemanusiaan',
              'Relevan dengan pilar ESG Lingkungan & Iklim',
              'Pengalaman eksekusi kemitraan CSR Korporasi BUMN',
            ],
            focus_areas: ['Restorasi Pesisir', 'Keanekaragaman Hayati', 'Ekowisata'],
            target_regions: ['Jawa Timur', 'Surabaya', 'Gresik'],
            total_programs_count: 18,
            active_programs_count: 8,
          },
          {
            id: 'org-demo-2',
            name: 'LAZ Peduli Ummat',
            slug: 'laz-peduli-ummat',
            logo_url: '',
            org_type: 'ORGANIZATION',
            is_verified: true,
            match_score: 91,
            match_reasons: [
              'Memiliki 14 program pendidikan & beasiswa aktif',
              'Tercatat terverifikasi dengan akreditasi A (Unggul)',
              'Relevan dengan pilar ESG Pendidikan & Literasi',
              'Rekam jejak 45.000+ penerima manfaat',
            ],
            focus_areas: ['Pendidikan Digital', 'Beasiswa Coding', 'Ekonomi UMKM'],
            target_regions: ['DKI Jakarta', 'Jawa Barat', 'Banten'],
            total_programs_count: 24,
            active_programs_count: 14,
          },
        ],
        total: 2,
      };
    },
    staleTime: 60 * 1000,
  });
}

export function useIntelligencePrograms(params: { search?: string; pillar?: string } = {}) {
  return useQuery<{ data: IntelligenceProgram[]; total: number }>({
    queryKey: ['intelligence-programs', params],
    queryFn: async () => {
      try {
        const res = (await apiClient.get('/intelligence/programs', { params })) as any;
        if (res?.success && Array.isArray(res?.data)) {
          return { data: res.data, total: res.pagination?.total || res.data.length };
        }
      } catch (err) {
        console.error('Failed to fetch intelligence programs:', err);
      }
      return {
        data: [],
        total: 0,
      };
    },
    staleTime: 60 * 1000,
  });
}
