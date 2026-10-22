"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { WPImage } from "@/types/wordpress";

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M9 4l8 8-8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Lightbox({
  images,
  activeIndex,
  onClose,
  onNavigate,
}: {
  images: WPImage[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const total = images.length;
  const image = images[activeIndex];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onNavigate((activeIndex - 1 + total) % total);
      if (event.key === "ArrowRight") onNavigate((activeIndex + 1) % total);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, total, onClose, onNavigate]);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 text-3xl text-white/70 transition-colors hover:text-white md:right-8 md:top-8"
        aria-label="Close"
      >
        &times;
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNavigate((activeIndex - 1 + total) % total);
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-4 text-white/70 transition-colors hover:text-white md:left-6"
        aria-label="Previous photo"
      >
        <ChevronIcon className="rotate-180" />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNavigate((activeIndex + 1) % total);
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-4 text-white/70 transition-colors hover:text-white md:right-6"
        aria-label="Next photo"
      >
        <ChevronIcon />
      </button>

      <div
        className="flex max-w-[90vw] flex-col items-center gap-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-[75vh] w-[90vw]">
          <Image
            src={image.sourceUrl}
            alt={image.altText || ""}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </div>
        {/* {image.caption && (
          <p
            className="max-w-[90vw] text-center text-sm text-white/80"
            dangerouslySetInnerHTML={{ __html: image.caption }}
          />
        )} */}
      </div>
    </div>
  );
}
