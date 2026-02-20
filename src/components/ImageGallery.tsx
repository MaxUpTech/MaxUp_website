'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightbox(src)}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer"
          >
            <Image src={src} alt={`Gallery image ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 end-6 text-white text-4xl leading-none hover:text-gray-200 cursor-pointer"
            aria-label="Close"
          >
            ×
          </button>
          <div className="relative max-w-4xl w-full max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={lightbox} alt="Enlarged view" width={1200} height={800} className="object-contain w-full h-full rounded-2xl" />
          </div>
        </div>
      )}
    </>
  );
}
