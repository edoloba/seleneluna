import type { CampaignSummary } from "@/types/wordpress";
import CampaignCard from "./CampaignCard";

export default function CampaignGrid({ campaigns }: { campaigns: CampaignSummary[] }) {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 p-2 md:p-4">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </section>
  );
}
