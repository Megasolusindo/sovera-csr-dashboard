Berikut adalah implementasi konfigurasi SEO dan Schema.org JSON-LD standar Next.js (App Router).

---

### 1. File Metadata Root (`app/layout.tsx` atau `app/page.tsx`)

Implementasikan objek `metadata` bawaan Next.js untuk menangani meta tag, OpenGraph (pratinjau WhatsApp & LinkedIn), canonical URL, dan indeksasi crawler:

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
  authors: [{ name: 'CSRmatics' }],
  creator: 'CSRmatics',
  publisher: 'CSRmatics',
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
        url: '/og-image.png', // Letakkan gambar 1200x630 px di folder public/
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
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

```

---

### 2. Schema.org JSON-LD (`app/layout.tsx` atau komponen Landing Page)

Tambahkan skema kombinasi `Organization` dan `SoftwareApplication` agar Google memahami entitas bisnis dan fitur platform CSRmatics:

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://csrmatics.com/#organization',
        name: 'CSRmatics',
        url: 'https://csrmatics.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://csrmatics.com/logo.png', // Ganti dengan path logo aktual
        },
        description:
          'Platform intelijen dan kemitraan CSR dua arah berbasis AI untuk korporasi dan NGO.',
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://csrmatics.com/#software',
        name: 'CSRmatics Platform',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'IDR',
          lowPrice: '0',
          offerCount: '2',
        },
        featureList: [
          'Real-Time Corporate Signal Feed',
          'Verified NGO Program Catalog',
          'AI Bidirectional Match Engine',
          'Direktori 3.000+ Korporasi & 1.200+ NGO',
          'ESG & Fiqh Asnaf Compliance Alignment',
        ],
      },
    ],
  };

  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

```

---

### 3. File Generator Dinamis Next.js

Buat dua file ini di root folder `app/` agar crawler langsung mendeteksi sitemap tanpa hambatan perizinan:

* **`app/robots.ts`**
```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://csrmatics.com/sitemap.xml',
  };
}

```


* **`app/sitemap.ts`**
```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://csrmatics.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}

```