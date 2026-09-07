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

const mockSignalsData: CorporateSignal[] = [
  {
    id: 'sig_01_tlkm_2026',
    company_name: 'PT Telko Nusantara Tbk',
    industry_sector: 'Telekomunikasi',
    source_type: 'BEI_REPORT',
    source_url: 'https://www.telkom.co.id/sites/sustainability/id_ID/page/csr-1127',
    summary: 'Mengalokasikan anggaran TJSL Rp 45 Miliar untuk akselerasi jaringan digital sekolah daerah 3T, elektrifikasi pesantren syariah, dan beasiswa vokasi talenta muda.',
    extracted_pillar: 'Pendidikan & Digitalisasi',
    target_regions: ['Jawa Barat', 'NTT', 'Papua Barat'],
    estimated_budget_signal: 45000000000,
    trigger_event: 'Publikasi Sustainability Report 2025 (POJK 51)',
    intent_score: 92,
    published_date: '2026-08-28T00:00:00Z',
  },
  {
    id: 'sig_02_bmri_2026',
    company_name: 'PT Bank Mandiri Sejahtera Tbk',
    industry_sector: 'Perbankan',
    source_type: 'NEWS',
    source_url: 'https://www.bankmandiri.co.id/csr-updates',
    summary: 'Komitmen program kemitraan UMKM berbasis syariah & pembiayaan inklusif bagi 1.000 wirausaha muda perempuan di wilayah pesisir.',
    extracted_pillar: 'Pemberdayaan Ekonomi (Asnaf Miskin)',
    target_regions: ['Jawa Tengah', 'Jawa Timur', 'Sulawesi Selatan'],
    estimated_budget_signal: 25000000000,
    trigger_event: 'Rapat Umum Pemegang Saham (RUPS) Dana TJSL',
    intent_score: 88,
    published_date: '2026-08-25T00:00:00Z',
  },
  {
    id: 'sig_03_asii_2026',
    company_name: 'PT Astra Solusi Nusantara Tbk',
    industry_sector: 'Otomotif & Industri',
    source_type: 'CSR_PDF',
    source_url: 'https://www.astra.co.id/Sustainability',
    summary: 'Pengembangan Kampung Berseri Astra dan revitalisasi sarana kesehatan Posyandu di 50 desa tertinggal.',
    extracted_pillar: 'Kesehatan & Sanitasi',
    target_regions: ['Banten', 'Lampung', 'Kalimantan Timur'],
    estimated_budget_signal: 18000000000,
    trigger_event: 'Peluncuran Gerakan Kesehatan Nasional Astra',
    intent_score: 76,
    published_date: '2026-08-20T00:00:00Z',
  },
  {
    id: 'sig_04_adro_2026',
    company_name: 'PT Energi Nusantara Bersama Tbk',
    industry_sector: 'Energi & Pertambangan',
    source_type: 'BEI_REPORT',
    source_url: 'https://www.idx.co.id/id/perusahaan-tercatat/laporan-keuangan-dan-tahunan/',
    summary: 'Program penanaman 100.000 bibit mangrove dan rehabilitasi daerah aliran sungai sekitar pertambangan.',
    extracted_pillar: 'Keanekaragaman Hayati & Lingkungan',
    target_regions: ['Kalimantan Selatan', 'Sumatera Selatan'],
    estimated_budget_signal: 30000000000,
    trigger_event: 'Komitmen Net-Zero Carbon POJK 51',
    intent_score: 82,
    published_date: '2026-08-15T00:00:00Z',
  },
  {
    id: 'sig_05_bbca_2026',
    company_name: 'PT Bank Central Utama Tbk',
    industry_sector: 'Perbankan',
    source_type: 'NEWS',
    source_url: 'https://www.bca.co.id/id/tentang-bca/csr/bakti-bca',
    summary: 'Program pembinaan desa wisata edukasi dan konservasi budaya lokal syariah.',
    extracted_pillar: 'Sosial Budaya & Ekonomi Kebangsaan',
    target_regions: ['DI Yogyakarta', 'Bali', 'NTB'],
    estimated_budget_signal: 12000000000,
    trigger_event: 'Peresmian Desa Wisata Binaan',
    intent_score: 64,
    published_date: '2026-08-10T00:00:00Z',
  },
  {
    id: 'sig_06_djarum_2026',
    company_name: 'Djarum Foundation',
    industry_sector: 'Yayasan Korporat & Konservasi',
    source_type: 'CSR_OPPORTUNITY_SEARCH',
    source_url: 'https://www.djarumfoundation.org/aktivitas/',
    summary: 'Membuka pendaftaran proposal hibah program konservasi air & penanaman pohon penghijauan wilayah pesisir.',
    extracted_pillar: 'Lingkungan & Konservasi Air',
    target_regions: ['Jawa Tengah', 'Jawa Timur'],
    estimated_budget_signal: 15000000000,
    trigger_event: 'Call for Proposals Hibah Lingkungan 2026',
    intent_score: 95,
    published_date: '2026-09-01T00:00:00Z',
  },
  {
    id: 'sig_07_telkom_enrich_2026',
    company_name: 'PT Telkom Indonesia (Persero) Tbk',
    industry_sector: 'Telekomunikasi',
    source_type: 'COMPANY_ENRICHMENT',
    source_url: 'https://www.telkom.co.id/sites/sustainability/id_ID/page/csr-1127',
    summary: 'Kontak Publik Departemen TJSL Telkom: tjsl@telkom.co.id. Fokus utama program: Digitalisasi Pendidikan & Energi Baru Terbarukan (EBT).',
    extracted_pillar: 'Digitalisasi Pendidikan & ESG',
    target_regions: ['Nasional'],
    estimated_budget_signal: 50000000000,
    trigger_event: 'Update Direktori Kontak & Profil ESG Korporasi',
    intent_score: 90,
    published_date: '2026-09-03T00:00:00Z',
  },
];

export function useSignals(params: GetSignalsParams = {}) {
  return useQuery<SignalsResponse>({
    queryKey: ['signals', params],
    queryFn: async (): Promise<SignalsResponse> => {
      try {
        const response = (await apiClient.get('/signals', { params })) as unknown as SignalsResponse;
        if (response && Array.isArray(response.data) && response.data.length > 0) {
          return response;
        }
      } catch (err) {
        console.warn('API call failed or offline, using mock data for signals:', err);
      }

      // Filter fallback mock data
      let filtered = [...mockSignalsData];
      if (params.min_intent) {
        filtered = filtered.filter((s) => s.intent_score >= (params.min_intent || 0));
      }
      if (params.industry && params.industry !== 'ALL') {
        filtered = filtered.filter((s) => s.industry_sector.toLowerCase().includes(params.industry!.toLowerCase()));
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(
          (s) =>
            s.company_name.toLowerCase().includes(q) ||
            s.summary.toLowerCase().includes(q) ||
            s.extracted_pillar.toLowerCase().includes(q)
        );
      }

      return {
        data: filtered,
        pagination: {
          total: filtered.length,
          limit: params.limit || 20,
          offset: params.offset || 0,
        },
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}
