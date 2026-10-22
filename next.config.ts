import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // WordPress in produzione (Hostinger)
      {
        protocol: "https",
        hostname: "cms.seleneluna.space",
      },
      // WordPress locale (es. Local by Flywheel, domini *.local)
      {
        protocol: "http",
        hostname: "**.local",
      },
    ],
    // I domini *.local di Local (Flywheel) risolvono a un IP privato: Next.js 16
    // blocca di default l'ottimizzazione di immagini su IP locali per prevenire SSRF.
    // Attivo solo in sviluppo.
    dangerouslyAllowLocalIP: isDev,
  },
};

export default nextConfig;
