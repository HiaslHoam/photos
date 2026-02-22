import { z } from 'zod';

export const FolderNameSchema = z.string().brand<'FolderName'>();
export type FolderName = z.infer<typeof FolderNameSchema>;

export const FolderSchema = z.object({
  title: FolderNameSchema
});
export type Folder = z.infer<typeof FolderSchema>;
