"use client";

import { useState } from "react";
import { ArrowUpRight, Calculator, Check, Clock3, MessageCircle, Sparkles } from "lucide-react";
import { cn, formatIdr, waLink } from "@/lib/utils";
import { SITE } from "@/content/site";
import { PAKET, HOSTING, ADDON } from "@/lib/data";
import { SectionLabel } from "@/components/SectionLabel";
import { CalculatorModal } from "@/components/CalculatorModal";

function getHostingForPaket(paketId: string) {
  return HOSTING.filter((h) => h.paket.includes(paketId));
}

function getAddonsForPaket(paketId: string) {
  return ADDON.filter((a) => a.paket.includes(paketId));
}

export default function KatalogPage() {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [selectedPaket, setSelectedPaket] = useState<"landing" | "umkm" | "ecommerce" | null>(null);

  const handleOpenCalculator = (paketId: "landing" | "umkm" | "ecommerce") => {
    setSelectedPaket(paketId);
    setCalculatorOpen(true);
  };

  const handleCloseCalculator = () => {
    setCalculatorOpen(false);
    setSelectedPaket(null);
  };
  return (
    <main>
      <section className="border-b border-line bg-canvas">
        <div className="section-shell py-20 sm:py-28 lg:py-32">
          <SectionLabel no="02" label="Katalog" />
          <h1 className="display-title mt-7 max-w-4xl">Pilih paket yang <span className="text-accent">paling pas</span> untuk bisnis Anda.</h1>
          <p className="lede mt-7 max-w-2xl">Harga jelas, no bonus kejutan. Tiap paket sudah termasuk desain custom, hosting siap pakai, dan garansi revisi.</p>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-24">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-ink-muted">Harga dalam Rupiah · estimasi ditulis terbuka</p>
          <p className="flex items-center gap-2 text-sm text-ink-muted"><Clock3 className="h-4 w-4" /> Timeline ditulis jelas di setiap paket</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {PAKET.map((paket) => {
            const hostingOptions = getHostingForPaket(paket.id);
            const freeHosting = hostingOptions.find((h) => h.harga === 0);
            const paidHosting = hostingOptions.find((h) => h.harga > 0);
            const addonCount = getAddonsForPaket(paket.id).length;
            const isPopular = paket.id === "landing";

            return (
              <article
                key={paket.id}
                className={cn(
                  "relative flex flex-col rounded-2xl border p-7 shadow-card sm:p-8 transition-all duration-300 hover:shadow-soft",
                  isPopular ? "border-ink bg-ink text-white" : "border-line bg-paper text-ink"
                )}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold text-white">
                      <Sparkles className="h-3 w-3" /> Paling Populer
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-ink-muted">{paket.id === "landing" ? "01" : paket.id === "umkm" ? "02" : "03"}</span>
                    <span className={cn("rounded-full px-3 py-1 text-[11px] font-semibold", isPopular ? "bg-accent text-white" : "bg-cream-dim text-ink-soft")}>
                      {paket.id === "landing" ? "Personal" : paket.id === "umkm" ? "UMKM" : "E-Commerce"}
                    </span>
                  </div>
                </div>

                <h2 className="mt-8 text-3xl font-semibold tracking-[-0.04em]">{paket.nama}</h2>
                <p className={cn("mt-3 max-w-xl text-sm leading-6", isPopular ? "text-white/60" : "text-ink-muted")}>{paket.deskripsi}</p>

                <div className="mt-8 border-y py-5" style={{ borderColor: isPopular ? "rgba(255,255,255,.12)" : undefined }}>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-3xl font-semibold tracking-[-0.04em]">Rp{paket.hargaDiskon.toLocaleString("id-ID")}</span>
                    <span className={cn("text-xs line-through", isPopular ? "text-white/50" : "text-ink-muted")}>Rp{paket.hargaNormal.toLocaleString("id-ID")}</span>
                    <span className="tag-mono text-lime ml-auto">Hemat Rp{(paket.hargaNormal - paket.hargaDiskon).toLocaleString("id-ID")}</span>
                  </div>
                  <p className={cn("mt-2 text-xs", isPopular ? "text-white/50" : "text-ink-muted")}>Estimasi {paket.estimasiHari} hari kerja</p>
                </div>

                <ul className="mt-7 flex-1 space-y-3">
                  {paket.fitur.map((feature) => (
                    <li key={feature} className={cn("flex items-start gap-3 text-sm", isPopular ? "text-white/75" : "text-ink-soft")}>
                      <Check className={cn("mt-0.5 h-4 w-4 shrink-0", isPopular ? "text-lime" : "text-accent")} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t pt-4" style={{ borderColor: isPopular ? "rgba(255,255,255,.12)" : undefined }}>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
                    <span>Domain: </span>
                    <span className="font-medium">Termasuk 1 tahun</span>
                    <span className="mx-1">·</span>
                    <span>Hosting: </span>
                    <span className="font-medium">{freeHosting ? "Gratis (Netlify/Cloudflare)" : paidHosting ? `${formatIdr(paidHosting.harga)}/tahun` : "Tidak termasuk"}</span>
                    <span className="mx-1">·</span>
                    <span>{addonCount} add-on tersedia</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => handleOpenCalculator(paket.id as "landing" | "umkm" | "ecommerce")}
                    className={cn(
                      "flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors duration-150",
                      isPopular ? "bg-accent text-white hover:bg-accent-deep" : "bg-ink text-white hover:bg-deep"
                    )}
                  >
                    <Calculator className="h-4 w-4" />
                    Simulasi Harga
                  </button>
                  <a
                    href={waLink(`Halo ${SITE.name}, saya pilih paket *${paket.nama}* (Rp${paket.hargaDiskon.toLocaleString("id-ID")}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors duration-150",
                      isPopular ? "border-2 border-lime text-lime hover:bg-lime/10" : "border-2 border-accent text-accent hover:bg-accent/10"
                    )}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                    Pesan
                  </a>
                </div>
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

      <CalculatorModal
        isOpen={calculatorOpen}
        onClose={handleCloseCalculator}
        initialPaket={selectedPaket || undefined}
      />
    </main>
  );
}