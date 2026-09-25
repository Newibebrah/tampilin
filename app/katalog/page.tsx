import { ArrowUpRight, Check, Clock3 } from "lucide-react";
import { cn, formatIdr, waLink } from "@/lib/utils";
import { SITE } from "@/content/site";
import { KATEGORI_FILTER, KATALOG_HEADER, PAKET_LIST } from "@/content/paket";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata = {
  title: "Katalog & Harga",
  description: KATALOG_HEADER.lede,
};

function priceLabel(price: number | string) {
  return typeof price === "number" ? formatIdr(price) : price;
}

export default function KatalogPage() {
  return (
    <main>
      <section className="border-b border-line bg-canvas">
        <div className="section-shell py-20 sm:py-28 lg:py-32">
          <SectionLabel no="02" label="Katalog" />
          <h1 className="display-title mt-7 max-w-4xl">Pilih paket yang <span className="text-accent">paling pas</span> untuk bisnis Anda.</h1>
          <p className="lede mt-7 max-w-2xl">{KATALOG_HEADER.lede}</p>
          <div className="mt-9 flex flex-wrap gap-2">
            {KATEGORI_FILTER.map((category) => (
              <span
                key={category.id}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-medium",
                  category.id === "Semua" ? "border-ink bg-ink text-white" : "border-line bg-paper text-ink-muted",
                )}
              >
                {category.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-24">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-ink-muted">Harga dalam Rupiah · estimasi ditulis terbuka</p>
          <p className="flex items-center gap-2 text-sm text-ink-muted"><Clock3 className="h-4 w-4" /> Timeline ditulis jelas di setiap paket</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {PAKET_LIST.map((paket) => {
            const featured = Boolean(paket.featured);
            return (
              <article
                key={paket.id}
                className={cn(
                  "flex flex-col rounded-2xl border p-7 shadow-card sm:p-8",
                  featured ? "border-ink bg-ink text-white" : "border-line bg-paper text-ink",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className={cn("font-mono text-xs", featured ? "text-white/50" : "text-ink-muted")}>{paket.no}</span>
                    <span className={cn("rounded-full px-3 py-1 text-[11px] font-semibold", featured ? "bg-accent text-white" : "bg-cream-dim text-ink-soft")}>
                      {paket.category}
                    </span>
                  </div>
                  {featured && <span className="text-xs font-semibold text-lime">Paling populer</span>}
                </div>

                <h2 className="mt-8 text-3xl font-semibold tracking-[-0.04em]">{paket.name}</h2>
                <p className={cn("mt-3 max-w-xl text-sm leading-6", featured ? "text-white/60" : "text-ink-muted")}>{paket.tagline}</p>

                <div className="mt-8 border-y py-5" style={{ borderColor: featured ? "rgba(255,255,255,.12)" : undefined }}>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-3xl font-semibold tracking-[-0.04em]">{priceLabel(paket.price)}</span>
                    <span className={cn("text-xs", featured ? "text-white/50" : "text-ink-muted")}>{paket.priceNote}</span>
                  </div>
                  <p className={cn("mt-2 text-xs", featured ? "text-white/50" : "text-ink-muted")}>{paket.duration}</p>
                </div>

                <ul className="mt-7 flex-1 space-y-3">
                  {paket.features.map((feature) => (
                    <li key={feature} className={cn("flex items-start gap-3 text-sm", featured ? "text-white/75" : "text-ink-soft")}>
                      <Check className={cn("mt-0.5 h-4 w-4 shrink-0", featured ? "text-lime" : "text-accent")} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={waLink(`Halo ${SITE.name}, saya pilih paket *${paket.name}* (${paket.no}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "mt-9 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors duration-150",
                    featured ? "bg-accent text-white hover:bg-accent-deep" : "bg-ink text-white hover:bg-deep",
                  )}
                >
                  Pilih paket ini
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-line bg-cream-dim p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-ink">Butuh custom atau punya kebutuhan khusus?</h2>
            <p className="mt-2 text-sm leading-6 text-ink-muted">Ceritakan skopnya. Kami bantu susuri solusi yang paling masuk akal.</p>
          </div>
          <a
            href={waLink("Halo tampilin.online, saya punya kebutuhan website custom.")}
            target="_blank"
            rel="noopener noreferrer"
            className="button-secondary shrink-0"
          >
            Konsultasi custom
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
