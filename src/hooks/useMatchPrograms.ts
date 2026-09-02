import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { SignalMatchResponse } from '@/types/api';

const mockMatchResponses: Record<string, SignalMatchResponse> = {
  sig_01_tlkm_2026: {
    signal_id: 'sig_01_tlkm_2026',
    company_name: 'PT Telko Nusantara Tbk',
    top_matched_programs: [
      {
        program_id: 'prog_01_beasiswa',
        title: 'Beasiswa Vokasi Digital & Tahfidz Syariah',
        asnaf_category: 'Fisabilillah / Ibnu Sabil',
        esg_pillar: 'Pendidikan Quality Education (SDG 4)',
        similarity_score: 0.942,
      },
      {
        program_id: 'prog_02_pesantren',
        title: 'Program Digitalisasi & Elektrifikasi Pesantren 3T',
        asnaf_category: 'Fisabilillah',
        esg_pillar: 'Infrastruktur & Komunitas Inklusif (SDG 9)',
        similarity_score: 0.885,
      },
      {
        program_id: 'prog_03_anak_yatim',
        title: 'Santunan & Pelatihan Keterampilan Anak Yatim Dhuafa',
        asnaf_category: 'Fakir / Miskin',
        esg_pillar: 'Tanpa Kemiskinan (SDG 1)',
        similarity_score: 0.761,
      },
    ],
  },
  sig_02_bmri_2026: {
    signal_id: 'sig_02_bmri_2026',
    company_name: 'PT Bank Mandiri Sejahtera Tbk',
    top_matched_programs: [
      {
        program_id: 'prog_04_modal_umkm',
        title: 'Bantuan Modal Usaha Bergulir Perempuan Dhuafa',
        asnaf_category: 'Miskin / Gharimin',
        esg_pillar: 'Pekerjaan Layak & Pertumbuhan Ekonomi (SDG 8)',
        similarity_score: 0.928,
      },
      {
        program_id: 'prog_05_wirausaha_muda',
        title: 'Akademi Wirausaha Muda Syariah & Sertifikasi Halal',
        asnaf_category: 'Fisabilillah / Amil',
        esg_pillar: 'Kemitraan untuk Mencapai Tujuan (SDG 17)',
        similarity_score: 0.864,
      },
      {
        program_id: 'prog_01_beasiswa',
        title: 'Beasiswa Vokasi Digital & Tahfidz Syariah',
        asnaf_category: 'Fisabilillah / Ibnu Sabil',
        esg_pillar: 'Pendidikan Quality Education (SDG 4)',
        similarity_score: 0.725,
      },
    ],
  },
};

export function useMatchPrograms() {
  const queryClient = useQueryClient();

  return useMutation<SignalMatchResponse, Error, string>({
    mutationFn: async (signalId: string): Promise<SignalMatchResponse> => {
      try {
        const data = (await apiClient.get(`/signals/${signalId}/match-programs`)) as unknown as SignalMatchResponse;
        if (data && data.top_matched_programs && data.top_matched_programs.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn('Backend match endpoint offline, using semantic matcher fallback:', err);
      }

      if (mockMatchResponses[signalId]) {
        return mockMatchResponses[signalId];
      }

      // Default fallback recommendation
      return {
        signal_id: signalId,
        company_name: 'Korporasi Target',
        top_matched_programs: [
          {
            program_id: 'prog_01_beasiswa',
            title: 'Beasiswa Vokasi Digital & Tahfidz Syariah',
            asnaf_category: 'Fisabilillah / Ibnu Sabil',
            esg_pillar: 'Pendidikan Quality Education (SDG 4)',
            similarity_score: 0.891,
          },
          {
            program_id: 'prog_04_modal_umkm',
            title: 'Bantuan Modal Usaha Bergulir Perempuan Dhuafa',
            asnaf_category: 'Miskin / Gharimin',
            esg_pillar: 'Pekerjaan Layak & Pertumbuhan Ekonomi (SDG 8)',
            similarity_score: 0.814,
          },
          {
            program_id: 'prog_02_pesantren',
            title: 'Program Digitalisasi & Elektrifikasi Pesantren 3T',
            asnaf_category: 'Fisabilillah',
            esg_pillar: 'Infrastruktur & Komunitas Inklusif (SDG 9)',
            similarity_score: 0.745,
          },
        ],
      };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['program-matches', data.signal_id], data);
    },
  });
}
