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
  match_score?: number; // absent: the API has no scoring model
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

      const res = (await apiClient.get('/intelligence/overview')) as any;
      if (res?.success && res?.data) {
        return res.data;
      }
      throw new Error('Respons dari server tidak lengkap.');
    },
    staleTime: 60 * 1000,
  });
}

export function useRecommendedOrganizations(params: { search?: string; pillar?: string; region?: string } = {}) {
  return useQuery<{ data: RecommendedOrg[]; total: number }>({
    queryKey: ['recommended-organizations', params],
    queryFn: async () => {

      const res = (await apiClient.get('/intelligence/organizations', { params })) as any;
      if (res?.success && Array.isArray(res?.data)) {
        return { data: res.data, total: res.pagination?.total || res.data.length };
      }
      throw new Error('Respons dari server tidak lengkap.');
    },
    staleTime: 60 * 1000,
  });
}

export function useIntelligencePrograms(params: { search?: string; pillar?: string } = {}) {
  return useQuery<{ data: IntelligenceProgram[]; total: number }>({
    queryKey: ['intelligence-programs', params],
    queryFn: async () => {

      const res = (await apiClient.get('/intelligence/programs', { params })) as any;
      if (res?.success && Array.isArray(res?.data)) {
        return { data: res.data, total: res.pagination?.total || res.data.length };
      }
      throw new Error('Respons dari server tidak lengkap.');
    },
    staleTime: 60 * 1000,
  });
}
