import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/components/providers/query-provider";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "CSRmatics — CSR Intelligence & Partnership Platform",
  description: "Two-Sided CSR Intelligence & Partnership Platform connecting humanitarian organizations with companies that create social impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen">
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

