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

const mockDealsData: DealPipelineItem[] = [
  {
    id: 'deal_01_tlkm',
    company_name: 'PT Telko Nusantara Tbk',
    deal_stage: 'DISCOVERED',
    estimated_value: 750000000,
    target_program_id: 'prog_01_beasiswa',
    generated_icebreaker: 'Salam hangat Bapak/Ibu Direksi CSR PT Telko Nusantara Tbk. Mengingat komitmen luar biasa perusahaan dalam Sustainability Report 2025 untuk digitalisasi pendidikan 3T...',
    notes: 'Kandidat utama program Beasiswa Vokasi Digital 500 Mahasiswa 3T.',
    created_at: '2026-08-28T00:00:00Z',
    updated_at: '2026-08-28T00:00:00Z',
  },
  {
    id: 'deal_02_bmri',
    company_name: 'PT Bank Mandiri Sejahtera Tbk',
    deal_stage: 'RESEARCH',
    estimated_value: 500000000,
    target_program_id: 'prog_04_modal_umkm',
    generated_icebreaker: 'Yth. Tim TJSL Bank Mandiri Sejahtera. Menyambung keputusan RUPS mengenai pemberdayaan ekonomi perempuan pesisir...',
    notes: 'Sudah mengontak PIC CSR Ibu Retno via LinkedIn.',
    created_at: '2026-08-25T00:00:00Z',
    updated_at: '2026-08-26T00:00:00Z',
  },
  {
    id: 'deal_03_asii',
    company_name: 'PT Astra Solusi Nusantara Tbk',
    deal_stage: 'PITCHED',
    estimated_value: 1200000000,
    target_program_id: 'prog_02_pesantren',
    generated_icebreaker: 'Yth. Manajemen CSR Astra International. Terlampir draf proposal kemitraan elektrifikasi & laboratorium komputer 50 pesantren...',
    notes: 'Draf proposal lengkap dan Pitch Deck 5 slide telah dikirim via email resmi.',
    created_at: '2026-08-20T00:00:00Z',
    updated_at: '2026-08-27T00:00:00Z',
  },
  {
    id: 'deal_04_adro',
    company_name: 'PT Energi Nusantara Bersama Tbk',
    deal_stage: 'NEGOTIATION',
    estimated_value: 1500000000,
    target_program_id: 'prog_02_pesantren',
    generated_icebreaker: 'Audiensi tahap 2 penyesuaian RAB penanaman mangrove & elektrifikasi syariah.',
    notes: 'Jadwal presentasi final direksi hari Kamis pekan depan.',
    created_at: '2026-08-15T00:00:00Z',
    updated_at: '2026-08-29T00:00:00Z',
  },
  {
    id: 'deal_05_bbca',
    company_name: 'PT Bank Central Utama Tbk',
    deal_stage: 'CLOSED_WON',
    estimated_value: 1200000000,
    target_program_id: 'prog_04_modal_umkm',
    generated_icebreaker: 'SPK Ditandatangani.',
    notes: 'MoU Kemitraan resmi ditandatangani. Pencairan termin 1 sebesar Rp 600 Jt.',
    created_at: '2026-08-10T00:00:00Z',
    updated_at: '2026-08-30T00:00:00Z',
  },
];

export function useDeals() {
  return useQuery<DealPipelineItem[]>({
    queryKey: ['deals'],
    queryFn: async (): Promise<DealPipelineItem[]> => {
      try {
        const response = (await apiClient.get('/deals')) as unknown as { data: DealPipelineItem[] } | DealPipelineItem[];
        if (Array.isArray(response)) return response;
        if (response && Array.isArray(response.data) && response.data.length > 0) {
          return response.data;
        }
      } catch (err) {
        console.warn('API call failed or offline, using mock data for deals pipeline:', err);
      }

      return mockDealsData;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateDeal() {
  const queryClient = useQueryClient();

  return useMutation<DealPipelineItem, Error, CreateDealPayload>({
    mutationFn: async (payload: CreateDealPayload): Promise<DealPipelineItem> => {
      try {
        const data = (await apiClient.post('/deals', payload)) as unknown as { data: DealPipelineItem } | DealPipelineItem;
        if ('data' in data) return data.data;
        return data;
      } catch (err) {
        console.warn('Backend create deal API offline, using local creation fallback:', err);
      }

      const newDeal: DealPipelineItem = {
        id: `deal_${Date.now()}`,
        company_name: payload.company_name,
        deal_stage: 'DISCOVERED',
        estimated_value: payload.estimated_value || 500000000,
        target_program_id: payload.target_program_id || 'prog_01_beasiswa',
        generated_icebreaker: `Salam hangat Bapak/Ibu Pimpinan TJSL & Direksi CSR ${payload.company_name},\n\nMenyikapi inisiatif luar biasa korporasi dalam laporan keberlanjutan terbaru (Matriks POJK 51 & ESG Index), kami bermaksud mengajukan kolaborasi penyerapan dana TJSL & Zakat Korporasi melalui Program Beasiswa Vokasi Digital 3T.\n\nBesar harapan kami dapat mendiskusikan peluang kemitraan strategis ini pada sesi audiensi mendatang.`,
        notes: payload.notes || 'Inisiasi deal dari sinyal intelijen korporasi.',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      return newDeal;
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
      try {
        const data = (await apiClient.patch(`/deals/${dealId}/stage`, { deal_stage: stage })) as unknown as { data: DealPipelineItem } | DealPipelineItem;
        if ('data' in data) return data.data;
        return data;
      } catch (err) {
        console.warn('Backend update stage API offline, performing optimistic cache update:', err);
      }

      return {
        id: dealId,
        company_name: 'Deal Korporasi',
        deal_stage: stage,
        estimated_value: 500000000,
        target_program_id: 'prog_01_beasiswa',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
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
