import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE } from "@/content/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.tagline,
  keywords: ["jasa pembuatan website", "website UMKM", "landing page", "toko online", "Indonesia"],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE.domain,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F7F7F3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="bg-canvas">
      <body className="min-h-screen bg-canvas font-sans text-ink antialiased">
        <Navbar />
        <div className="min-h-[70vh]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
