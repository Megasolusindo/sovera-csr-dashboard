# Dokumentasi Strategi & Implementasi SEO CSRmatics.com

**CSRmatics** — *Two-Sided CSR Intelligence & Partnership Platform* (Corporate ↔ NGO).

Dokumen ini merupakan panduan komprehensif yang mengonsolidasikan audit teknis, strategi Programmatic SEO, standar Schema.org JSON-LD, serta arsitektur metadata publik untuk mendominasi kata kunci organik CSR, TJSL, ESG, dan Filantropi B2B di Indonesia.

---

## 1. Audit Teknis & Evaluasi Baseline

### **Nilai Evaluasi Baseline: 7 / 10**

| Area Audit | Status | Nilai | Detail Evaluasi |
| :--- | :---: | :---: | :--- |
| **Crawlability & Indexing** | 🟢 Terkonfigurasi | 9/10 | Dynamic `robots.ts` & `sitemap.ts` (39 rute SSG/statis). |
| **Homepage Content & Semantic** | 🟢 Sangat Bagus | 9/10 | Tagline *"Where CSR Meets Impact"*, H1/H2 terstruktur 2 arah. |
| **Keyword Intent Separation** | 🟢 Terpisah | 9/10 | Landing page persona `/untuk-korporasi` & `/untuk-ngo`. |
| **Programmatic Directory SEO** | 🟢 Terimplementasi | 9/10 | Rute profil `/perusahaan/[slug]` & `/program/[kategori]/[slug]`. |
| **Structured Data (Schema.org)** | 🟢 Lengkap | 9.5/10 | JSON-LD `Organization`, `SoftwareApplication`, `BreadcrumbList`, `Article`. |
| **Social Share OpenGraph** | 🟢 Ter-optimasi | 9.5/10 | Dynamic Edge `opengraph-image` (1200x630 px) & Twitter Cards. |
| **E-E-A-T & Trust Signals** | 🟢 Terverifikasi | 8.5/10 | Timestamp `Last Updated` & transparansi sumber data (Annual Report, BEI). |

---

## 2. Strategi Programmatic SEO

CSRmatics memiliki aset data yang sangat bernilai: **3.000+ Korporasi** dan **1.200+ Program NGO/Lembaga Sosial**. Data tersebut dipublikasikan secara terstruktur dan ter-index tanpa menghalangi alokasi aplikasi internal.

```text
                     CSRmatics (csrmatics.com)
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   For Corporates     For NGOs     Programmatic SEO
        │                │                │
 /untuk-korporasi   /untuk-ngo      ┌─────┼─────────────┐
                                    │     │             │
                               Company Program      Regulasi
                                    │     │             │
                           /perusahaan  /program    /regulasi
```

### **A. Rute Publik Profil Perusahaan (`/perusahaan/[slug]`)**
- **Format URL:** `https://csrmatics.com/perusahaan/[slug]` (misal: `/perusahaan/bca`, `/perusahaan/pertamina`, `/perusahaan/telkom-indonesia`).
- **Target Search Intent:** `"Program CSR PT XYZ"`, `"Alokasi TJSL Bank ABC"`, `"Proposal CSR BCA"`.
- **Elemen Konten Unik:** Profil Korporasi, Pilar Utama CSR & Klasifikasi Fiqh Asnaf, Program Sosial Aktif, Tata Cara Pengajuan Proposal, Sinyal Trust E-E-A-T (*Data Sources* & *Last Updated*).

### **B. Rute Publik Program NGO (`/program/[kategori]/[slug]`)**
- **Format URL:** `https://csrmatics.com/program/[kategori]/[slug]` (misal: `/program/pendidikan/beasiswa-coding-anak-desa`, `/program/lingkungan/restorasi-mangrove-pesisir`).
- **Target Search Intent:** `"Proposal beasiswa CSR"`, `"Program CSR lingkungan Jawa Barat"`, `"Mitra CSR stunting"`.
- **Elemen Konten Unik:** Judul Program, Rincian Anggaran Biaya (RAB), Profil NGO Pengelola, Lencana Verifikasi, dan CTA *Mulai Kemitraan CSR*.

### **C. Knowledge Base & Pillar Pages (`/regulasi/[slug]`)**
- **Format URL:** `https://csrmatics.com/regulasi/[slug]` (misal: `/regulasi/permen-bumn-tjsl`, `/regulasi/esg-pojk-51`, `/regulasi/fiqh-asnaf-csr`).
- **Target Search Intent:** Kata kunci dengan *high B2B intent* dari Manajer CSR/TJSL BUMN & pimpinan yayasan.

---

## 3. Spesifikasi Schema.org JSON-LD & Metadata Standard

### **A. Root Metadata (`src/app/layout.tsx`)**
```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://csrmatics.com'),
  title: {
    default: 'CSRmatics | Platform Kemitraan CSR & TJSL Berbasis AI',
    template: '%s | CSRmatics',
  },
  description:
    'Hubungkan alokasi dana CSR korporasi BUMN & Tbk dengan program sosial NGO terverifikasi. Akselerasi kemitraan berdampak selaras ESG, SDGs, dan standar syariah.',
  keywords: [
    'CSR platform',
    'TJSL BUMN',
    'kemitraan NGO',
    'dana CSR',
    'ESG Indonesia',
    'penyaluran zakat perusahaan',
    'proposal CSR',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'CSRmatics | Platform Kemitraan CSR & TJSL Berbasis AI',
    description:
      'Platform dua arah yang mempertemukan korporasi dan NGO untuk merealisasikan program keberlanjutan secara presisi, terverifikasi, dan akuntabel.',
    url: 'https://csrmatics.com',
    siteName: 'CSRmatics',
    images: [
      {
        url: 'https://csrmatics.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'CSRmatics - 2-Sided CSR Partnership Platform',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSRmatics | Platform Kemitraan CSR & TJSL Berbasis AI',
    description:
      'Akselerasi kemitraan CSR korporasi dan lembaga sosial berbasis AI dan verifikasi data.',
    images: ['https://csrmatics.com/opengraph-image'],
  },
};
```

### **B. JSON-LD Structured Data Schema (`src/app/layout.tsx`)**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://csrmatics.com/#organization",
      "name": "CSRmatics",
      "url": "https://csrmatics.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://csrmatics.com/opengraph-image"
      },
      "description": "Platform intelijen dan kemitraan CSR dua arah berbasis AI untuk korporasi dan NGO."
    },
    {
      "@type": "WebSite",
      "@id": "https://csrmatics.com/#website",
      "url": "https://csrmatics.com",
      "name": "CSRmatics",
      "publisher": {
        "@id": "https://csrmatics.com/#organization"
      },
      "inLanguage": "id-ID"
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://csrmatics.com/#software",
      "name": "CSRmatics Platform",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "IDR",
        "lowPrice": "0",
        "offerCount": "3"
      },
      "featureList": [
        "Real-Time Corporate Signal Feed",
        "Verified NGO Program Catalog",
        "AI Bidirectional Match Engine",
        "Direktori 3.000+ Korporasi & 1.200+ NGO",
        "ESG & Fiqh Asnaf Compliance Alignment"
      ]
    }
  ]
}
```

---

## 4. Crawlability & Indexing Control

### **A. Generator `robots.ts` (`src/app/robots.ts`)**
- **Halaman yang Diizinkan (`Allow`):** `/`, `/untuk-korporasi`, `/untuk-ngo`, `/database-perusahaan`, `/perusahaan/*`, `/program/*`, `/regulasi/*`, `/pricing`.
- **Halaman yang Diblokir (`Disallow`):** `/dashboard`, `/login`, `/settings`, `/chat`, `/pipeline`, `/api/*`.

### **B. Generator `sitemap.ts` (`src/app/sitemap.ts`)**
Mendaftarkan secara otomatis seluruh rute publik statis dan SSG (39+ halaman) dengan prioritas `1.0` (Homepage), `0.9` (Persona & Directory Hub), dan `0.8` (Individual Profiles & Programs).

---

## 5. Peta Jalan & Prioritas Implementasi

```
[ P0: Technical Baseline ] ──► [ P1: Persona & Programmatic SEO ] ──► [ P2: Content Clusters ] ──► [ P3: Authority & Backlinks ]
       (SELESAI)                          (SELESAI)                       (DALAM PROSES)                (TAHAP LANJUTAN)
```

- **P0 (SELESAI):** Root Metadata, OpenGraph Image 1200x630 Edge Route, `robots.ts`, `sitemap.ts`, JSON-LD `Organization` & `SoftwareApplication` Schema, `noindex` pada area internal app.
- **P1 (SELESAI):** Halaman Persona `/untuk-korporasi` & `/untuk-ngo`, Directory Hub `/database-perusahaan`, Profil Perusahaan `/perusahaan/[slug]`, Detail Program `/program/[kategori]/[slug]`, dan Knowledge Base `/regulasi/[slug]`.
- **P2 (Langkah Berikutnya):** Pengembangan Klaster Konten Artikel Edukatif (CSR vs TJSL, Sertifikasi ESG POJK 51, Strategi Proposal B2B).
- **P3 (Langkah Lanjutan):** Kemitraan Digital Authority, Rilis Pers Media, & Integrasi Backlink Industri.

---

*Terakhir Diperbarui: 15 September 2026 | CSRmatics Platform Engineering Team*
