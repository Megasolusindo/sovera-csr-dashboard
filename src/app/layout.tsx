import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/components/providers/query-provider";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://csrmatics.com"),
  title: {
    default: "CSRmatics | Platform Kemitraan CSR & TJSL Berbasis AI",
    template: "%s | CSRmatics",
  },
  description:
    "Hubungkan alokasi dana CSR korporasi BUMN & Tbk dengan program sosial NGO terverifikasi. Akselerasi kemitraan berdampak selaras ESG, SDGs, dan standar syariah.",
  keywords: [
    "CSR platform",
    "TJSL BUMN",
    "kemitraan NGO",
    "dana CSR",
    "ESG Indonesia",
    "penyaluran zakat perusahaan",
    "proposal CSR",
    "CSR intelligence",
    "Yayasan",
    "Filantropi",
  ],
  authors: [{ name: "CSRmatics Team", url: "https://csrmatics.com" }],
  creator: "CSRmatics",
  publisher: "CSRmatics",
  openGraph: {
    title: "CSRmatics | Platform Kemitraan CSR & TJSL Berbasis AI",
    description:
      "Platform dua arah yang mempertemukan korporasi dan NGO untuk merealisasikan program keberlanjutan secara presisi, terverifikasi, dan akuntabel.",
    url: "https://csrmatics.com",
    siteName: "CSRmatics",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://csrmatics.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CSRmatics - 2-Sided CSR Partnership Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CSRmatics | Platform Kemitraan CSR & TJSL Berbasis AI",
    description:
      "Akselerasi kemitraan CSR korporasi dan lembaga sosial berbasis AI dan verifikasi data.",
    images: ["https://csrmatics.com/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD Structured Data Schemas (Organization, WebSite, SoftwareApplication)
const jsonLdSchemas = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://csrmatics.com/#organization",
      "name": "CSRmatics",
      "url": "https://csrmatics.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://csrmatics.com/opengraph-image",
      },
      "sameAs": [
        "https://www.linkedin.com/company/csrmatics",
        "https://twitter.com/csrmatics"
      ],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchemas) }}
        />
      </head>
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
