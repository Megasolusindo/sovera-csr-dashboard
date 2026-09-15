import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://csrmatics.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/untuk-korporasi',
          '/untuk-ngo',
          '/database-perusahaan',
          '/database-perusahaan/*',
          '/perusahaan/*',
          '/program/*',
          '/regulasi/*',
          '/blog',
          '/blog/*',
          '/pricing',
        ],
        disallow: [
          '/dashboard',
          '/login',
          '/settings',
          '/chat',
          '/pipeline',
          '/programs',
          '/signals',
          '/corporates',
          '/api/*',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
