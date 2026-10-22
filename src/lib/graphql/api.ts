import { graphqlClient } from "./client";
import {
  GET_CAMPAIGNS,
  GET_CAMPAIGN_BY_SLUG,
  GET_CAMPAIGN_SLUGS,
  GET_ABOUT,
  GET_HERO,
} from "./queries";
import type {
  CampaignDetail,
  GetCampaignBySlugResponse,
  GetCampaignsResponse,
  WPImage,
} from "@/types/wordpress";

// Estrae le immagini dal blocco Gutenberg "Gallery" nel contenuto del post
// (il resto dell'app lavora solo con WPImage[], senza conoscere la struttura dei blocchi).
export function getCampaignGalleryImages(campaign: CampaignDetail): WPImage[] {
  const galleryBlock = campaign.editorBlocks.find(
    (block): block is Extract<CampaignDetail["editorBlocks"][number], { __typename: "CoreGallery" }> =>
      block.__typename === "CoreGallery"
  );

  if (!galleryBlock) return [];

  return galleryBlock.innerBlocks
    .filter((block) => block.__typename === "CoreImage" && block.attributes.url)
    .map((block) => ({
      sourceUrl: block.attributes.url,
      altText: block.attributes.alt,
      caption: block.attributes.caption || undefined,
      mediaDetails: block.mediaDetails ?? undefined,
    }));
}

export async function getCampaigns() {
  const data = await graphqlClient.request<GetCampaignsResponse>(
    GET_CAMPAIGNS
  );
  return data.campaigns.nodes;
}

export async function getCampaignSlugs() {
  const data = await graphqlClient.request<{
    campaigns: { nodes: { slug: string }[] };
  }>(GET_CAMPAIGN_SLUGS);
  return data.campaigns.nodes.map((node) => node.slug);
}

export async function getCampaignBySlug(slug: string) {
  const data = await graphqlClient.request<GetCampaignBySlugResponse>(
    GET_CAMPAIGN_BY_SLUG,
    { slug }
  );
  return data.campaign;
}

export async function getAbout() {
  const data = await graphqlClient.request<{
    page: {
      title: string;
      // Contenuto del vecchio editor: usato come testo finché il campo "Testo" è vuoto.
      content: string;
      aboutFields: {
        displayTitle: string | null;
        intro: string | null;
        body: string | null;
        signature: string | null;
        portrait: { node: WPImage } | null;
      };
    } | null;
  }>(GET_ABOUT);
  return data.page;
}

export async function getHero() {
  const data = await graphqlClient.request<{
    page: {
      title: string;
      featuredImage: { node: WPImage } | null;
    } | null;
  }>(GET_HERO);
  return data.page;
}
