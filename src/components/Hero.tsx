import Image from "next/image";

interface HeroProps {
  imageUrl: string;
  imageAlt: string;
  title: string;
}

export default function Hero({ imageUrl, imageAlt, title }: HeroProps) {
  return (
    <section className="relative h-screen w-full">
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 flex bg-black/30">
        <div className="flex-2 flex items-end justify-start px-4 pb-20 md:pb-28">
          <h1 className="text-xl md:text-2xl text-white text-right uppercase">
            {title}
          </h1>
        </div>
        <div className="flex-1" />
      </div>
    </section>
  );
}
