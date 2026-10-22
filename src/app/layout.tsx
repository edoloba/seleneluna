import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Rigenera le pagine al massimo una volta ogni 60 secondi, così le modifiche
// fatte su WordPress compaiono sul sito senza dover ripubblicare.
// Vale per tutte le route (vince il valore più basso tra layout e pagine).
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blackswan",
  description: "Photography portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="page-gradient relative min-h-full flex flex-col">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
