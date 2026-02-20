import dynamic from 'next/dynamic';
import './globals.css';
import { getAlbums, getSiteConfig } from '@/lib/api';

const Globe = dynamic(() => import('@/lib/globes/globe'), {
  ssr: false
});

export default async function Page() {
  const [albums, config] = await Promise.all([getAlbums(), getSiteConfig()]);

  return (
    <main role="main">
      <Globe albums={albums} name={config.name} />
    </main>
  );
}
