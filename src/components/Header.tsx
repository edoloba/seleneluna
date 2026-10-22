import Link from "next/link";
import { getCampaigns } from "@/lib/graphql/api";
import WorksMenu from "./WorksMenu";

export default async function Header() {
  const campaigns = await getCampaigns();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/30 text-[#ca0200] backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="text-lg tracking-wide">
          SELENE
        </Link>

        <nav className="flex items-center gap-8 text-sm uppercase tracking-wide">
          <Link href="/about">About</Link>
          <WorksMenu campaigns={campaigns} />
        </nav>
      </div>
    </header>
  );
}
