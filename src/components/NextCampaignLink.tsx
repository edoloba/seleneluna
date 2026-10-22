import Link from "next/link";

export default function NextCampaignLink({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  return (
    <Link
      href={`/works/${slug}`}
      className={`group inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:text-[#ca0200] ${className}`}
    >
      Next
      <svg
        width="40"
        height="10"
        viewBox="0 0 40 10"
        fill="none"
        className="transition-transform duration-300 ease-out group-hover:translate-x-1"
      >
        <path
          d="M0 5H39M39 5L34 1M39 5L34 9"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    </Link>
  );
}
