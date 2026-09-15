import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Paket & Harga | CSRmatics Platform',
  description:
    'Pilih skema biaya langganan CSRmatics yang dirancang khusus untuk Lembaga Sosial / NGO maupun Korporasi & Unit TJSL.',
  alternates: {
    canonical: 'https://csrmatics.com/pricing',
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
