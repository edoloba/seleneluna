import Image from "next/image";
import Link from "next/link";
import type { CampaignSummary } from "@/types/wordpress";

export default function CampaignCard({ campaign }: { campaign: CampaignSummary }) {
  const cover = campaign.campaignFields.coverImage?.node;

  return (
    <Link
      href={`/works/${campaign.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden"
    >
      {cover && (
        <Image
          src={cover.sourceUrl}
          alt={cover.altText || campaign.title}
          fill
          className="object-cover opacity-70 transition-[opacity,transform] duration-700 ease-out group-hover:scale-105 group-hover:opacity-40"
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-700 ease-out group-hover:bg-black/40">
        <h2 className="px-4 text-sm md:text-base font-light uppercase tracking-[0.2em] text-white text-center transition-transform duration-700 ease-out group-hover:-translate-y-1">
          {campaign.title}
        </h2>
      </div>
    </Link>
  );
}
