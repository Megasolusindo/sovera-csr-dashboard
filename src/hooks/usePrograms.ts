import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { InstitutionProgram } from '@/types/api';

export interface CreateProgramPayload {
  title: string;
  description: string;
  primary_cluster?: string;
  target_sdgs?: string[];
  asnaf_category?: string;
  esg_pillar: string;
  target_beneficiaries: string;
}

export function usePrograms() {
  return useQuery<InstitutionProgram[]>({
    queryKey: ['programs'],
    queryFn: async (): Promise<InstitutionProgram[]> => {

      const response = (await apiClient.get('/programs')) as unknown as { data: InstitutionProgram[] } | InstitutionProgram[];
      if (Array.isArray(response)) return response;
      // An empty list is a real answer; only a malformed response is an error.
      if (response && Array.isArray(response.data)) {
        return response.data;
      }
      throw new Error('Respons dari server tidak lengkap.');
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateProgram() {
  const queryClient = useQueryClient();

  return useMutation<InstitutionProgram, Error, CreateProgramPayload>({
    mutationFn: async (payload: CreateProgramPayload): Promise<InstitutionProgram> => {

      const data = (await apiClient.post('/programs', payload)) as unknown as { data: InstitutionProgram } | InstitutionProgram;
      if ('data' in data) return data.data;
      return data;
    },
    onSuccess: (newProg) => {
      queryClient.setQueryData<InstitutionProgram[]>(['programs'], (old) => {
        return old ? [newProg, ...old] : [newProg];
      });
    },
  });
}

export interface UpdateProgramPayload extends CreateProgramPayload {
  id: string;
}

export function useUpdateProgram() {
  const queryClient = useQueryClient();

  return useMutation<InstitutionProgram, Error, UpdateProgramPayload>({
    mutationFn: async (payload: UpdateProgramPayload): Promise<InstitutionProgram> => {
      const { id, ...dataPayload } = payload;
      const data = (await apiClient.put(`/programs/${id}`, dataPayload)) as unknown as { data: InstitutionProgram } | InstitutionProgram;
      if (data && 'data' in data && data.data) return data.data;
      if (data && 'id' in data) return data as InstitutionProgram;
      throw new Error('Respons ubah program dari server tidak lengkap.');
    },
    onSuccess: (updatedProg) => {
      queryClient.setQueryData<InstitutionProgram[]>(['programs'], (old) => {
        if (!old) return [updatedProg];
        return old.map((item) => (item.id === updatedProg.id ? { ...item, ...updatedProg } : item));
      });
    },
  });
}

export function useDeleteProgram() {
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>({
    mutationFn: async (programId: string): Promise<string> => {

      await apiClient.delete(`/programs/${programId}`);
      return programId;

    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData<InstitutionProgram[]>(['programs'], (old) => {
        if (!old) return [];
        return old.filter((item) => item.id !== deletedId);
      });
    },
  });
}

