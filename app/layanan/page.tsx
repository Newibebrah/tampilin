"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Sparkles, Calculator, MessageCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn, formatIdr, waLink } from "@/lib/utils";
import { SITE } from "@/content/site";
import { PAKET, HOSTING, ADDON } from "@/lib/data";
import { SectionLabel } from "@/components/SectionLabel";
import { CalculatorModal } from "@/components/CalculatorModal";
import { Button } from "@/components/ui/Button";
import { RevealMask, StaggerReveal } from "@/components/sections/RevealMask";

function getHostingForPaket(paketId: string) {
  return HOSTING.filter((h) => h.paket.includes(paketId));
}

function getAddonsForPaket(paketId: string) {
  return ADDON.filter((a) => a.paket.includes(paketId));
}

export default function LayananPage() {
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

  const services = PAKET.map((p) => ({
    id: p.id,
    name: p.nama,
    category: p.id === "landing" ? "Personal" : p.id === "umkm" ? "UMKM" : "E-Commerce",
    description: p.deskripsi,
    price: p.hargaDiskon,
    originalPrice: p.hargaNormal,
    features: p.fitur,
    icon: p.id === "landing" ? "globe" : p.id === "umkm" ? "layers" : "store",
    isPopular: p.id === "landing",
  }));

  return (
    <>
      {/* GRADIENT BACKGROUND */}
      <div className="fixed inset-0 bg-gradient-flame-lime z-0" aria-hidden="true" />

      <main className="relative z-10">
        {/* HEADER */}
        <section className="border-b border-border/50">
          <div className="section-shell py-16 sm:py-24 lg:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <RevealMask delay={100}>
                <SectionLabel no="02" label="Layanan" className="inline-flex justify-center" />
              </RevealMask>
              <RevealMask delay={200}>
                <h1 className="display-lg mt-7 text-balance">
                  Pilih paket yang <span className="text-flame">paling pas</span> untuk bisnis Anda.
                </h1>
              </RevealMask>
              <RevealMask delay={300}>
                <p className="lede mt-7 max-w-2xl mx-auto">
                  Harga jelas, no bonus kejutan. Tiap paket sudah termasuk desain custom, hosting siap pakai, dan garansi revisi.
                </p>
              </RevealMask>
            </div>
          </div>
        </section>

        {/* SERVICE CARDS */}
        <section className="section-shell py-16 sm:py-24">
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <p className="body-sm text-ink-muted">Harga dalam Rupiah · estimasi ditulis terbuka</p>
            <p className="flex items-center gap-2 body-sm text-ink-muted">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Timeline ditulis jelas di setiap paket
            </p>
          </div>

          <StaggerReveal stagger={0.1} className="grid gap-6 lg:grid-cols-3">
            {services.map((paket, index) => {
              const hostingOptions = getHostingForPaket(paket.id);
              const freeHosting = hostingOptions.find((h) => h.harga === 0);
              const paidHosting = hostingOptions.find((h) => h.harga > 0);
              const addonCount = getAddonsForPaket(paket.id).length;
              const isPopular = paket.id === "landing";

              const IconComponent = paket.icon === "globe" ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              ) : paket.icon === "layers" ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              );

              return (
                <motion.article
                  key={paket.id}
                  layout
                  className={cn(
                    "relative flex flex-col rounded-sharp border border-border/50 bg-paper/80 backdrop-blur-[12px] p-8 sm:p-8 transition-all duration-standard hover:shadow-layer-2 hover:-translate-y-1 hover:border-flame/30",
                    isPopular && "border-flame/50 shadow-layer-2"
                  )}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 rounded-pill bg-flame/10 px-3 py-1 text-mono-xs font-semibold text-flame">
                        <Sparkles className="h-3 w-3" /> Paling Populer
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-flame/10 text-flame">
                        {IconComponent}
                      </span>
                      <span className="tag tag-flame">{paket.category}</span>
                    </div>
                    <span className="mono-xs text-ink-muted">0{index + 1}</span>
                  </div>

                  <h2 className="heading-lg mb-3">{paket.name}</h2>
                  <p className="body-sm text-ink-muted mb-6 flex-1">{paket.description}</p>

                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-display-sm font-display font-medium text-ink">
                      Rp{paket.price.toLocaleString("id-ID")}
                    </span>
                    <span className="text-body-sm line-through text-ink-muted">
                      Rp{paket.originalPrice.toLocaleString("id-ID")}
                    </span>
                    <span className="tag tag-lime ml-auto">Hemat Rp{(paket.originalPrice - paket.price).toLocaleString("id-ID")}</span>
                  </div>

                  <div className="flex items-center gap-2 text-mono-xs text-ink-muted mb-6">
                    <span>Domain: </span>
                    <span className="font-medium">Termasuk 1 tahun</span>
                    <span>·</span>
                    <span>Hosting: </span>
                    <span className="font-medium">
                      {freeHosting ? "Gratis (Netlify/Cloudflare)" : paidHosting ? `${formatIdr(paidHosting.harga)}/tahun` : "Tidak termasuk"}
                    </span>
                    <span>·</span>
                    <span>{addonCount} add-on tersedia</span>
                  </div>

                  <ul className="space-y-3 mb-6 flex-1">
                    {paket.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-body-sm text-ink-soft">
                        <span className="mt-0.5 flex-shrink-0 h-5 w-5 rounded-full bg-flame/10 flex items-center justify-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                        </span>
                        {feature}
                      </li>
                    ))}
                    {paket.features.length > 4 && (
                      <li className="text-body-sm text-flame font-medium">+{paket.features.length - 4} fitur lain</li>
                    )}
                  </ul>

                  <div className="flex gap-3 pt-4 border-t border-border">
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleOpenCalculator(paket.id as "landing" | "umkm" | "ecommerce")}
                    >
                      <Calculator className="h-4 w-4" />
                      Simulasi Harga
                    </Button>
                    <Link
                      href={waLink(`Halo ${SITE.name}, saya pilih paket *${paket.name}* (Rp${formatIdr(paket.price)}).`)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="secondary" size="sm" className="flex-1">
                        <MessageCircle className="h-4 w-4" />
                        Pesan
                      </Button>
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </StaggerReveal>

          {/* CUSTOM CTA */}
          <RevealMask delay={400} className="mt-12">
            <div className="rounded-2xl border border-border bg-paper-subtle/50 p-8 sm:flex sm:items-center sm:justify-between sm:p-8">
              <div>
                <h2 className="heading-md">Butuh custom atau punya kebutuhan khusus?</h2>
                <p className="mt-2 body-sm text-ink-muted">Ceritakan skopnya. Kami bantu susuri solusi yang paling masuk akal.</p>
              </div>
              <Link
                href={waLink("Halo tampilin.online, saya punya kebutuhan website custom.")}
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary shrink-0 mt-6 sm:mt-0"
              >
                Konsultasi custom
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealMask>
        </section>

        {/* SIMULASI HARGA CTA SECTION */}
        <section className="section-shell py-16 sm:py-24">
          <RevealMask>
            <div className="relative rounded-3xl overflow-hidden bg-ink p-8 sm:p-12 lg:p-16">
              <div className="absolute inset-0 bg-gradient-to-br from-flame/20 via-transparent to-lime/10" />
              <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
                <div className="max-w-xl">
                  <p className="eyebrow text-lime">Kalkulasi Harga Transparan</p>
                  <h3 className="mt-3 display-sm text-white text-balance">
                    Tahu pasti berapa budget yang dibutuhkan <span className="text-lime">sebelum memesan</span>.
                  </h3>
                  <p className="mt-5 text-lg leading-7 text-white/80">
                    Pilih paket, domain, dan hosting — sistem kami hitung totalnya otomatis.
                    Tanpa biaya tersembunyi, tanpa tekanan sales.
                  </p>
                  <ul className="mt-8 space-y-3" role="list">
                    {[
                      "Harga paket website (sudah termasuk desain custom & revisi)",
                      "Biaya domain per tahun (.com, .id, .my.id, dll)",
                      "Hosting: Gratis untuk Landing Page & UMKM",
                      "Opsional CMS kelola artikel/konten sendiri (+Rp500rb)",
                      "Potongan referral Rp50.000 jika punya kode",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/90">
                        <span className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl border border-white/10" />
                  <a
                    href="/harga"
                    className="relative inline-flex items-center gap-3 rounded-xl bg-white px-8 py-5 text-lg font-semibold text-flame shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:bg-white/90 hover:scale-[1.02] transition-all duration-200"
                  >
                    <span className="flex items-center justify-center h-10 w-10 rounded-lg bg-flame/10">
                      <Calculator className="h-5 w-5 text-flame" />
                    </span>
                    <span>Mulai Simulasi Harga</span>
                    <svg className="h-5 w-5 ml-2 text-flame" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                  <p className="mt-5 text-sm text-white/60 text-center sm:text-left">
                    Tidak ada komitmen · Bisa dibatalkan kapan saja · Estimasi akurat
                  </p>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 hidden lg:block opacity-5">
                <svg className="h-32 w-32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </RevealMask>
        </section>
      </main>

      <CalculatorModal
        isOpen={calculatorOpen}
        onClose={handleCloseCalculator}
        initialPaket={selectedPaket || undefined}
      />
    </>
  );
}