"use client";

import Link from "next/link";
import { useState } from "react";
import type { CampaignSummary } from "@/types/wordpress";

export default function WorksMenu({ campaigns }: { campaigns: CampaignSummary[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="flex items-center gap-1 cursor-pointer uppercase tracking-wide transition-colors"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        Works
      </button>

      {open && (
        <div className="absolute right-0 top-full min-w-48 bg-black/80 backdrop-blur-sm py-2 shadow-lg">
          {campaigns.map((campaign) => (
            <Link
              key={campaign.id}
              href={`/works/${campaign.slug}`}
              className="block px-4 py-2 text-sm uppercase tracking-normal whitespace-nowrap text-white transition-colors hover:bg-white/10 hover:text-[#ca0200]"
              onClick={() => setOpen(false)}
            >
              {campaign.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
