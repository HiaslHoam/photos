import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { getSiteConfig } from '@/lib/api';

const sansSerifFont = localFont({
  src: '../fonts/TASAOrbiterVF.woff2',
  display: 'swap',
  variable: '--font-sans'
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  const imageUrl = config.metaImage?.url;

  return {
    title: config.name,
    description: config.tagline,
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
      ],
      apple: [{ url: '/apple-touch-icon.png' }],
      other: [
        {
          rel: 'android-chrome',
          url: '/android-chrome-192x192.png',
          sizes: '192x192'
        },
        {
          rel: 'android-chrome',
          url: '/android-chrome-512x512.png',
          sizes: '512x512'
        }
      ]
    },
    openGraph: {
      title: config.name,
      description: config.tagline,
      url: config.siteUrl,
      siteName: `${config.name}'s Photography Portfolio`,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              ...(config.metaImage?.width
                ? { width: config.metaImage.width }
                : {}),
              ...(config.metaImage?.height
                ? { height: config.metaImage.height }
                : {})
            }
          ]
        : [],
      locale: 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: config.name,
      description: config.tagline,
      ...(imageUrl ? { images: [imageUrl] } : {})
    }
  };
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sansSerifFont.variable} font-sans`}>
      <body>{children}</body>
    </html>
  );
}
