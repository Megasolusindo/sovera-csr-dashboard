# Sovera Web Dashboard (`sovera-web-dashboard`)

> Enterprise B2B Fundraising Intelligence & Deal-Preparation Web Dashboard for Islamic Philanthropy (LAZNAS/BMT), NGOs, and Higher Education Endowments.

---

## 1. Project Overview

**Sovera Web Dashboard** adalah antarmuka berbasis web modern untuk platform **Sovera (FundIQ)**. Aplikasi ini memungkinkan tim kemitraan dan *fundraiser* korporasi untuk:
* Mengeksplorasi sinyal pasar CSR, TJSL BUMN, dan Zakat Korporasi yang diekstrak secara otomatis oleh AI.
* Melihat kecocokan semantik (*semantic vector matching*) antara program lembaga dan fokus ESG perusahaan target secara instan.
* Mengelola prospek kemitraan melalui papan interaktif Kanban (*B2B Deal Pipeline*).
* Menyusun naskah penawaran (*Executive Ice-Breaker*, *Pitch Deck Outline*, dan *Full Narrative Proposal*) di *Proposal Studio* serta mengekspornya langsung ke format `.docx` atau `.pdf`.

---

## 2. Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router, React Server Components)
* **Language:** TypeScript (Strict Type Checking)
* **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/) (Radix UI Primitives)
* **Data Fetching & Cache:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Proposal Studio:** Tiptap Editor / Markdown WYSIWYG + DOMPurify
* **Pipeline Management:** `@hello-pangea/dnd` (Kanban Drag & Drop)
* **Charts & Visualizations:** Recharts / Tremor
* **HTTP Client:** Axios with centralized JWT & token handling

---

## 3. Repository Structure

```text
sovera-web-dashboard/
├── docs/
│   ├── PRD_FRONTEND.md              # Product Requirements Document
│   ├── UI_SPEC.md                   # Design system, themes & UI states
│   └── API_INTEGRATION_GUIDE.md     # API client, TypeScript contracts & query hooks
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── (auth)/                  # Login & authentication pages
│   │   ├── (dashboard)/             # Authenticated workspace layout
│   │   │   ├── layout.tsx           # Sidebar & Topbar shell
│   │   │   ├── page.tsx             # /dashboard (Executive overview & KPI metrics)
│   │   │   ├── signals/             # /signals (Corporate intelligence feeds & filters)
│   │   │   ├── programs/            # /programs (Institution program portfolio CRUD)
│   │   │   ├── pipeline/            # /pipeline (Kanban board)
│   │   │   │   └── [dealId]/        # /pipeline/:dealId (Proposal Studio)
│   │   │   └── settings/            # /settings (Organization profile & team)
│   │   ├── favicon.ico
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                      # Primitive Shadcn components (Button, Modal, Input)
│   │   ├── shared/                  # Navigation bar, Sidebar, User avatar, Metric cards
│   │   ├── signals/                 # SignalCard, SignalFilterBar, MatchDrawer
│   │   ├── pipeline/                # KanbanBoard, KanbanColumn, DealCard
│   │   └── proposal/                # ProposalEditor, PitchOutlineViewer, FileExportButton
│   ├── hooks/                       # TanStack Query custom hooks (useSignals, useDeals, etc.)
│   ├── lib/                         # API client, Axios interceptors, Auth helpers & File downloaders
│   ├── types/                       # TypeScript interfaces matching backend API specs
│   └── styles/                      # Tailwind configuration & design tokens
├── .antigravityrules                 # AntiGravity / Cursor AI assistant instructions
├── CLAUDE.md                        # Claude Code context and guidelines
├── .env.example                     # Environment variables template
├── package.json
└── tsconfig.json
```

---

## 4. Getting Started (Local Development)

### 4.1 Prerequisites

* Node.js v20.x or higher
* npm, pnpm, or yarn
* Running instance of `sovera-core-api` (Backend API)

### 4.2 Installation

Clone repositori dan pasang seluruh dependensi:

```bash
git clone <repository-url> sovera-web-dashboard
cd sovera-web-dashboard
npm install
```

### 4.3 Environment Configuration

Salin berkas konfigurasi template `.env.example` menjadi `.env.local`:

```bash
cp .env.example .env.local
```

Sesuaikan nilai variabel lingkungan:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_APP_ENV=development
```

### 4.4 Run Development Server

Jalankan server pengembangan lokal:

```bash
npm run dev
```

Buka peramban di `http://localhost:3000`.

---

## 5. Build & Quality Scripts

* **Build Production:** `npm run build`
* **Run Production Server:** `npm run start`
* **Linting & Formatting:** `npm run lint`
* **Type Checking:** `npx tsc --noEmit`

---

## 6. Architecture & Security Highlights

* **Enterprise Tenant Isolation:** Sesi organisasi pengguna diikat langsung melalui token JWT yang valid. Seluruh request mutasi atau pencarian program lembaga berjalan otomatis di bawah isolasi tenant backend.
* **Optimistic Kanban Updates:** Perubahan tahapan status prospek pada Kanban board langsung diperbarui di UI secara instan dan otomatis di-*rollback* jika server mengembalikan kegagalan request.
* **Safe Content Rendering:** Seluruh naskah Markdown dan HTML yang digenerate oleh AI melalui Proposal Studio disanitasi menggunakan pustaka DOMPurify sebelum dirender ke DOM peramban.

---

## 7. Documentation Index

* **[PRD_FRONTEND.md](file:///Users/mluludk/Works/sovera-csr-dashboard/docs/PRD_FRONTEND.md):** Rincian kebutuhan fungsional & user persona.
* **[UI_SPEC.md](file:///Users/mluludk/Works/sovera-csr-dashboard/docs/UI_SPEC.md):** Panduan palet warna, tipografi, breakpoint, dan status UI.
* **[API_INTEGRATION_GUIDE.md](file:///Users/mluludk/Works/sovera-csr-dashboard/docs/API_INTEGRATION_GUIDE.md):** Kamus tipe data TypeScript dan contoh hooks React Query.

---

## 8. License

Proprietary & Confidential. All rights reserved.
