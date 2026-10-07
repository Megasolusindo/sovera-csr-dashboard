import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { DealPipelineItem, DealStage } from '@/types/api';

export interface CreateDealPayload {
  company_name: string;
  target_program_id?: string;
  estimated_value?: number;
  notes?: string;
  signal_id?: string;
}

export function useDeals() {
  return useQuery<DealPipelineItem[]>({
    queryKey: ['deals'],
    queryFn: async (): Promise<DealPipelineItem[]> => {

      const response = (await apiClient.get('/deals')) as unknown as { data: DealPipelineItem[] } | DealPipelineItem[];
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

export function useCreateDeal() {
  const queryClient = useQueryClient();

  return useMutation<DealPipelineItem, Error, CreateDealPayload>({
    mutationFn: async (payload: CreateDealPayload): Promise<DealPipelineItem> => {

      const data = (await apiClient.post('/deals', payload)) as unknown as { data: DealPipelineItem } | DealPipelineItem;
      if ('data' in data) return data.data;
      return data;
    },
    onSuccess: (newDeal) => {
      queryClient.setQueryData<DealPipelineItem[]>(['deals'], (old) => {
        return old ? [newDeal, ...old] : [newDeal];
      });
    },
  });
}

export function useUpdateDealStage() {
  const queryClient = useQueryClient();

  return useMutation<DealPipelineItem, Error, { dealId: string; stage: DealStage }, { previousDeals?: DealPipelineItem[] }>({
    mutationFn: async ({ dealId, stage }): Promise<DealPipelineItem> => {

      const data = (await apiClient.patch(`/deals/${dealId}/stage`, { deal_stage: stage })) as unknown as { data: DealPipelineItem } | DealPipelineItem;
      if ('data' in data) return data.data;
      return data;
    },
    // Optimistic UI Update: Langsung ubah state lokal sebelum server merespons
    onMutate: async ({ dealId, stage }) => {
      await queryClient.cancelQueries({ queryKey: ['deals'] });
      const previousDeals = queryClient.getQueryData<DealPipelineItem[]>(['deals']);

      queryClient.setQueryData<DealPipelineItem[]>(['deals'], (old) =>
        old ? old.map((d) => (d.id === dealId ? { ...d, deal_stage: stage, updated_at: new Date().toISOString() } : d)) : []
      );

      return { previousDeals };
    },
    onError: (err, variables, context) => {
      // Rollback jika request gagal
      if (context?.previousDeals) {
        queryClient.setQueryData(['deals'], context.previousDeals);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
    },
  });
}
