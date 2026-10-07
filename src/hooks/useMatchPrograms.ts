import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { SignalMatchResponse } from '@/types/api';

export function useMatchPrograms() {
  const queryClient = useQueryClient();

  return useMutation<SignalMatchResponse, Error, string>({
    mutationFn: async (signalId: string): Promise<SignalMatchResponse> => {
      const data = (await apiClient.get(`/signals/${signalId}/match-programs`)) as unknown as SignalMatchResponse;
      // An empty list is a real answer ("no program matches"); only a malformed one is an error.
      if (data && Array.isArray(data.top_matched_programs)) {
        return data;
      }
      throw new Error('Respons pencocokan program dari server tidak lengkap.');
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['program-matches', data.signal_id], data);
    },
  });
}
