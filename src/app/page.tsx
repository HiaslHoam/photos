import dynamic from 'next/dynamic';
import './globals.css';
import { getAlbums, getSiteConfig } from '@/lib/api';

const Globe = dynamic(() => import('@/lib/globes/globe'), {
  ssr: false
});

export default async function Page() {
  try {
    const [albums, config] = await Promise.all([getAlbums(), getSiteConfig()]);

    return (
      <main role="main">
        <Globe albums={albums} name={config.name} />
      </main>
    );
  } catch (error) {
    console.error('Error loading page data:', error);
    return (
      <main role="main">
        <div>Error loading page. Check console for details.</div>
      </main>
    );
  }
}
