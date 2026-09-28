"use client";

import { ArrowUpRight, Sparkles, Calculator, MessageCircle, TrendingDown } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn, formatIdr, waLink } from "@/lib/utils";
import { SITE } from "@/content/site";
import { PAKET, HOSTING, ADDON } from "@/lib/data";
import { SectionLabel } from "@/components/SectionLabel";
import { RevealMask, StaggerReveal } from "@/components/sections/RevealMask";

function getHostingForPaket(paketId: string) {
  return HOSTING.filter((h) => h.paket.includes(paketId));
}

function getAddonsForPaket(paketId: string) {
  return ADDON.filter((a) => a.paket.includes(paketId));
}

export default function LayananPage() {
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

      <div className="relative z-10">
        {/* HEADER */}
        <section className="border-b border-border/50">
          <div className="section-shell py-16 sm:py-24 lg:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <SectionLabel no="02" label="Layanan" className="inline-flex justify-center" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="display-lg mt-7 text-balance">
                  Pilih paket yang <span className="text-flame">paling pas</span> untuk bisnis Anda.
                </h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="lede mt-7 max-w-2xl mx-auto">
                  Harga jelas, no bonus kejutan. Tiap paket sudah termasuk desain custom, hosting siap pakai, dan garansi revisi.
                </p>
              </motion.div>
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

                  <div className="mb-6 border-y border-border py-5">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-display-sm font-display font-medium leading-none text-ink">
                        Rp{paket.price.toLocaleString("id-ID")}
                      </span>
                      <span className="text-body-sm text-ink-muted line-through decoration-ink-subtle/60">
                        Rp{paket.originalPrice.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <span className="mt-3 inline-flex items-center gap-1.5 rounded-pill bg-lime px-3 py-1 text-mono-xs font-bold uppercase tracking-[0.08em] text-forest">
                      <TrendingDown className="h-3.5 w-3.5" strokeWidth={2.5} />
                      Hemat Rp{(paket.originalPrice - paket.price).toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-mono-xs text-ink-muted">
                    <span>Domain: </span>
                    <span className="font-medium text-ink">Termasuk 1 tahun</span>
                    <span aria-hidden="true">·</span>
                    <span>Hosting: </span>
                    <span className="font-medium text-ink">
                      {freeHosting ? "Gratis (Netlify/Cloudflare)" : paidHosting ? `${formatIdr(paidHosting.harga)}/tahun` : "Tidak termasuk"}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{addonCount} add-on tersedia</span>
                  </div>

                  <ul className="mb-6 flex-1 space-y-3">
                    {paket.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-body-sm text-ink-muted">
                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-flame/10">
                          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                        </span>
                        {feature}
                      </li>
                    ))}
                    {paket.features.length > 4 && (
                      <li className="text-body-sm font-medium text-flame">+{paket.features.length - 4} fitur lain</li>
                    )}
                  </ul>

                  <div className="border-t border-border pt-5">
                    <Link
                      href={waLink(`Halo ${SITE.name}, saya pilih paket *${paket.name}* (${formatIdr(paket.price)}).`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <span className="flex w-full items-center justify-center gap-2 rounded-sharp bg-flame px-8 py-4 text-body font-semibold text-paper transition-all duration-micro hover:bg-flame-hover hover:gap-3 active:scale-[0.98]">
                        <MessageCircle className="h-4 w-4" />
                        Pesan Paket Ini
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-standard group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
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
            <div className="relative overflow-hidden rounded-3xl border-[3px] border-ink bg-lime p-8 sm:p-12 lg:p-14">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-flame/90 blur-3xl" />
              <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-forest/20 blur-3xl" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-pill bg-forest px-4 py-2">
                  <Calculator className="h-3.5 w-3.5 text-lime" />
                  <span className="text-mono-xs font-bold uppercase tracking-[0.14em] text-lime">
                    Langkah berikutnya
                  </span>
                </div>

                <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
                  <div>
                    <h3 className="display-md text-balance text-forest">
                      Pilih paketnya, angkanya{" "}
                      <span className="text-flame">muncul sendiri</span>.
                    </h3>
                    <p className="mt-5 text-lg font-medium leading-relaxed text-forest/80">
                      Domain, hosting, dan CMS ikut dihitung di dalamnya — jadi
                      tidak ada komponen yang terlewat saat Anda membandingkan opsi.
                    </p>
                  </div>

                  <div>
                    <Link
                      href="/harga"
                      className="group inline-flex items-center gap-3 rounded-sharp bg-forest px-8 py-5 text-lg font-bold text-lime transition-all duration-standard hover:bg-forest/85 active:scale-[0.98]"
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-sharp bg-lime text-forest">
                        <Calculator className="h-5 w-5" />
                      </span>
                      <span>Mulai Simulasi Harga</span>
                      <ArrowUpRight className="h-5 w-5 transition-transform duration-standard group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                    <p className="mt-4 text-sm font-medium text-forest/70">
                      Tidak ada komitmen · Bisa dibatalkan kapan saja · Estimasi akurat
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealMask>
        </section>
      </div>
    </>
  );
}
