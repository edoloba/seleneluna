"use client";

import Image from "next/image";
import { useState } from "react";
import type { WPImage } from "@/types/wordpress";
import Lightbox from "./Lightbox";

// Masonry via CSS columns: ogni foto mantiene le sue proporzioni originali
// (verticale resta verticale, orizzontale resta orizzontale), senza crop.
export default function Gallery({ images }: { images: WPImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <section className="columns-1 sm:columns-2 lg:columns-3 gap-2 md:gap-4 p-2 md:p-4">
        {images.map((image, index) => {
          const { width, height } = image.mediaDetails ?? { width: 4, height: 5 };

          return (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative mb-2 block w-full cursor-zoom-in text-left md:mb-4 break-inside-avoid"
              style={{ aspectRatio: `${width} / ${height}` }}
            >
              <Image
                src={image.sourceUrl}
                alt={image.altText || ""}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              {/* {image.caption && (
                <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
                  <p
                    className="p-4 text-sm text-white"
                    dangerouslySetInnerHTML={{ __html: image.caption }}
                  />
                </div>
              )} */}
            </button>
          );
        })}
      </section>

      {activeIndex !== null && (
        <Lightbox
          images={images}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </>
  );
}
