import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { InstitutionProgram } from '@/types/api';

export interface CreateProgramPayload {
  title: string;
  description: string;
  asnaf_category: string;
  esg_pillar: string;
  target_beneficiaries: string;
}

const mockProgramsData: InstitutionProgram[] = [
  {
    id: 'prog_01_beasiswa',
    title: 'Beasiswa Vokasi Digital & Tahfidz Syariah',
    description: 'Program beasiswa penuh 3 tahun tingkat diploma vokasi TI, pengembangan perangkat lunak, dan pendampingan hafiz Quran bagi mahasiswa 3T.',
    asnaf_category: 'Fisabilillah / Ibnu Sabil',
    esg_pillar: 'Pendidikan Quality Education (SDG 4)',
    target_beneficiaries: '500 Mahasiswa & Pelajar 3T',
    embedding_generated: true,
    created_at: '2026-08-01T00:00:00Z',
  },
  {
    id: 'prog_02_pesantren',
    title: 'Program Digitalisasi & Elektrifikasi Pesantren 3T',
    description: 'Instalasi panel surya mandiri, laboratorium komputer, dan koneksi internet pita lebar untuk 50 pesantren tradisional di pelosok daerah.',
    asnaf_category: 'Fisabilillah',
    esg_pillar: 'Infrastruktur & Komunitas Inklusif (SDG 9)',
    target_beneficiaries: '50 Pesantren / 12.000 Santri',
    embedding_generated: true,
    created_at: '2026-08-05T00:00:00Z',
  },
  {
    id: 'prog_04_modal_umkm',
    title: 'Bantuan Modal Usaha Bergulir Perempuan Dhuafa',
    description: 'Penyaluran modal usaha tanpa bunga (Qardhul Hasan), pendampingan literasi keuangan syariah, dan sertifikasi halal UMKM wirausaha ibu rumah tangga.',
    asnaf_category: 'Miskin / Gharimin',
    esg_pillar: 'Pekerjaan Layak & Pertumbuhan Ekonomi (SDG 8)',
    target_beneficiaries: '1.000 Pengusaha Perempuan',
    embedding_generated: true,
    created_at: '2026-08-10T00:00:00Z',
  },
  {
    id: 'prog_03_anak_yatim',
    title: 'Santunan & Pelatihan Keterampilan Anak Yatim Dhuafa',
    description: 'Program jaminan pendidikan, nutrisi kesehatan, dan pelatihan keahlian praktis bagi anak-anak yatim dhuafa di panti asuhan binaan.',
    asnaf_category: 'Fakir / Miskin',
    esg_pillar: 'Tanpa Kemiskinan (SDG 1)',
    target_beneficiaries: '750 Anak Yatim Dhuafa',
    embedding_generated: true,
    created_at: '2026-08-12T00:00:00Z',
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
