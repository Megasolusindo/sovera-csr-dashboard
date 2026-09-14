import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/components/providers/query-provider";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://csrmatics.com"),
  title: "CSRmatics | Platform CSR & TJSL untuk Korporasi dan NGO",
  description:
    "Platform CSR dan TJSL dua arah yang mempertemukan perusahaan dengan NGO melalui corporate intelligence, AI matching, dan direktori program sosial terverifikasi.",
  keywords: [
    "CSR",
    "TJSL",
    "ESG",
    "SDGs",
    "Platform CSR",
    "Program CSR",
    "Kemitraan CSR",
    "Pendanaan NGO",
    "CSR Intelligence",
    "BUMN TJSL",
    "Yayasan",
    "Filantropi",
  ],
  authors: [{ name: "CSRmatics Team", url: "https://csrmatics.com" }],
  creator: "CSRmatics",
  publisher: "CSRmatics Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "CSRmatics | Platform CSR & TJSL untuk Korporasi dan NGO",
    description:
      "Platform CSR dan TJSL dua arah yang mempertemukan perusahaan dengan NGO melalui corporate intelligence, AI matching, dan direktori program sosial terverifikasi.",
    url: "https://csrmatics.com",
    siteName: "CSRmatics",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSRmatics | Platform CSR & TJSL untuk Korporasi dan NGO",
    description:
      "Platform CSR dan TJSL dua arah yang mempertemukan perusahaan dengan NGO melalui corporate intelligence, AI matching, dan direktori program sosial terverifikasi.",
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
      "logo": "https://csrmatics.com/icon.png",
      "sameAs": [
        "https://www.linkedin.com/company/csrmatics",
        "https://twitter.com/csrmatics"
      ],
      "description": "Enterprise B2B CSR Partnership & Intelligence Platform in Indonesia."
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
      "operatingSystem": "All",
      "applicationCategory": "BusinessApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "IDR"
      }
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
