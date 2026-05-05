import { MetadataRoute } from 'next';
import countriesData from '@/data/countries.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://remotetaxhub.com';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // Dynamic country pages
  const countryPages = countriesData.map((country) => ({
    url: `${baseUrl}/country/${country.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...countryPages];
}
