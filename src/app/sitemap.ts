import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://csrmatics.com';

  const sampleCompanySlugs = [
    'bca',
    'bri',
    'bank-mandiri',
    'pertamina',
    'telkom-indonesia',
    'pln',
    'adaro-energy',
    'astra-international',
  ];

  const companyUrls = sampleCompanySlugs.map((slug) => ({
    url: `${baseUrl}/database-perusahaan/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
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
    ...companyUrls,
  ];
}
