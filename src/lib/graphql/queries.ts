import { gql } from "graphql-request";

// Elenco campagne per la home (solo i dati che servono alla griglia)
export const GET_CAMPAIGNS = gql`
  query GetCampaigns {
    campaigns(where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        slug
        title
        campaignFields {
          coverImage: coverimage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`;

// Serve a generateStaticParams per pre-generare tutte le pagine /works/[slug]
export const GET_CAMPAIGN_SLUGS = gql`
  query GetCampaignSlugs {
    campaigns(where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        slug
      }
    }
  }
`;

// Dettaglio singola campagna: testo ACF + galleria letta dal blocco Gutenberg "Gallery"
// nel contenuto del post (richiede il plugin gratuito WPGraphQL Content Blocks).
export const GET_CAMPAIGN_BY_SLUG = gql`
  query GetCampaignBySlug($slug: ID!) {
    campaign(id: $slug, idType: SLUG) {
      id
      slug
      title
      campaignFields {
        coverImage: coverimage {
          node {
            sourceUrl
            altText
          }
        }
        description
        displayTitle
      }
      editorBlocks(flat: false) {
        __typename
        ... on CoreGallery {
          innerBlocks {
            __typename
            ... on CoreImage {
              attributes {
                url
                alt
                caption
              }
              mediaDetails {
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

// Pagina "About" nativa di WordPress (Pages → About), modificabile con l'editor a blocchi
export const GET_ABOUT = gql`
  query GetAbout {
    page(id: "about", idType: URI) {
      title
      content
      aboutFields {
        displayTitle
        intro
        body
        contact
        signature
        portrait {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

// Hero della home: Pagina WP "Home" — Titolo = frase in overlay, Immagine in evidenza = foto hero
export const GET_HERO = gql`
  query GetHero {
    page(id: "home", idType: URI) {
      title
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;
