import Image from "next/image";
import { notFound } from "next/navigation";
import FitText from "@/components/FitText";
import Gallery from "@/components/Gallery";
import NextCampaignLink from "@/components/NextCampaignLink";
import {
  getCampaigns,
  getCampaignBySlug,
  getCampaignGalleryImages,
  getCampaignSlugs,
} from "@/lib/graphql/api";

export async function generateStaticParams() {
  const slugs = await getCampaignSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [campaign, allCampaigns] = await Promise.all([
    getCampaignBySlug(slug),
    getCampaigns(),
  ]);

  if (!campaign) {
    notFound();
  }

  const images = getCampaignGalleryImages(campaign);
  const cover = campaign.campaignFields.coverImage?.node;
  const displayTitle = campaign.campaignFields.displayTitle;

  const currentIndex = allCampaigns.findIndex((item) => item.slug === slug);
  const nextSlug =
    allCampaigns[(currentIndex + 1) % allCampaigns.length]?.slug ?? slug;

  return (
    <main>
      <section className="relative h-screen overflow-hidden bg-neutral-900">
        {cover && (
          <Image
            src={cover.sourceUrl}
            alt={cover.altText || campaign.title}
            fill
            priority
            className="scale-110 object-cover brightness-[0.4] blur-md"
          />
        )}
        <div className="relative z-10 h-full w-full px-4 pt-20 pb-8 md:px-6">
          <div className="grid h-full gap-4 md:grid-cols-2">
            <FitText
              className="font-light uppercase leading-[0.8] tracking-tight text-white"
              asHtml={Boolean(displayTitle)}
            >
              {displayTitle || campaign.title}
            </FitText>
            <div
              className="prose prose-invert text-sm max-h-[60vh] max-w-none overflow-y-auto pb-2 pr-2 md:text-[12px] md:mb-14 md:self-end uppercase"
              dangerouslySetInnerHTML={{
                __html: campaign.campaignFields.description,
              }}
            />
          </div>
        </div>
        <NextCampaignLink
          slug={nextSlug}
          className="absolute bottom-6 right-4 z-10 md:bottom-8 md:right-6"
        />
      </section>
      <Gallery images={images} />
      <div className="flex justify-end px-4 pb-12 md:px-6">
        <NextCampaignLink slug={nextSlug} />
      </div>
    </main>
  );
}
