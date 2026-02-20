import { z } from 'zod';

export const SiteConfigSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  siteUrl: z.string(),
  bio: z.string(),
  siteDescription: z.string(),
  githubUrl: z.string().nullable(),
  personalSiteUrl: z.string().nullable(),
  imageQuality: z.number().nullable(),
  metaImage: z
    .object({
      url: z.string(),
      width: z.number().nullable(),
      height: z.number().nullable()
    })
    .nullable()
});

export type SiteConfig = z.infer<typeof SiteConfigSchema>;
