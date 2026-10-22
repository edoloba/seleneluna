export interface WPImage {
  sourceUrl: string;
  altText: string;
  caption?: string;
  mediaDetails?: {
    width: number;
    height: number;
  };
}

export interface CampaignSummary {
  id: string;
  slug: string;
  title: string;
  campaignFields: {
    coverImage: {
      node: WPImage;
    } | null;
  };
}

interface CoreImageBlock {
  __typename: "CoreImage";
  attributes: {
    url: string;
    alt: string;
    caption: string;
  };
  mediaDetails: {
    width: number;
    height: number;
  } | null;
}

interface CoreGalleryBlock {
  __typename: "CoreGallery";
  innerBlocks: CoreImageBlock[];
}

type EditorBlock = CoreGalleryBlock | { __typename: string };

export interface CampaignDetail {
  id: string;
  slug: string;
  title: string;
  campaignFields: {
    coverImage: {
      node: WPImage;
    } | null;
    description: string;
    displayTitle: string | null;
  };
  editorBlocks: EditorBlock[];
}

export interface GetCampaignsResponse {
  campaigns: {
    nodes: CampaignSummary[];
  };
}

export interface GetCampaignBySlugResponse {
  campaign: CampaignDetail | null;
}
