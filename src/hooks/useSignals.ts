import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { CorporateSignal } from '@/types/api';

export interface GetSignalsParams {
  limit?: number;
  offset?: number;
  min_intent?: number;
  industry?: string;
  search?: string;
}

export interface SignalsResponse {
  data: CorporateSignal[];
  pagination: { total: number; limit: number; offset: number };
}

export function useSignals(params: GetSignalsParams = {}) {
  return useQuery<SignalsResponse>({
    queryKey: ['signals', params],
    queryFn: async (): Promise<SignalsResponse> => {

      const response = (await apiClient.get('/signals', { params })) as unknown as SignalsResponse;
      if (response && Array.isArray(response.data)) {
        return response;
      }
      throw new Error('Respons dari server tidak lengkap.');
    },
    staleTime: 60 * 1000,
  });
}
