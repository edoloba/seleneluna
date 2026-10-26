import Image from "next/image";
import { notFound } from "next/navigation";
import FitText from "@/components/FitText";
import { getAbout, getCampaigns } from "@/lib/graphql/api";

export default async function AboutPage() {
  const [page, campaigns] = await Promise.all([getAbout(), getCampaigns()]);

  if (!page) {
    notFound();
  }

  const { displayTitle, intro, body, contact, signature, portrait } =
    page.aboutFields;
  const image = portrait?.node;
  // Senza immagine, usa la copertina del primo progetto come sfondo.
  const background = image ?? campaigns[0]?.campaignFields.coverImage?.node;

  return (
    <main>
      <section className="relative h-screen overflow-hidden bg-neutral-900">
        {background && (
          <Image
            src={background.sourceUrl}
            alt={background.altText || page.title}
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
              {displayTitle || page.title}
            </FitText>
            {intro && (
              <div
                className="text-sm uppercase leading-relaxed text-white/90 md:mb-14 md:self-end md:text-base [&_p+p]:mt-4"
                dangerouslySetInnerHTML={{ __html: intro }}
              />
            )}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 md:px-6 md:py-40">
        <div
          className={
            image ? "grid gap-12 md:grid-cols-2 md:gap-16" : "mx-auto max-w-3xl"
          }
        >
          {image && (
            <div className="relative aspect-3/4 md:sticky md:top-24 md:self-start">
              <Image
                src={image.sourceUrl}
                alt={image.altText || page.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <div>
            <div
              className="text-sm uppercase leading-relaxed text-white/90 md:mb-14 md:self-end md:text-base [&_p+p]:mt-4"
              dangerouslySetInnerHTML={{ __html: body || page.content }}
            />
            {contact && (
              <div
                className="mt-10 text-sm uppercase leading-relaxed text-white/90 md:text-base [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:opacity-70 [&_a_*]:underline [&_a_*]:underline-offset-4 [&_p+p]:mt-4"
                dangerouslySetInnerHTML={{ __html: contact }}
              />
            )}
            {signature && (
              <p className="pt-16 text-right text-xl uppercase tracking-wide text-[#ca0200] md:text-3xl">
                {signature}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
