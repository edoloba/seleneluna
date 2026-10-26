const LINKEDIN_URL = "https://www.linkedin.com/in/edoardo-lovino/";

export default function Footer() {
  return (
    <footer className="mt-auto flex items-center justify-between gap-4 px-4 py-6 text-xs uppercase tracking-wide text-white/50 md:px-8">
      <p>© {new Date().getFullYear()} Seleneluna</p>
      <p>
        Website by{" "}
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 transition-colors hover:text-white"
        >
          Edoardo Lovino
        </a>
      </p>
    </footer>
  );
}
