# Sovera Web Dashboard - Developer Context (Claude Code)

## Project Overview
Sovera Web Dashboard (`sovera-web-dashboard`) is the enterprise frontend application for the Sovera (FundIQ) B2B Fundraising Intelligence & Deal-Preparation Engine. It serves Islamic philanthropy institutions (LAZNAS/BMT), NGOs, and educational endowments to discover CSR/ESG funding opportunities, match them against institutional programs, and generate bespoke proposals.

## Tech Stack & Architecture
- **Framework:** Next.js (App Router, React Server Components)
- **Language:** TypeScript (Strict mode)
- **Styling & UI:** Tailwind CSS, Shadcn UI, Radix UI Primitives, Lucide React
- **Data Fetching & State:** TanStack Query (React Query) + Server Actions
- **Rich Text / Proposal Studio:** Tiptap Editor / Markdown WYSIWYG
- **Drag & Drop:** `@hello-pangea/dnd` / `dnd-kit` (Kanban Pipeline)
- **Charts & Data Viz:** Recharts / Tremor

## Strict Frontend Development Guidelines
1. **Server vs. Client Components:**
   - Keep page layouts and data-fetching scaffolding in React Server Components (RSC) whenever possible.
   - Use `'use client'` only on leaf components requiring browser interactivity (Kanban board, forms, rich-text editor, drawer filters).
2. **API Communication & Type Safety:**
   - All backend communication must pass through the centralized API client in `src/lib/api-client.ts`.
   - Never use raw `fetch()` calls without attaching Bearer JWT auth headers.
   - Strictly adhere to data contracts defined in `src/types/api.ts` (synced with backend `API_SPEC.md`).
3. **Multi-Tenancy & UI Isolation:**
   - The UI must treat tenant identity as immutable based on the logged-in user's JWT claim (`org_id`). Never provide organization-switching interfaces unless explicitly scoped for Super Admin roles.
4. **Optimistic UI Updates:**
   - Pipeline stage changes on the Kanban board must implement optimistic updates with automatic rollback on error.
5. **Sanitization:**
   - Always sanitize AI-generated Markdown and HTML output in the Proposal Studio before DOM rendering (using DOMPurify).

## Common Commands & Workflows
- **Dev Server:** `npm run dev` (starts on `http://localhost:3000`)
- **Build Production:** `npm run build`
- **Lint & Typecheck:** `npm run lint && npx tsc --noEmit`
- **Test:** `npm test`

## Directory Structure
- `src/app/(dashboard)/`: Authenticated dashboard routes (`/dashboard`, `/signals`, `/programs`, `/pipeline`)
- `src/components/ui/`: Primitive Shadcn components (Button, Modal, Input, Badge)
- `src/components/signals/`: Feed explorer, signal cards, and program-matching drawer
- `src/components/pipeline/`: Kanban board, stage columns, and deal cards
- `src/components/proposal/`: Proposal studio editor, ice-breaker cards, and export handlers
- `src/hooks/`: TanStack Query custom hooks (`useSignals`, `useDeals`, `useProgramMatch`)
- `src/lib/`: Axios/Fetch API client wrapper, auth helpers, and file download utilities
- `src/types/`: TypeScript interfaces and API response models