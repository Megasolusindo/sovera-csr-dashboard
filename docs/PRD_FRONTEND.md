# Product Requirement Document (PRD) - Frontend Dashboard

**Product Name:** Sovera Web Dashboard (`sovera-web-dashboard`)  
**Application Type:** Single-Page / Server-Driven Web Application (Next.js App Router)  
**Target Users:** Executive/Director Kemitraan, Corporate Fundraiser / Account Executive, System Admin Lembaga  
**Version:** 1.0 (Enterprise Baseline)  
**Integration:** Sovera Core Backend API (`sovera-core-api`)  

---

## 1. Executive Summary & Objective

**Sovera Web Dashboard** adalah antarmuka berbasis web untuk platform *fundraising intelligence & deal preparation*. Antarmuka ini dirancang untuk:
1. Menyajikan umpan (*feed*) peluang kemitraan korporasi (CSR/TJSL/Zakat Korporasi) hasil ekstraksi AI secara *real-time*.
2. Memberikan visualisasi kecocokan semantik (*match score*) antara program lembaga dan fokus ESG korporasi.
3. Menyediakan studio interaktif untuk mengedit, memoles, dan mengekspor proposal penawaran otomatis ke format `.docx` atau `.pdf`.
4. Mengelola alur kesepakatan (*deal pipeline*) melalui papan interaktif (Kanban Board).

---

## 2. Tech Stack & Frontend Architecture

* **Framework:** Next.js (App Router, React Server Components)
* **Language:** TypeScript (Strict Type Safety)
* **State Management & Data Fetching:** TanStack Query (React Query) + Server Actions
* **UI Component Library:** Shadcn UI + Radix UI Primitives + Tailwind CSS
* **Icons:** Lucide React
* **Rich Text / Proposal Editor:** Tiptap Editor atau Markdown WYSIWYG
* **Kanban / Drag & Drop:** `@hello-pangea/dnd` atau `dnd-kit`
* **Charts & Analytics:** Recharts / Tremor

---

## 3. User Roles & Access Control

| Role | Hak Akses Fitur Dashboard |
| :--- | :--- |
| **Director / Head of Partnership** | Akses penuh seluruh modul: ringkasan analitik, seluruh deal pipeline tim, export laporan agregat. |
| **Fundraiser / AE** | Akses feed intelijen, pencocokan program, deal pipeline pribadi/tim, proposal studio & export berkas. |
| **System Admin** | Akses manajemen master program lembaga, manajemen akun pengguna, dan konfigurasi profil organisasi. |

---

## 4. Page Architecture & Functional Modules

### 4.1 Modul 1: Executive Overview / Analytics (`/dashboard`)
* **KPI Metrics Cards:**
  * Total Peluang Aktif (Feed Baru).
  * Total Nilai Pipeline (Estimasi Rp).
  * Deals dalam Tahap Negosiasi.
  * Deals Berhasil Ditutup (*Closed-Won*).
* **Visual Charts:**
  * Distribusi Sektor Industri Target (Telekomunikasi, Energi, Perbankan, dll.).
  * Grafik Konversi Funnel Tahapan Kemitraan.
* **High-Intent Quick Feed:** 5 sinyal korporasi terbaru dengan Intent Score $\ge 85$.

---

### 4.2 Modul 2: Corporate Intelligence Feed (`/signals`)
* **Signal Explorer:**
  * Daftar kartu sinyal intelijen bursa/CSR hasil pemrosesan crawler & LLM.
  * Indikator *Intent Score Badge* (Warna hijau: 80–100, Kuning: 50–79, Abu-abu: <50).
  * Label pilar ESG, estimasi anggaran CSR, dan pemicu momentum (*trigger event*).
* **Search & Filters:**
  * Filter berdasarkan Sektor Industri, Rentang Intent Score, dan Wilayah Target (*Ring-1*).
* **Detail Modal / Drawer:**
  * Rangkuman komprehensif profil emiten/korporasi.
  * Tautan ke dokumen sumber asli (Laporan Keberlanjutan BEI / Berita).
  * **Widget Program Matcher:** Menampilkan 3 program lembaga yang paling selaras secara otomatis beserta persentase *similarity score*.
  * Tombol aksi: *"Klaim ke Pipeline"* $\rightarrow$ membuka form inisiasi deal.

---

### 4.3 Modul 3: Institution Program Manager (`/programs`)
* **Master Data Program Lembaga:**
  * Antarmuka CRUD untuk mengelola portofolio program unggulan lembaga.
  * Form input mencakup: Judul Program, Deskripsi Lengkap, Kategori 8 Asnaf, Pilar ESG/SDG terkait, dan Target Penerima Manfaat.
* **Embedding Status Indicator:** Menampilkan status sinkronisasi vektor database AI untuk setiap program.

---

### 4.4 Modul 4: B2B Deal Pipeline / Kanban Board (`/pipeline`)
* **Kanban Drag-and-Drop Columns:**
  1. `DISCOVERED` (Peluang teridentifikasi)
  2. `RESEARCH` (Pendalaman profil & stakeholder)
  3. `PITCHED` (Proposal/Pitch deck terkirim)
  4. `NEGOTIATION` (Audiensi & penyesuaian RAB)
  5. `CLOSED_WON` (MoU / SPK Ditandatangani)
  6. `CLOSED_LOST` (Batal / Tidak Disetujui)
* **Card Quick Info:** Nama Korporasi, Nilai Estimasi (Rp), Program Target yang Diusung, dan PIC Fundraiser.
* **Interactions:** Klik kartu untuk membuka Deal Workspace & Proposal Studio.

---

### 4.5 Modul 5: Deal Workspace & Proposal Studio (`/pipeline/:dealId`)
* **Header:** Status deal, nama korporasi target, dan nominal estimasi kemitraan.
* **Tab 1: Strategic Intelligence & Ice-Breaker:**
  * Poin pembuka percakapan (*Ice-Breaker text*) yang disesuaikan dengan momentum korporasi.
  * Tombol *"Salin Naskah Email / WA"* untuk PIC Fundraiser.
* **Tab 2: Pitch Deck Outline:**
  * Kerangka 5 slide presentasi penawaran kemitraan institusional.
* **Tab 3: Full Proposal Editor:**
  * Teks proposal lengkap hasil generate AI dalam format Rich Text / Markdown.
  * Pengguna dapat mengedit narasi, menambahkan klausul anggaran, dan menyunting rincian dampak.
  * Tombol aksi ekspor: *"Export Word (.docx)"* dan *"Export PDF"*.
* **Tab 4: Activity & Internal Notes:**
  * Catatan hasil audiensi dan histori pemindahan status.

---

## 5. User Interface (UI/UX) Guidelines

* **Theme & Tone:** Bersih, modern, dan bernuansa enterprise-grade (Dominan Slate/Neutral dengan aksen Emerald/Emerald-Green untuk identitas filantropi syariah).
* **Responsive Behavior:** Optimal untuk layar Desktop (1280px ke atas) untuk pengalaman Kanban & Proposal Studio terbaik, dengan dukungan tampilan adaptif untuk tablet dan ponsel pintar.
* **Loading & Error States:** Menggunakan *Skeleton Shimmer* saat proses *data fetching* dan indikator *loading progress bar* saat AI menyusun proposal naskah panjang.

---

## 6. Frontend Security & Data Isolation Policy

* **JWT Storage:** Menyimpan access token di dalam `httpOnly` secure cookies untuk mencegah serangan XSS.
* **Tenant Guard:** Setiap *request* ke backend API wajib membawa header otentikasi JWT. UI tidak boleh menampilkan fitur switching organisasi kecuali untuk role Super Admin sistem.
* **Client-Side Sanitization:** Naskah markdown dan HTML yang dirender di Proposal Studio wajib melewati pustaka sanitasi (seperti DOMPurify) sebelum ditampilkan.

---

## 7. Frontend Directory Structure

```text
sovera-web-dashboard/
├── docs/
│   ├── PRD_FRONTEND.md
│   ├── UI_SPEC.md
│   └── API_INTEGRATION_GUIDE.md
├── src/
│   ├── app/                    # Next.js App Router Pages
│   │   ├── (auth)/             # Login & Authentication routes
│   │   ├── (dashboard)/        # Authenticated Layout & Pages
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx        # /dashboard (Executive Summary)
│   │   │   ├── signals/        # /signals (Corporate Feed & Detail)
│   │   │   ├── programs/       # /programs (Program Portfolio CRUD)
│   │   │   ├── pipeline/       # /pipeline (Kanban Board)
│   │   │   │   └── [dealId]/   # /pipeline/:dealId (Proposal Studio)
│   │   │   └── settings/       # /settings (Org Profile & Team)
│   ├── components/             # Reusable UI Components
│   │   ├── ui/                 # Shadcn base components (Button, Modal, etc.)
│   │   ├── shared/             # Navbar, Sidebar, PageHeader
│   │   ├── signals/            # SignalCard, SignalFilter, MatchDrawer
│   │   ├── pipeline/           # KanbanBoard, KanbanColumn, DealCard
│   │   └── proposal/           # ProposalEditor, PitchOutlineViewer, ExportButton
│   ├── hooks/                  # Custom React hooks (useSignals, useDeals, etc.)
│   ├── lib/                    # API Client Axios/Fetch, Auth helper, Utils
│   ├── types/                  # TypeScript interfaces & API response contracts
│   └── styles/                 # Global styles & Tailwind configs
├── package.json
└── tsconfig.json
```