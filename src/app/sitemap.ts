import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://csrmatics.com';

  const companySlugs = [
    'bca',
    'bri',
    'bank-mandiri',
    'pertamina',
    'telkom-indonesia',
    'pln',
    'adaro-energy',
    'astra-international',
  ];

  const programRoutes = [
    { kategori: 'pendidikan', slug: 'beasiswa-coding-anak-desa' },
    { kategori: 'lingkungan', slug: 'restorasi-mangrove-pesisir' },
    { kategori: 'kesehatan', slug: 'posyandu-pencegahan-stunting' },
    { kategori: 'ekonomi-umkm', slug: 'pembinaan-usaha-mikro-wanita' },
  ];

  const regulasiSlugs = [
    'permen-bumn-tjsl',
    'esg-pojk-51',
    'fiqh-asnaf-csr',
  ];

  const companyDbUrls = companySlugs.map((slug) => ({
    url: `${baseUrl}/database-perusahaan/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const companyShortUrls = companySlugs.map((slug) => ({
    url: `${baseUrl}/perusahaan/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const programUrls = programRoutes.map((prog) => ({
    url: `${baseUrl}/program/${prog.kategori}/${prog.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const regulasiUrls = regulasiSlugs.map((slug) => ({
    url: `${baseUrl}/regulasi/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/untuk-korporasi`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/untuk-ngo`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/database-perusahaan`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...companyShortUrls,
    ...companyDbUrls,
    ...programUrls,
    ...regulasiUrls,
  ];
}
