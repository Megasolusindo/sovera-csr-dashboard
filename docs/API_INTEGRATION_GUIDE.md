# Frontend API Integration Guide (API_INTEGRATION_GUIDE.md)

**Product:** Sovera Web Dashboard (`sovera-web-dashboard`)  
**Target Backend:** Sovera Core Backend API (`sovera-core-api`)  
**Base URL:** `https://api.sovera.id/api/v1` (Production) / `http://localhost:4000/api/v1` (Development)  
**Authentication Standard:** HTTP Authorization Header `Bearer <JWT_TOKEN>`  

---

## 1. Overview & Integration Philosophy

Dokumen ini adalah panduan teknis bagi developer frontend Next.js untuk mengintegrasikan antarmuka dasbor dengan backend Sovera Core API.

### Core Principles
1. **Strict Type Safety:** Seluruh payload request dan response wajib memiliki definisi interface TypeScript yang sinkron dengan spesifikasi backend (`API_SPEC.md`).
2. **Centralized API Client:** Seluruh pemanggilan jaringan dipusatkan melalui HTTP client wrapper (`lib/api-client.ts`) yang menangani autentikasi JWT, interceptor error, dan deserialisasi data.
3. **Resilient Data Fetching:** Menggunakan **TanStack Query (React Query)** untuk caching, revalidasi latar belakang, dan penanganan mutasi optimistik (*optimistic updates*).

---

## 2. API Client Configuration (`lib/api-client.ts`)

Gunakan client berbasis Axios atau Native Fetch wrapper dengan interceptor token:

```typescript
// src/lib/api-client.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 detik untuk operasi AI
});

// Request Interceptor: Injeksi JWT Token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('sovera_auth_token'); // atau baca dari session cookie
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Tangani 401 Unauthorized & Global Error Format
apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<{ error: string; message: string }>) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('sovera_auth_token');
        window.location.href = '/login?expired=true';
      }
    }
    return Promise.reject(error.response?.data || error.message);
  }
);
```

---

## 3. TypeScript Interfaces & Data Contracts

Letakkan definisi tipe data berikut di `src/types/api.ts`:

```typescript
// src/types/api.ts

export type SignalSource = 'BEI_REPORT' | 'NEWS' | 'CSR_PDF' | 'SOCIAL';

export type DealStage = 
  | 'DISCOVERED' 
  | 'RESEARCH' 
  | 'PITCHED' 
  | 'NEGOTIATION' 
  | 'CLOSED_WON' 
  | 'CLOSED_LOST';

// 1. Sinyal Korporasi Publik
export interface CorporateSignal {
  id: string;
  company_name: string;
  industry_sector: string;
  source_type: SignalSource;
  source_url: string;
  summary: string;
  extracted_pillar: string;
  target_regions: string[];
  estimated_budget_signal: number | null;
  trigger_event: string;
  intent_score: number;
  published_date: string;
}

// 2. Program Lembaga (Tenant Isolated)
export interface InstitutionProgram {
  id: string;
  title: string;
  description: string;
  asnaf_category: string;
  esg_pillar: string;
  target_beneficiaries: string;
  created_at: string;
}

// 3. Rekomendasi Program Match
export interface MatchedProgram {
  program_id: string;
  title: string;
  asnaf_category: string;
  esg_pillar: string;
  similarity_score: number;
}

export interface SignalMatchResponse {
  signal_id: string;
  company_name: string;
  top_matched_programs: MatchedProgram[];
}

// 4. Deal Pipeline
export interface DealPipelineItem {
  id: string;
  company_name: string;
  deal_stage: DealStage;
  estimated_value: number | null;
  target_program_id: string | null;
  generated_icebreaker?: string;
  generated_proposal?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// 5. Generate Pitch & Proposal Response
export interface GeneratedPitchResponse {
  deal_id: string;
  icebreaker: string;
  pitch_deck_outline: string[];
  proposal_markdown: string;
}
```

---

## 4. Feature Integration Methods & Code Examples

### 4.1 Corporate Intelligence Feed (`useSignals.ts`)

```typescript
// src/hooks/useSignals.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { CorporateSignal } from '@/types/api';

interface GetSignalsParams {
  limit?: number;
  offset?: number;
  min_intent?: number;
  industry?: string;
}

interface SignalsResponse {
  data: CorporateSignal[];
  pagination: { total: number; limit: number; offset: number };
}

export function useSignals(params: GetSignalsParams = {}) {
  return useQuery<SignalsResponse>({
    queryKey: ['signals', params],
    queryFn: () => apiClient.get('/signals', { params }),
    staleTime: 5 * 60 * 1000, // Cache 5 menit
  });
}
```

### 4.2 Match Programs via AI (`useMatchPrograms.ts`)

```typescript
// src/hooks/useMatchPrograms.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { SignalMatchResponse, InstitutionProgram } from '@/types/api';

export function useMatchPrograms() {
  const queryClient = useQueryClient();

  return useMutation<SignalMatchResponse, Error, string>({
    mutationFn: (signalId: string) => 
      apiClient.post<SignalMatchResponse>(`/signals/${signalId}/match-programs`),
    onSuccess: (data) => {
      // 1. Cache hasil rekomendasi
      queryClient.setQueryData(['program-matches', data.signal_id], data);
      
      // 2. Pre-fetch detail program yang cocok untuk drawer
      data.top_matched_programs.forEach(p => {
        queryClient.prefetchQuery({
          queryKey: ['program', p.program_id],
          queryFn: () => apiClient.get<InstitutionProgram>(`/programs/${p.program_id}`),
          staleTime: 10 * 60 * 1000,
        });
      });
    },
  });
}
```

### 4.3 Create Deal & Update Stage (`useDealPipeline.ts`)

```typescript
// src/hooks/useDealPipeline.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { DealPipelineItem, DealStage } from '@/types/api';

export function useUpdateDealStage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dealId, stage }: { dealId: string; stage: DealStage }) =>
      apiClient.patch(`/deals/${dealId}/stage`, { deal_stage: stage }),
    
    // Optimistic UI Update: Langsung ubah state lokal sebelum server merespons
    onMutate: async ({ dealId, stage }) => {
      await queryClient.cancelQueries({ queryKey: ['deals'] });
      const previousDeals = queryClient.getQueryData<DealPipelineItem[]>(['deals']);

      queryClient.setQueryData<DealPipelineItem[]>(['deals'], (old) =>
        old ? old.map((d) => (d.id === dealId ? { ...d, deal_stage: stage } : d)) : []
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
```

### 4.4 AI Proposal Generation Trigger (`useGenerateProposal.ts`)

```typescript
// src/hooks/useGenerateProposal.ts
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { GeneratedPitchResponse } from '@/types/api';

interface GeneratePayload {
  dealId: string;
  tone: 'FORMAL_STRATEGIC' | 'EMPATHETIC_HUMANITARIAN';
  customNotes?: string;
}

export function useGenerateProposal() {
  return useMutation<GeneratedPitchResponse, Error, GeneratePayload>({
    mutationFn: ({ dealId, tone, customNotes }) =>
      apiClient.post(`/deals/${dealId}/generate-pitch`, {
        tone,
        custom_notes: customNotes,
      }),
  });
}
```

### 4.5 Binary File Downloader (`downloadProposalFile.ts`)

Gunakan helper khusus ini untuk mengunduh stream berkas proposal biner dari endpoint `/deals/:id/export`:

```typescript
// src/lib/download-proposal.ts
import axios from 'axios';

export async function downloadProposalFile(
  dealId: string,
  format: 'docx' | 'pdf',
  companyName: string
) {
  const token = localStorage.getItem('sovera_auth_token');
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1';

  const response = await axios.post(
    `${API_BASE_URL}/deals/${dealId}/export?format=${format}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob', // Wajib blob untuk file biner
    }
  );

  // Buat URL unduhan sementara di DOM
  const blob = new Blob([response.data]);
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  
  const sanitizedName = companyName.replace(/[^a-zA-Z0-9]/g, '_');
  link.setAttribute('download', `Proposal_Kemitraan_${sanitizedName}.${format}`);
  
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(downloadUrl);
}
```

---

## 5. Standard Error Handling Pattern

Backend Sovera Core API selalu mengembalikan format error standar:

```json
{
  "success": false,
  "error": "TENANT_UNAUTHORIZED",
  "message": "Akses ditolak. Sesi organisasi tidak valid."
}
```

### Penanganan di UI Frontend:
* **`TENANT_UNAUTHORIZED` / `401`:** Hapus token autentikasi, dan alihkan (*redirect*) pengguna ke `/login`.
* **`SIGNAL_NOT_FOUND` / `404`:** Tampilkan halaman/drawer kosong dengan CTA kembali ke feed.
* **`AI_RATE_LIMIT` / `429`:** Tampilkan notifikasi toast: *"Layanan AI sedang sibuk. Draf Anda dalam antrean dan akan selesai dalam beberapa saat."*
* **`VALIDATION_ERROR` / `400`:** Tampilkan pesan error spesifik pada field formulir terkait (*inline error message*).