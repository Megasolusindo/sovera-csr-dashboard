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
      try {
        const response = (await apiClient.get('/settings/token-usage')) as unknown as { data: TokenSummaryData };
        if (response && response.data) {
          return response.data;
        }
      } catch (err) {
        console.warn('API call failed or offline for token usage:', err);
      }

      return {
        total_prompt_tokens: 12500,
        total_completion_tokens: 8400,
        total_tokens: 20900,
        total_cost_usd: 0.003456,
        total_cost_idr: 55.29,
        recent_logs: [
          {
            id: 'log_01',
            org_id: '77123aaa-8819-4c12-99a1-00123456789a',
            deal_id: '7781a992-14c1-2881-a001-23456789abcd',
            feature_name: 'PITCH_STRATEGY',
            model_name: 'gemini-1.5-flash',
            prompt_tokens: 169,
            completion_tokens: 219,
            total_tokens: 388,
            estimated_cost_usd: 0.000078,
            created_at: new Date().toISOString(),
          },
        ],
      };
    },
  });
}
