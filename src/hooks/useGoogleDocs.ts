import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

// Google Docs integration (API: docs/API_SPEC.md §6 in sovera-csr-api). The response interceptor
// already unwraps axios' response, so calls return the JSON body.

export type GoogleIntegrationStatus = 'connected' | 'disconnected' | 'expired' | 'error';

export interface GoogleIntegration {
  connected: boolean;
  google_email?: string;
  status: GoogleIntegrationStatus;
  last_error?: string;
  connected_at?: string;
}

export interface BudgetItemInput {
  description: string;
  quantity: number;
  unit_price: number;
}

export interface GoogleDocRequest {
  deal_id?: string;
  proposal_title: string;
  company_name: string;
  program_summary: string;
  target_beneficiaries: string;
  budget_items: BudgetItemInput[];
}

export type GoogleDocJobStatus = 'queued' | 'processing' | 'completed' | 'failed';

export interface GoogleDocJob {
  job_id: string;
  deal_id?: string;
  status: GoogleDocJobStatus;
  proposal_title: string;
  document_id?: string;
  document_url?: string;
  preview_url?: string;
  error_code?: string;
  error_message?: string;
  duration_ms?: number;
  created_at: string;
  completed_at?: string;
}

// The API rejects with the response body: { success: false, error: CODE, message }.
export interface ApiError {
  error?: string;
  message?: string;
}

export function apiErrorCode(err: unknown): string | undefined {
  if (err && typeof err === 'object' && 'error' in err && typeof (err as ApiError).error === 'string') {
    return (err as ApiError).error;
  }
  return undefined;
}

const integrationKey = ['google-integration'];

export function useGoogleIntegration() {
  return useQuery<GoogleIntegration, ApiError>({
    queryKey: integrationKey,
    queryFn: async () => {
      const res = (await apiClient.get('/integrations/google')) as unknown as { data?: GoogleIntegration };
      if (!res?.data) throw new Error('Respons dari server tidak lengkap.');
      return res.data;
    },
    retry: (count, err) => apiErrorCode(err) !== 'FEATURE_DISABLED' && count < 2,
  });
}

// Starts the consent round trip: the browser leaves for Google and comes back to
// /settings/integrations?google=connected|error.
export function useConnectGoogle() {
  return useMutation<void, ApiError>({
    mutationFn: async () => {
      const res = (await apiClient.get('/integrations/google/auth-url')) as unknown as { data?: { auth_url?: string } };
      const url = res?.data?.auth_url;
      if (!url || !url.startsWith('https://accounts.google.com/')) {
        throw new Error('Tautan otorisasi Google tidak valid.');
      }
      window.location.assign(url);
    },
  });
}

export function useDisconnectGoogle() {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError>({
    mutationFn: async () => {
      await apiClient.delete('/integrations/google');
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: integrationKey }),
  });
}

export function useCreateGoogleDoc() {
  return useMutation<{ job_id: string; status: GoogleDocJobStatus }, ApiError, GoogleDocRequest>({
    mutationFn: async (payload) => {
      const res = (await apiClient.post('/proposals/google-docs', payload)) as unknown as {
        data?: { job_id: string; status: GoogleDocJobStatus };
      };
      if (!res?.data?.job_id) throw new Error('Respons dari server tidak lengkap.');
      return res.data;
    },
  });
}

const POLL_MS = 1500;
export const JOB_TIMEOUT_MS = 90_000;

// Polls a job until it completes or fails. The caller stops waiting after JOB_TIMEOUT_MS.
export function useGoogleDocJob(jobId: string | null) {
  return useQuery<GoogleDocJob, ApiError>({
    queryKey: ['google-doc-job', jobId],
    enabled: !!jobId,
    queryFn: async () => {
      const res = (await apiClient.get(`/proposals/google-docs/${jobId}`)) as unknown as { data?: GoogleDocJob };
      if (!res?.data) throw new Error('Respons dari server tidak lengkap.');
      return res.data;
    },
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === 'completed' || status === 'failed' ? false : POLL_MS;
    },
    refetchIntervalInBackground: true,
    retry: 2,
  });
}

// Indonesian messages for the codes the API and worker return (PRD §6).
export const GOOGLE_ERROR_MESSAGES: Record<string, string> = {
  GOOGLE_NOT_CONNECTED: 'Akun Google organisasi belum terhubung.',
  GOOGLE_REAUTH_REQUIRED: 'Akses ke akun Google kedaluwarsa atau dicabut. Hubungkan ulang akun Google.',
  GOOGLE_API_UNAVAILABLE: 'Layanan Google sedang sibuk atau tidak tersedia. Coba beberapa saat lagi.',
  DRIVE_QUOTA_EXCEEDED: 'Penyimpanan Google Drive akun yang terhubung sudah penuh.',
  INJECTION_FAILED: 'Dokumen gagal diisi. Coba lagi; jika berulang, hubungi tim CSRMatics.',
  TEMPLATE_INVALID: 'Template proposal bermasalah. Tim CSRMatics sudah diberi tahu.',
  GOOGLE_API_ERROR: 'Google menolak permintaan pembuatan dokumen.',
  ENQUEUE_FAILED: 'Antrean pembuatan dokumen sedang tidak tersedia.',
  QUEUE_UNAVAILABLE: 'Antrean pembuatan dokumen sedang tidak tersedia. Coba lagi nanti.',
  INVALID_INPUT: 'Data proposal tidak valid.',
  INTERNAL_ERROR: 'Terjadi kesalahan di server.',
  FEATURE_DISABLED: 'Integrasi Google Docs belum diaktifkan untuk platform ini.',
  TENANT_RATE_LIMIT_EXCEEDED: 'Terlalu banyak permintaan pembuatan dokumen. Tunggu sebentar lalu coba lagi.',
  RATE_LIMIT_EXCEEDED: 'Terlalu banyak permintaan. Tunggu sebentar lalu coba lagi.',
};

export const REAUTH_CODES = new Set(['GOOGLE_NOT_CONNECTED', 'GOOGLE_REAUTH_REQUIRED']);

// Reasons the OAuth callback redirects back with (?google=error&reason=...).
export const CONNECT_ERROR_MESSAGES: Record<string, string> = {
  ACCESS_DENIED: 'Izin akses dibatalkan di halaman Google.',
  INVALID_STATE: 'Sesi otorisasi kedaluwarsa atau tidak valid. Silakan ulangi.',
  EXCHANGE_FAILED: 'Google tidak menyelesaikan otorisasi. Silakan ulangi.',
  MISSING_REFRESH_TOKEN: 'Google tidak memberikan akses jangka panjang. Silakan ulangi dan setujui semua izin.',
  INSUFFICIENT_SCOPE: 'Izin Google Drive dan Google Docs wajib dicentang semuanya. Silakan ulangi.',
  SAVE_FAILED: 'Koneksi berhasil di Google tetapi gagal disimpan. Silakan ulangi.',
  FEATURE_DISABLED: 'Integrasi Google Docs belum diaktifkan untuk platform ini.',
};

export const formatRupiah = (v: number) =>
  'Rp ' + Math.round(v || 0).toLocaleString('id-ID', { maximumFractionDigits: 0 });

export interface GoogleDocJobPage {
  jobs: GoogleDocJob[];
  page: number;
  limit: number;
  total: number;
}

// History of generated documents, newest first, optionally for one deal.
export function useGoogleDocJobs({ dealId, page = 1, limit = 10 }: { dealId?: string | null; page?: number; limit?: number }) {
  return useQuery<GoogleDocJobPage, ApiError>({
    queryKey: ['google-doc-jobs', dealId || null, page, limit],
    queryFn: async () => {
      const params = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (dealId) params.set('deal_id', dealId);
      const res = (await apiClient.get(`/proposals/google-docs?${params}`)) as unknown as {
        data?: GoogleDocJob[];
        meta?: { page: number; limit: number; total: number };
      };
      if (!Array.isArray(res?.data)) throw new Error('Respons dari server tidak lengkap.');
      return { jobs: res.data, page: res.meta?.page ?? page, limit: res.meta?.limit ?? limit, total: res.meta?.total ?? res.data.length };
    },
    retry: (count, err) => apiErrorCode(err) !== 'FEATURE_DISABLED' && count < 2,
    // Keep refreshing while a listed job is still running.
    refetchInterval: (query) =>
      query.state.data?.jobs.some((j) => j.status === 'queued' || j.status === 'processing') ? 5000 : false,
  });
}

// Drafts the program summary with the deal's AI pitch (POST /deals/:id/generate-pitch). That
// endpoint returns a Markdown proposal, not budget items.
export function useDraftSummaryWithAI() {
  return useMutation<string, ApiError, string>({
    mutationFn: async (dealId) => {
      const res = (await apiClient.post(`/deals/${dealId}/generate-pitch`, {
        tone: 'ZAKAT_WAQF_INSTITUTION',
        custom_notes: '',
      })) as unknown as { proposal_markdown?: string };
      const text = markdownToPlain(res?.proposal_markdown || '');
      if (!text) throw new Error('AI tidak mengirim draf proposal.');
      return text;
    },
  });
}

// Google Docs receives plain text: Markdown markers would show up literally in the document.
export function markdownToPlain(md: string): string {
  return md
    .replace(/\r\n/g, '\n')
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/```\w*\n?/g, ''))
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '• ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/(\*\*|__)(.+?)\1/g, '$2')
    .replace(/(^|[^*\w])[*_]([^*_\n]+)[*_](?=[^*\w]|$)/g, '$1$2')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^>\s?/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, 20000);
}
