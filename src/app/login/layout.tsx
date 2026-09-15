import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Masuk Sesi | CSRmatics Platform',
  description:
    'Masuk ke portal dashboard CSRmatics untuk Korporasi, Tim TJSL, dan Lembaga Sosial / NGO.',
  alternates: {
    canonical: 'https://csrmatics.com/login',
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
