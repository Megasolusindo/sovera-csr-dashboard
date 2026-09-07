import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface TenantTemplateData {
  id?: string;
  org_id: string;
  docx_s3_key?: string;
  pptx_s3_key?: string;
  brand_primary_color?: string;
  logo_s3_key?: string;
}

export function useTemplates() {
  return useQuery<TenantTemplateData>({
    queryKey: ['tenant-templates'],
    queryFn: async (): Promise<TenantTemplateData> => {
      try {
        const response = (await apiClient.get('/settings/templates')) as unknown as { data: TenantTemplateData };
        if (response && response.data) {
          return response.data;
        }
      } catch (err) {
        console.warn('API call failed or offline for templates:', err);
      }

      return {
        org_id: '77123aaa-8819-4c12-99a1-00123456789a',
        docx_s3_key: '',
        pptx_s3_key: '',
        brand_primary_color: '#047857',
      };
    },
  });
}

export function useUploadTemplate() {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean; s3_key: string }, Error, { file: File; type: 'pptx' | 'docx' }>({
    mutationFn: async ({ file, type }) => {
      const formData = new FormData();
      formData.append('file', file);

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1';
      const token = typeof window !== 'undefined' ? localStorage.getItem('sovera_auth_token') : null;

      const res = await fetch(`${API_BASE_URL}/settings/templates/upload?type=${type}`, {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : 'Bearer dev-token',
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Upload failed with status ${res.status}`);
      }

      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenant-templates'] });
    },
  });
}

export function useResetTemplate() {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean }, Error, 'pptx' | 'docx'>({
    mutationFn: async (type) => {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1';
      const token = typeof window !== 'undefined' ? localStorage.getItem('sovera_auth_token') : null;

      const res = await fetch(`${API_BASE_URL}/settings/templates/${type}`, {
        method: 'DELETE',
        headers: {
          Authorization: token ? `Bearer ${token}` : 'Bearer dev-token',
        },
      });

      if (!res.ok) {
        throw new Error(`Reset failed with status ${res.status}`);
      }

      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenant-templates'] });
    },
  });
}
