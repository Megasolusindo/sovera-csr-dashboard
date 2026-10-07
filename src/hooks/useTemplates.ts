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

      const response = (await apiClient.get('/settings/templates')) as unknown as { data: TenantTemplateData };
      if (response && response.data) {
        return response.data;
      }
      throw new Error('Respons dari server tidak lengkap.');
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
          Authorization: token ? `Bearer ${token}` : '',
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
          Authorization: token ? `Bearer ${token}` : '',
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
