import Hero from "@/components/Hero";
import CampaignGrid from "@/components/CampaignGrid";
import { getCampaigns, getHero } from "@/lib/graphql/api";

export default async function HomePage() {
  const [campaigns, hero] = await Promise.all([getCampaigns(), getHero()]);
  const heroImage = hero?.featuredImage?.node;

  return (
    <main>
      {heroImage && (
        <Hero
          imageUrl={heroImage.sourceUrl}
          imageAlt={heroImage.altText || hero.title}
          title={hero.title}
        />
      )}
      <CampaignGrid campaigns={campaigns} />
    </main>
  );
}
