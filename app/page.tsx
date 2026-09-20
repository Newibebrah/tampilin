import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE, MARQUEE_KEYWORDS } from "@/content/site";
import { waLink } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="px-6 pb-20 pt-36 md:px-10 md:pt-48">
          <div className="mx-auto max-w-6xl">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Jasa pembuatan website · {SITE.city}
            </span>
            <h1 className="mt-8 max-w-4xl font-serif text-6xl font-black leading-[0.9] tracking-tighter text-ink md:text-8xl">
              Bisnis mu <span className="text-accent">siap tampil</span> online.
            </h1>
            <p className="mt-8 max-w-xl font-serif text-xl leading-snug text-ink/70 md:text-2xl">
              Landing page, profil UMKM, sampai toko online — custom, cepat, harga transparan.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/katalog"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-mono text-sm font-bold uppercase tracking-wide text-cream shadow-hard-sm transition-transform hover:-translate-y-0.5"
              >
                Lihat katalog
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-serif text-lg font-bold text-ink underline decoration-accent decoration-2 underline-offset-8"
              >
                Konsultasi gratis via WhatsApp
              </a>
            </div>

            <p className="mt-14 max-w-2xl font-mono text-sm leading-relaxed text-ink/50">
              {MARQUEE_KEYWORDS}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
