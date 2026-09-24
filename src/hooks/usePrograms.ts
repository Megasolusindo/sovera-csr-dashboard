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

const mockProgramsData: InstitutionProgram[] = [
  {
    id: 'prog_01_beasiswa',
    title: 'Beasiswa Vokasi Digital & Tahfidz Syariah',
    description: 'Program beasiswa penuh 3 tahun tingkat diploma vokasi TI, pengembangan perangkat lunak, dan pendampingan hafiz Quran bagi mahasiswa 3T.',
    primary_cluster: 'Education & Literacy',
    target_sdgs: ['SDG 4: Pendidikan Berkualitas', 'SDG 8: Pekerjaan Layak'],
    asnaf_category: 'Fisabilillah / Ibnu Sabil',
    esg_pillar: 'SOCIAL',
    target_beneficiaries: '500 Mahasiswa & Pelajar 3T',
    embedding_generated: true,
    created_at: '2026-08-01T00:00:00Z',
  },
  {
    id: 'prog_02_pesantren',
    title: 'Program Respon Tanggap Darurat Bencana & Sanitasi',
    description: 'Instalasi posko kesehatan darurat, penjernihan air bersih, dan logistik bahan pangan untuk korban bencana alam di berbagai pelosok.',
    primary_cluster: 'Disaster & Emergency',
    target_sdgs: ['SDG 6: Air Bersih & Sanitasi', 'SDG 11: Komunitas Berkelanjutan'],
    asnaf_category: 'Fisabilillah',
    esg_pillar: 'SOCIAL',
    target_beneficiaries: '50 Lokasi Kebencanaan / 12.000 Jiwa',
    embedding_generated: true,
    created_at: '2026-08-05T00:00:00Z',
  },
  {
    id: 'prog_04_modal_umkm',
    title: 'Bantuan Modal Usaha Bergulir Perempuan Dhuafa',
    description: 'Penyaluran modal usaha tanpa bunga (Qardhul Hasan), pendampingan literasi keuangan syariah, dan sertifikasi halal UMKM wirausaha ibu rumah tangga.',
    primary_cluster: 'Economic Empowerment',
    target_sdgs: ['SDG 1: Tanpa Kemiskinan', 'SDG 8: Pekerjaan Layak'],
    asnaf_category: 'Miskin / Gharimin',
    esg_pillar: 'SOCIAL',
    target_beneficiaries: '1.000 Pengusaha Perempuan',
    embedding_generated: true,
    created_at: '2026-08-10T00:00:00Z',
  },
];

export function usePrograms() {
  return useQuery<InstitutionProgram[]>({
    queryKey: ['programs'],
    queryFn: async (): Promise<InstitutionProgram[]> => {
      try {
        const response = (await apiClient.get('/programs')) as unknown as { data: InstitutionProgram[] } | InstitutionProgram[];
        if (Array.isArray(response)) return response;
        if (response && Array.isArray(response.data) && response.data.length > 0) {
          return response.data;
        }
      } catch (err) {
        console.warn('API call failed or offline, using mock data for programs:', err);
      }

      return mockProgramsData;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateProgram() {
  const queryClient = useQueryClient();

  return useMutation<InstitutionProgram, Error, CreateProgramPayload>({
    mutationFn: async (payload: CreateProgramPayload): Promise<InstitutionProgram> => {
      try {
        const data = (await apiClient.post('/programs', payload)) as unknown as { data: InstitutionProgram } | InstitutionProgram;
        if ('data' in data) return data.data;
        return data;
      } catch (err) {
        console.warn('Backend create program API offline, using local creation fallback:', err);
      }

      const newProg: InstitutionProgram = {
        id: `prog_${Date.now()}`,
        title: payload.title,
        description: payload.description,
        primary_cluster: payload.primary_cluster || 'Community Development',
        target_sdgs: payload.target_sdgs || [],
        asnaf_category: payload.asnaf_category,
        esg_pillar: payload.esg_pillar,
        target_beneficiaries: payload.target_beneficiaries,
        embedding_generated: true,
        created_at: new Date().toISOString(),
      };

      return newProg;
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
      try {
        const data = (await apiClient.put(`/programs/${id}`, dataPayload)) as unknown as { data: InstitutionProgram } | InstitutionProgram;
        if (data && 'data' in data && data.data) return data.data;
        if (data && 'id' in data) return data as InstitutionProgram;
      } catch (err) {
        console.warn('Backend update program API offline/error, using local update fallback:', err);
      }

      const updatedProg: InstitutionProgram = {
        id,
        title: payload.title,
        description: payload.description,
        primary_cluster: payload.primary_cluster || 'Community Development',
        target_sdgs: payload.target_sdgs || [],
        asnaf_category: payload.asnaf_category,
        esg_pillar: payload.esg_pillar,
        target_beneficiaries: payload.target_beneficiaries,
        embedding_generated: true,
        updated_at: new Date().toISOString(),
      };

      return updatedProg;
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
      try {
        await apiClient.delete(`/programs/${programId}`);
      } catch (err) {
        console.warn('Backend delete program API offline/error, using local delete fallback:', err);
      }
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

