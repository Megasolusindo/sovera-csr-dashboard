import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface OrganizationSettings {
  tenant_id: string;
  institution_name: string;
  registration_number: string;
  office_address: string;
  contact_email: string;
  scraper_service_url: string;
  webhook_url: string;
  api_key: string;
  rls_status: 'ACTIVE' | 'INACTIVE';
  created_at: string;
}

const mockSettingsData: OrganizationSettings = {
  tenant_id: 'tenant_laz_01_peduli_ummat',
  institution_name: 'LAZ Peduli Ummat',
  registration_number: 'LAZ-NASIONAL-2024/0912',
  office_address: 'Jl. Pemuda No. 88, Menteng, Jakarta Pusat, DKI Jakarta',
  contact_email: 'fundraising.b2b@peduliummat.org',
  scraper_service_url: 'http://localhost:8080/api/v1/scrape-tasks',
  webhook_url: 'http://localhost:4000/api/v1/webhooks/crawler',
  api_key: 'sov_live_998877665544332211',
  rls_status: 'ACTIVE',
  created_at: '2026-01-01T00:00:00Z',
};

export function useSettings() {
  return useQuery<OrganizationSettings>({
    queryKey: ['settings'],
    queryFn: async (): Promise<OrganizationSettings> => {
      try {
        const response = (await apiClient.get('/settings')) as unknown as { data: OrganizationSettings } | OrganizationSettings;
        if ('data' in response && response.data) return response.data;
        if ('tenant_id' in response) return response;
      } catch (err) {
        console.warn('API call failed or offline, using mock settings:', err);
      }

      return mockSettingsData;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation<OrganizationSettings, Error, Partial<OrganizationSettings>>({
    mutationFn: async (payload: Partial<OrganizationSettings>): Promise<OrganizationSettings> => {
      try {
        const data = (await apiClient.patch('/settings', payload)) as unknown as { data: OrganizationSettings } | OrganizationSettings;
        if ('data' in data) return data.data;
        return data as OrganizationSettings;
      } catch (err) {
        console.warn('Backend update settings API offline, performing local cache update:', err);
      }

      const current = queryClient.getQueryData<OrganizationSettings>(['settings']) || mockSettingsData;
      return {
        ...current,
        ...payload,
      };
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<OrganizationSettings>(['settings'], updated);
    },
  });
}
