'use client';

import { useLightbox } from '@/hooks/use-lightbox';
import { useWindowSize } from '@/hooks/use-window-size';
import { Photo } from '@/types';
import { useEffect } from 'react';
import { withQuality } from './utils';

function PigGrid({
  items,
  quality
}: {
  items: Array<Photo>;
  quality?: number;
}) {
  useLightbox(items, quality);

  const { width } = useWindowSize();

  useEffect(() => {
    const data = items.map(item => {
      return { filename: item.url, aspectRatio: item.width / item.height };
    });

    const options = {
      containerId: 'pig',
      classPrefix: 'pig',
      spaceBetweenImages: 12,
      transitionSpeed: 500,
      primaryImageBufferHeight: 1000,
      secondaryImageBufferHeight: 300,
      urlForSize: function (filename: string, size: number) {
        return withQuality(filename, quality);
      },
      createElement: function (url: string) {
        // PhotoSwipe elements
        const item = items.find(item => item.url == url) as Photo;
        const anchor = document.createElement('a');
        anchor.href = withQuality(url, quality);
        anchor.setAttribute('data-pswp-width', item.width.toString());
        anchor.setAttribute('data-pswp-height', item.height.toString());
        anchor.target = '_blank';
        anchor.rel = 'noreferrer';
        const img = document.createElement('img');
        img.src = withQuality(url, quality);
        img.alt = '';
        return anchor;
      },
      getMinAspectRatio: function (lastWindowWidth: number) {
        if (lastWindowWidth <= 1920) {
          return 1;
        } else if (lastWindowWidth <= 2560) {
          return 1.5;
        } else {
          return 2;
        }
      },
      getImageSize: function (lastWindowWidth: number) {
        if (lastWindowWidth <= 1920) {
          return 400;
        } else if (lastWindowWidth <= 2560) {
          return 350;
        } else {
          return 300;
        }
      }
    };

    const pigGrid = new window.Pig(data, options);
    pigGrid.enable();

    return () => {
      if (pigGrid) pigGrid.disable();
      const pigElement = document.getElementById('pig');
      if (pigElement) pigElement.innerHTML = '';
    };
  }, [items, width]);

  const isMobile = width && width <= 640;

  return (
    <section className="w-full min-h-[512px] mb-32" id="gallery">
      <div id="pig" className="mx-auto max-sm:hidden" />

      {isMobile && (
        <div className="flex flex-col gap-2">
          {items.map(item => (
            <a
              key={item.url}
              data-pwsp-width={item.width}
              data-pwsp-height={item.height}
              target="_blank"
              rel="noreferrer"
            >
              <img src={withQuality(item.url, quality)} alt="" />
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

export default PigGrid;
