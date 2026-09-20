import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn, waLink, formatIdr } from "@/lib/utils";
import { SITE } from "@/content/site";
import { PAKET_LIST, KATEGORI_FILTER, KATALOG_HEADER } from "@/content/paket";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata = {
  title: "Katalog & Harga",
  description: KATALOG_HEADER.lede,
};

export default function KatalogPage() {
  return (
    <main className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <SectionLabel no="02" label="Katalog" />
        <h1 className="mt-6 font-serif text-6xl font-black leading-[0.9] tracking-tighter text-ink md:text-8xl">
          Pilih paket, {KATALOG_HEADER.title[1].toLowerCase()} mu lancar.
        </h1>
        <p className="mt-6 max-w-xl font-serif text-xl leading-snug text-ink/70">
          {KATALOG_HEADER.lede}
        </p>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-wrap gap-2.5">
        {KATEGORI_FILTER.map((k) => (
          <span
            key={k.id}
            className={cn(
              "rounded-full border-2 border-ink px-5 py-2 font-mono text-xs font-bold uppercase",
              k.id === "Semua" ? "bg-ink text-cream" : "text-ink/60",
            )}
          >
            {k.label}
          </span>
        ))}
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-2">
        {PAKET_LIST.map((p) => (
          <article
            key={p.id}
            className={cn(
              "group flex flex-col rounded-[2rem] border-2 border-ink p-8 shadow-hard-sm transition-transform hover:-translate-y-1",
              p.featured ? "bg-ink text-cream" : "bg-paper text-ink",
            )}
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-xs text-ink/40">{p.no}</span>
              {p.featured && (
                <span className="-rotate-3 rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-bold uppercase text-cream">
                  Paling populer
                </span>
              )}
            </div>
            <h2 className="mt-6 font-serif text-4xl font-black tracking-tight">{p.name}</h2>
            <p className="mt-2 font-serif text-sm text-ink/60">{p.tagline}</p>
            <div className="mt-6 flex items-end gap-1">
              <span className="font-mono text-4xl font-black">{formatIdr(Number(p.price))}</span>
              <span className="font-mono text-xs text-ink/40">{p.priceNote}</span>
            </div>
            <p className="mt-1 font-mono text-xs text-ink/40">{p.duration}</p>
            <ul className="mt-8 flex-1 space-y-2.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 font-mono text-sm">
                  <span className="text-accent">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={waLink(`Halo ${SITE.name}, saya pilih paket *${p.name}* (${p.no}).`)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-mono text-sm font-bold uppercase transition-transform hover:-translate-y-0.5",
                p.featured ? "bg-accent text-cream" : "bg-ink text-cream",
              )}
            >
              Pilih paket <ArrowUpRight className="h-4 w-4" />
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}
