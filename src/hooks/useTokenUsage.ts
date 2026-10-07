import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface AITokenLogItem {
  id: string;
  org_id: string;
  deal_id?: string;
  feature_name: string;
  model_name: string;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  estimated_cost_usd: number;
  created_at: string;
}

export interface TokenSummaryData {
  total_prompt_tokens: number;
  total_completion_tokens: number;
  total_tokens: number;
  total_cost_usd: number;
  total_cost_idr: number;
  recent_logs: AITokenLogItem[];
}

export function useTokenUsage() {
  return useQuery<TokenSummaryData>({
    queryKey: ['token-usage'],
    queryFn: async (): Promise<TokenSummaryData> => {

      const response = (await apiClient.get('/settings/token-usage')) as unknown as { data: TokenSummaryData };
      if (response && response.data) {
        return response.data;
      }
      throw new Error('Respons dari server tidak lengkap.');
    },
  });
}
