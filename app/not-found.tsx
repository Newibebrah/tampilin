import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Home, Search } from "lucide-react";
import { NAV_LINKS, SITE } from "@/content/site";
import { waLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
  robots: { index: false, follow: true },
};

const SUGGESTIONS: { href: string; label: string; note: string }[] = [
  { href: "/layanan", label: "Layanan", note: "Paket dan apa saja yang kami kerjakan" },
  { href: "/harga", label: "Harga & Simulasi", note: "Hitung perkiraan biaya di tempat" },
  { href: "/preview", label: "Preview", note: "Contoh hasil website kami" },
  { href: "/tentang", label: "Tentang", note: "Proses kerja dan cara kami berkomunikasi" },
];

export default function NotFound() {
  return (
    <div className="section-shell flex min-h-[70vh] flex-col justify-center py-20 lg:py-24">
      <div className="max-w-3xl">
        <p className="eyebrow-lime">Error 404</p>

        <h1 className="mt-7 text-display-md text-ink">
          Halaman ini tidak
          <br />
          pernah ada.
        </h1>

        <p className="lede mt-6 max-w-xl">
          Alamat yang Anda buka tidak kami temukan. Mungkin ada salah ketik, atau
          halamannya sudah kami pindahkan.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link href="/" className="button-primary">
            <Home className="h-4 w-4" />
            <span>Kembali ke beranda</span>
          </Link>
          <Link href="/harga" className="button-secondary">
            <Search className="h-4 w-4" />
            <span>Cari harga</span>
          </Link>
        </div>
      </div>

      <div className="mt-20 border-t border-border pt-10">
        <p className="text-mono-xs uppercase tracking-[0.18em] text-ink-subtle">
          Mungkin Anda mencari
        </p>
        <ul className="mt-6 grid gap-px overflow-hidden rounded-sharp border border-border bg-border sm:grid-cols-2">
          {SUGGESTIONS.map((item, index) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex items-start justify-between gap-4 bg-paper p-6 transition-colors duration-micro hover:bg-paper-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-flame"
              >
                <span>
                  <span className="mono-xs block text-ink-subtle">
                    0{index + 1}
                  </span>
                  <span className="mt-2 block text-heading-sm font-semibold text-ink">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-body-sm text-ink-muted">
                    {item.note}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-5 w-5 flex-shrink-0 text-ink-subtle transition-colors duration-micro group-hover:text-flame"
                />
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-body-sm text-ink-muted">
          Masih tidak menemukan yang Anda cari?{" "}
          <a
            href={waLink("Halo tampilin.online, saya mencari halaman yang tidak saya temukan di website.")}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-semibold text-ink"
          >
            Tanya kami di WhatsApp
          </a>{" "}
          — {SITE.whatsappDisplay} biasanya membalas dalam beberapa menit.
        </p>
      </div>

      <nav aria-label="Semua halaman" className="mt-12">
        <p className="text-mono-xs uppercase tracking-[0.18em] text-ink-subtle">
          Seluruh halaman
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-body-sm text-ink-muted underline-offset-4 transition-colors duration-micro hover:text-flame hover:underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
