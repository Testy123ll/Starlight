import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Starlight de Prince',
    short_name: 'Starlight',
    description: 'Leading Construction Materials Supplier in Nigeria',
    start_url: '/',
    display: 'standalone',
    background_color: '#131313',
    theme_color: '#D97706',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
