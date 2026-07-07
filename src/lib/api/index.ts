import { Client } from './client';
import { SiteConfig } from '@/types/site-config';

// Default local site configuration for development
const defaultLocalConfig: SiteConfig = {
  name: 'Photography Portfolio',
  tagline: 'Local Development',
  siteUrl: 'http://localhost:3000',
  bio: 'Local development configuration',
  siteDescription: 'Local development configuration',
  githubUrl: null,
  personalSiteUrl: null,
  imageQuality: null,
  metaImage: null
};

export async function getSiteConfig() {
  // Skip CMS when SKIP_CMS is set (for local development)
  if (process.env.SKIP_CMS === 'true') {
    return defaultLocalConfig;
  }

  const client = new Client();
  const data = await client.siteConfig.get();
  if (data.success) {
    const config = data.data.siteConfigCollection.items[0];
    if (process.env.NODE_ENV === 'development') {
      config.siteUrl = 'http://localhost:3000';
    }
    return config;
  }
  throw new Error('Failed to fetch site config');
}

export async function getAlbums() {
  const client = new Client();
  const data = await client.albums.get();
  if (data.success) {
    const albums = data.data.photoGalleryCollection.items;
    return [...albums].sort((a, b) => a.order - b.order);
  }
  throw new Error('Failed to fetch albums');
}

export async function getAlbum(slug: string) {
  const client = new Client();
  const data = await client.album(slug).get();
  if (data.success) {
    const album = data.data.photoGalleryCollection.items[0];
    const photos = album.photosCollection.items;
    return { album, photos };
  }
  throw new Error(`Failed to fetch album ${slug}`);
}

export async function getPhotos(tag: string) {
  const client = new Client();
  const data = await client.photos.findBy(tag);
  if (data.success) {
    const photos = data.data.assetCollection.items;
    return photos;
  }
  throw new Error(`Failed to fetch photos tagged '${tag}'`);
}

export async function getFolders() {
  const client = new Client();
  const data = await client.folders.get();
  if (data.success) {
    const folders = data.data.photoFoldersCollection.items;
    return folders;
  }
  throw new Error('Failed to fetch folders');
}

export async function getFolder(folder: string) {
  const client = new Client();
  const data = await client.folder(folder).get();
  if (data.success) {
    const folder = data.data.photoFoldersCollection.items[0];
    const photos = folder.photosCollection.items;
    return { folder, photos };
  }
  throw new Error(`Failed to fetch folder '${folder}'`);
}
