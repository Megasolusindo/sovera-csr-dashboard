# UI/UX Specification Document (UI_SPEC.md)

**Product Name:** Sovera Web Dashboard (`sovera-web-dashboard`)  
**Target Platform:** Web (Desktop-First, Tablet & Mobile Adaptive)  
**Design Theme:** Modern Enterprise Islamic Philanthropy & Intelligence  
**Document Version:** 1.0  

---

## 1. Design Principles & Theme Foundation

### 1.1 Core Design Pillars
1. **Intelligence Clarity:** Menampilkan data riset CSR dan BEI yang padat secara visual tanpa membuat pengguna kewalahan (*cognitive overload*).
2. **Action-Oriented Workflows:** Setiap wawasan (*insight*) langsung menyediakan tombol aksi (misal: *Match Program*, *Generate Proposal*, *Claim to Pipeline*).
3. **Enterprise & Sharia Elegance:** Nuansa profesional institusional dengan palet warna bernuansa ketenangan, akuntabilitas, dan filantropi Islam modern.

### 1.2 Color Palette & Semantic Tokens
* **Base Background:** Neutral Slate 50 (`#F8FAFC`) / White (`#FFFFFF`)
* **Primary (Islamic Philanthropy / Growth):** Deep Emerald (`#047857` / `emerald-700`), Emerald Focus (`#059669` / `emerald-600`)
* **Secondary / Neutral:** Slate 900 (`#0F172A`), Slate 600 (`#475569`), Slate 200 (`#E2E8F0`)
* **Intent Badges & Semantic Status:**
  * **High Intent (80 - 100):** Emerald Green Badge (`bg-emerald-50 text-emerald-700 border-emerald-200`)
  * **Medium Intent (50 - 79):** Amber / Warm Gold Badge (`bg-amber-50 text-amber-700 border-amber-200`)
  * **Low Intent (< 50):** Slate / Neutral Gray Badge (`bg-slate-100 text-slate-600 border-slate-200`)
  * **Destructive / Lost:** Rose / Crimson (`bg-rose-50 text-rose-700 border-rose-200`)

### 1.3 Typography
* **Font Family:** `Inter`, `Plus Jakarta Sans`, atau `Geist Sans`
* **Hierarchy:**
  * **Page Titles:** `text-2xl font-bold tracking-tight text-slate-900`
  * **Section Headers:** `text-lg font-semibold text-slate-800`
  * **Card Titles / Subheadings:** `text-sm font-medium text-slate-600`
  * **Body Text:** `text-sm text-slate-700 leading-relaxed`
  * **Captions / Meta:** `text-xs text-slate-400`

---

## 2. Global Layout & Navigation Architecture

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ [Logo] Sovera     [Tenant: LAZ Peduli Ummat ▼]      [User Avatar / Role]│ (Top Header)
├──────────────┬──────────────────────────────────────────────────────────┤
│ 📊 Overview  │                                                          │
│ 📡 Signals   │                     MAIN CONTENT AREA                    │
│ 📚 Programs  │                                                          │
│ 🎯 Pipeline  │  (Renders Dashboard, Signals Feed, Kanban, or Studio)    │
│ ⚙️ Settings  │                                                          │
├──────────────┤                                                          │
│ [Logout]     │                                                          │
└──────────────┴──────────────────────────────────────────────────────────┘
 (Sidebar Nav)
```

- **Sidebar Navigation:** Lebar tetap 256px (`w-64`), status rute aktif ditandai dengan latar hijau lembut (`bg-emerald-50 text-emerald-700 font-semibold border-r-2 border-emerald-600`).
- **Top Header:** Menampilkan logo instansi penyewa (tenant identifier), status koneksi real-time, tombol notifikasi, dan profil pengguna aktif.

---

## 3. Screen Specifications & Interaction Details

### 3.1 Screen 1: Executive Overview (`/dashboard`)
* **Layout:** Grid 4-kolom untuk KPI Cards di bagian atas, diikuti 2-kolom untuk Chart dan Quick Feed.
* **Component Breakdown:**
  * **MetricCard:** Menampilkan angka nominal dengan format Rupiah (`Rp 1.250.000.000`), tren persentase bulanan (`+12.4%`), dan ikon pendukung.
  * **SectorDistributionChart:** Donut Chart (Recharts) dengan tooltip interaktif.
  * **ConversionFunnelChart:** Bar chart horisontal yang memvisualisasikan konversi deal dari tahap `DISCOVERED` hingga `CLOSED_WON`.
  * **HighIntentFeedWidget:** 5 kartu prospek terbaru dengan tombol cepat *"View Match"*.

---

### 3.2 Screen 2: Corporate Intelligence Feed (`/signals`)
* **Layout:** 1 Kolom Filter Bar + Infinite Scroll / Paginated Card Grid.
* **Interactive Elements:**
  * **Filter Bar:** Multi-select dropdown sektor industri, slider Intent Score (0–100), filter pilar ESG, dan input pencarian teks bebas.
  * **SignalCard:**
    * **Baris Atas:** Nama Korporasi + Badge Sektor + Badge Intent Score.
    * **Baris Tengah:** Ringkasan narasi 2–3 baris (multi-line truncated).
    * **Baris Bawah:** Tag Pilar CSR (misal: Pendidikan, Kesehatan 3T), Estimasi Anggaran, dan tombol *"Lihat Rekomendasi Program"*.
  * **Right Slide-over Drawer (`MatchDrawer`):**
    * Terbuka saat kartu diklik.
    * Menampilkan teks laporan sumber asli.
    * Menampilkan 3 kartu *Matched Program* secara otomatis dengan animasi Circular Progress Meter persentase keselarasan (misal: `89% Match`).
    * Tombol CTA: *"Buat Pitch & Masukkan Pipeline"*.

---

### 3.3 Screen 3: Institution Program Manager (`/programs`)
* **Layout:** Tabel Master Data + Modal Tambah/Edit Program.
* **Interactive Elements:**
  * Tombol *"Tambah Program Unggulan"*.
  * **Modal Form:**
    * **Judul Program:** Input Text.
    * **Kategori Asnaf:** Select 8 Asnaf (*Fakir, Miskin, Amil, Riqab, Gharimin, Mualaf, Fisabilillah, Ibnu Sabil*).
    * **Pilar ESG / SDGs:** Multi-select.
    * **Target Penerima & Wilayah:** Input Text.
    * **Deskripsi Narasi Lengkap:** Textarea / Rich Editor.
  * **Status Badge pada tabel:** `Embedding Generated` (Hijau) / `Syncing...` (Kuning berkedip).

---

### 3.4 Screen 4: B2B Deal Pipeline / Kanban Board (`/pipeline`)
* **Layout:** Horizontal Scrollable Kanban Board dengan 6 Kolom Status.
* **Drag-and-Drop Interaction:**
  * Drag kartu prospek antar-kolom memicu *Optimistic UI Update* (kartu berpindah seketika di UI sembari mengirim mutasi status di latar belakang).
  * Jika API gagal, kartu otomatis kembali ke kolom asal dengan pesan Toast Error.
* **KanbanCard:**
  * **Header:** Nama Korporasi + Nilai Estimasi (Rp).
  * **Body:** Tag Program Lembaga yang dipasangkan.
  * **Footer:** Avatar PIC Fundraiser + Tanggal Terakhir Diperbarui.

---

### 3.5 Screen 5: Deal Workspace & Proposal Studio (`/pipeline/:dealId`)
* **Layout:** Split-Pane 2 Kolom (Kolom Kiri: Ringkasan Intelijen Korporasi, Kolom Kanan: AI Workspace Tabbed Area).
* **Workspace Tabs:**
  * **Tab 1: Strategic Ice-Breaker:** Tampilan kartu teks siap-salin dengan tombol *"Copy to Clipboard"* (disertai feedback toast *"Naskah berhasil disalin"*).
  * **Tab 2: Pitch Deck Outline:** Tampilan accordion interaktif berisi 5 struktur slide presentasi.
  * **Tab 3: Rich Proposal Editor:**
    * **Toolbar:** Bold, Italic, Heading 1-3, Bullet List, Table, Variable Inserter.
    * **Area Teks:** WYSIWYG Editor dengan auto-save setiap 5 detik (indikator *"Saved to cloud"* di sudut kanan atas).
    * **Floating Action Bar:** Tombol *"Regenerate Section via AI"*, *"Export Word (.docx)"*, dan *"Export PDF"*.
  * **Tab 4: Activity & Internal Notes:** Catatan hasil audiensi dan histori pemindahan status.

---

## 4. State Lifecycle & UX Feedback Standards

### 4.1 Loading States
* **Initial Page Load:** Gunakan *Skeleton Shimmer* yang menyerupai bentuk kartu asli, hindari pemakaian spinner layar penuh yang memblokir tampilan (*no full-screen blocking spinner*).
* **AI Proposal Generation in Progress:** Tampilkan modal atau progress bar bertahap:
  * **Step 1/3:** Menganalisis laporan keberlanjutan emiten... (*Done*)
  * **Step 2/3:** Menyelaraskan dengan pilar program asnaf... (*In Progress*)
  * **Step 3/3:** Menyusun naskah narasi dan tabel RAB...

### 4.2 Error Handling & Toasts
* **Network / API Timeout:** Tampilkan banner peringatan di atas konten dengan tombol *"Coba Lagi (Retry)"*.
* **Form Validation:** Validasi instan di level field (*inline error message*) berwarna merah Slate/Rose sebelum request dikirim ke backend.

---

## 5. Responsive Breakpoint Rules

| Breakpoint | Target Screen | Penyesuaian Layout |
| :--- | :--- | :--- |
| **`xl`** ($\ge 1280 \text{px}$) | Desktop Monitor | Layout penuh, Kanban Board 6 kolom terlihat berdampingan, Split-pane editor aktif. |
| **`md`** ($768 \text{px} - 1279 \text{px}$) | Tablet / iPad | Sidebar berubah menjadi mode ikon mini (*collapsed*), Kanban horizontal scroll penuh. |
| **`sm`** ($< 768 \text{px}$) | Mobile Phone | Sidebar menjadi Drawer Hamburger Menu, Proposal Studio menjadi tab bertumpuk vertikal. |