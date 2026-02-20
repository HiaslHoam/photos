export const IMAGE_QUALITY = 80;

/**
 * Appends Contentful's image quality parameter to a URL.
 * @see https://www.contentful.com/developers/docs/references/images-api/#/reference/resizing-&-cropping/specify-focus-area
 */
export function withQuality(url: string, quality = IMAGE_QUALITY): string {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}q=${quality}`;
}
