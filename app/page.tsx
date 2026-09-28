"use client";

import { ArrowUpRight, Check, Search, AlertCircle, Copy, Clock, Sparkles, Wallet, Headphones, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { waLink } from "@/lib/utils";
import { SITE } from "@/content/site";
import { PAKET } from "@/lib/data";
import { KENAPA_TAMPILIN, MASALAH_POINTS, PROSES_STEPS } from "@/content/home";
import { Badge } from "@/components/Badge";
import { IconContainer } from "@/components/IconContainer";
import { MeshGradient } from "@/components/sections/HeroMeshGradient";
import { KineticText } from "@/components/sections/KineticText";
import { StaggerReveal } from "@/components/sections/RevealMask";
import { ServiceGrid, type Service } from "@/components/sections/ServiceGrid";
import { HorizontalScroll, TimelineStep } from "@/components/sections/HorizontalScroll";

const TRUST_POINTS = [
  { value: "5–14", label: "hari rata-rata pengerjaan" },
  { value: "100%", label: "desain dibuat custom" },
  { value: "24+", label: "proyek sudah selesai" },
];

const MASALAH_ICONS = [Search, AlertCircle, Copy, Clock] as const;

const KENAPA_ICONS = [Sparkles, TrendingUp, Wallet, Headphones, TrendingUp] as const;

const SIMULASI_POINTS = [
  "Harga paket website (sudah termasuk desain custom & revisi)",
  "Biaya domain per tahun (.com, .id, .my.id, dll)",
  "Hosting: Gratis untuk Landing Page & UMKM",
  "Opsional CMS kelola artikel/konten sendiri (+Rp500rb)",
  "Potongan referral Rp50.000 jika punya kode",
];

const HERO_CHECKLIST = ["Identitas visual", "Halaman yang menjual", "Tombol WhatsApp"];

export default function HomePage() {
  const router = useRouter();
  const services: Service[] = PAKET.map((p) => ({
    id: p.id,
    name: p.nama,
    category: p.id === "landing" ? "Personal" : p.id === "umkm" ? "UMKM" : "E-Commerce",
    description: p.deskripsi,
    price: p.hargaDiskon,
    originalPrice: p.hargaNormal,
    features: p.fitur,
    icon: p.id === "landing" ? "rocket" : p.id === "umkm" ? "building" : "store",
    isPopular: p.id === "landing",
  }));

  return (
    <>
      {/* HERO — Editorial Split */}
      <section className="relative overflow-hidden border-b border-border bg-paper">
        <MeshGradient className="opacity-60" />
        <div className="section-shell section-pad relative flex flex-col items-center gap-14 text-center lg:grid lg:grid-cols-12 lg:items-center lg:gap-12 lg:text-left">
          <div className="relative z-10 w-full max-w-3xl lg:col-span-5 lg:max-w-none">
            <Badge tone="flame" dot pulse>
              Jasa pembuatan website · {SITE.city}
            </Badge>

            <h1 className="display-lg mt-7 max-w-[13ch] text-balance">
              <KineticText
                text="Website yang bikin bisnis Anda sulit dilewati."
                highlightWords={["bisnis"]}
                highlightClassName="text-flame-hover"
                stagger={0.06}
              />
            </h1>

            <p className="lede mt-6 max-w-lg">
              Landing page, profil UMKM, sampai toko online. Kami bantu brand Anda tampil
              dengan website yang jelas, cepat, dan siap mengubah pengunjung menjadi pelanggan.
            </p>

            <div className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
              <Link href="/layanan" className="button-primary button-primary-lg w-full sm:w-auto">
                Lihat paket & harga
                <ArrowUpRight className="h-5 w-5" />
              </Link>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary button-secondary-lg w-full sm:w-auto"
              >
                Konsultasi gratis
                <ArrowUpRight className="h-5 w-5" />
              </a>
            </div>

            <p className="mt-8 flex items-center justify-center gap-3 body-sm font-medium text-ink-muted lg:justify-start">
              <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-lime/30 text-forest">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              Proses jelas, harga transparan, tanpa jargon teknis.
            </p>
          </div>

          <div className="relative z-10 w-full mx-auto max-w-xl lg:col-span-7 lg:mx-0 lg:max-w-none">
            <motion.div
              className="relative rounded-card-lg border border-border bg-paper p-6 shadow-layer-3 md:p-8"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
                <div>
                  <p className="mono-xs uppercase tracking-[0.14em] text-flame-hover">Ringkasan brand</p>
                  <p className="heading-md mt-2 text-ink">Bisnis lebih mudah ditemukan.</p>
                </div>
                <IconContainer tone="flame" size="lg">
                  <Sparkles strokeWidth={2} />
                </IconContainer>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-card bg-ink p-6 text-paper">
                  <p className="font-display text-4xl font-extrabold leading-none tracking-[-0.04em]">24+</p>
                  <p className="mt-2 text-caption text-paper/60">proyek selesai</p>
                </div>
                <div className="rounded-card bg-flame p-6 text-ink">
                  <p className="font-display text-4xl font-extrabold leading-none tracking-[-0.04em]">4,9</p>
                  <p className="mt-2 text-caption text-ink/70">skor kepuasan</p>
                </div>
              </div>

              <ul className="mt-4 space-y-3">
                {HERO_CHECKLIST.map((item, index) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-3 rounded-soft border border-border bg-paper-subtle px-4 py-3.5"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-flame/10 text-mono-xs font-bold text-flame-hover">
                      0{index + 1}
                    </span>
                    <span className="body-sm font-medium text-ink">{item}</span>
                    <Check className="ml-auto h-4 w-4 flex-shrink-0 text-flame-hover" strokeWidth={3} />
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <div className="mt-4 flex items-center gap-3 rounded-card border border-border bg-paper-deep/60 px-5 py-4">
              <IconContainer tone="lime" size="sm">
                <Sparkles strokeWidth={2} />
              </IconContainer>
              <div>
                <p className="text-caption font-bold uppercase tracking-[0.12em] text-ink">
                  Siap tayang
                </p>
                <p className="body-sm text-ink-muted">Mobile-first & SEO friendly</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-border bg-paper-subtle/50">
          <div className="section-shell grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {TRUST_POINTS.map((point, index) => (
              <motion.div
                key={point.label}
                className="flex items-baseline gap-3 py-6 sm:px-8 sm:first:pl-0 sm:last:pr-0"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <span className="font-display text-3xl font-extrabold tracking-[-0.04em] text-ink">
                  {point.value}
                </span>
                <span className="text-caption leading-5 text-ink-muted">{point.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MASALAH — Bento Grid */}
      <section id="masalah" className="section-shell section-pad">
        <div className="max-w-2xl">
          <Badge tone="flame" dot>
            01 · Masalah
          </Badge>
          <h2 className="display-md mt-6 text-balance">
            <KineticText
              text="Produknya sudah bagus. Sekarang waktunya tampil lebih jelas."
              highlightWords={["tampil lebih jelas"]}
              highlightClassName="text-flame-hover"
              stagger={0.05}
            />
          </h2>
          <p className="lede mt-6">
            Website yang rapi memberi bisnis Anda rumah digital yang mudah ditemukan,
            dipercaya, dan dihubungi.
          </p>
        </div>

        <StaggerReveal stagger={0.08} className="mt-14 grid gap-5 md:grid-cols-2">
          {MASALAH_POINTS.map((point, index) => {
            const Icon = MASALAH_ICONS[index] ?? Search;
            const wide = index === 0;
            return (
              <motion.article
                key={point.id}
                className={`group relative overflow-hidden rounded-card-lg border border-border bg-paper-subtle p-8 transition-all duration-standard hover:-translate-y-1 hover:border-flame hover:bg-paper hover:shadow-layer-2 ${
                  wide ? "md:col-span-2" : ""
                }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45 }}
              >
                <div className="flex items-start gap-5">
                  <IconContainer tone="flame" size="lg">
                    <Icon strokeWidth={2} />
                  </IconContainer>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-3">
                      <span className="mono-xs text-flame-hover">{point.num}</span>
                      <h3 className={`heading-md text-ink ${wide ? "md:heading-lg" : ""}`}>
                        {point.title}
                      </h3>
                    </div>
                    <p className="body-sm mt-3 max-w-2xl text-ink-muted">{point.body}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </StaggerReveal>
      </section>

      {/* LAYANAN — Card Grid 3 kolom */}
      <section id="layanan" className="border-y border-border bg-paper-subtle section-pad">
        <div className="section-shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Badge tone="flame" dot>
                02 · Layanan
              </Badge>
              <h2 className="display-md mt-6 text-balance">
                Bangun fondasi online yang tepat untuk tahap bisnis Anda.
              </h2>
            </div>
            <Link href="/layanan" className="button-secondary shrink-0 self-start lg:self-auto">
              Lihat semua paket
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="mt-14">
            <ServiceGrid
              services={services}
              onOrder={(id) => router.push(`/harga?paket=${id}`)}
            />
          </div>
        </div>
      </section>

      {/* KALKULASI HARGA — Full-Bleed Color Block */}
      <section className="relative overflow-hidden bg-forest section-pad">
        <div className="section-shell relative grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Badge tone="lime" dot pulse>
              Kalkulasi Harga Transparan
            </Badge>
            <h2 className="display-md mt-6 max-w-xl text-balance text-paper">
              Tahu pasti berapa budget yang dibutuhkan{" "}
              <span className="text-lime">sebelum memesan</span>.
            </h2>
            <p className="body-lg mt-5 max-w-lg text-paper/70">
              Pilih paket, domain, dan hosting — sistem kami hitung totalnya otomatis.
              Tanpa biaya tersembunyi, tanpa tekanan sales.
            </p>
          </div>

          <div>
            <ul className="space-y-3" role="list">
              {SIMULASI_POINTS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-soft border border-paper/10 bg-paper/5 px-4 py-3.5 body-sm text-paper/90"
                >
                  <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-lime/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="/harga"
                className="inline-flex items-center gap-3 rounded-card bg-paper px-8 py-5 text-body-lg font-bold text-forest shadow-layer-3 transition-all duration-standard hover:-translate-y-1 hover:bg-lime"
              >
                <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-icon bg-flame/10 text-flame-hover">
                  <Sparkles className="h-5 w-5" strokeWidth={2} />
                </span>
                Mulai Simulasi Harga
                <ArrowUpRight className="h-5 w-5 text-flame-hover" />
              </Link>
              <p className="mt-4 body-sm text-paper/50">
                Tidak ada komitmen · Bisa dibatalkan kapan saja · Estimasi akurat
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROSES — Horizontal Scroll Snap */}
      <section id="proses" className="section-shell section-pad">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Badge tone="flame" dot>
              03 · Proses
            </Badge>
            <h2 className="display-md mt-6 text-balance">
              Dari obrolan pertama sampai website tayang.
            </h2>
            <p className="lede mt-6 max-w-xl">
              Proses yang terstruktur supaya hasil akhirnya tidak hanya terlihat bagus, tetapi
              juga mudah dipakai.
            </p>
          </div>
        </div>

        <div className="mt-14">
          <HorizontalScroll>
            {PROSES_STEPS.map((step, index) => (
              <TimelineStep key={step.no} step={step} index={index} />
            ))}
          </HorizontalScroll>
        </div>
      </section>

      {/* KENAPA — Full-Bleed Forest */}
      <section className="relative overflow-hidden bg-ink section-pad">
        <div className="section-shell grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Badge tone="flame" dot>
              Kenapa tampilin.online
            </Badge>
            <h2 className="display-md mt-6 text-balance text-paper">
              Website yang dibuat untuk bekerja, bukan hanya dipamerkan.
            </h2>
            <p className="body-lg mt-6 max-w-md text-paper/60">
              Setiap keputusan desain dan kode dibuat dengan satu tujuan: membantu
              orang memahami dan menghubungi bisnis Anda.
            </p>
          </div>

          <div className="lg:col-span-7">
            <StaggerReveal stagger={0.08} className="grid gap-4 sm:grid-cols-2">
              {KENAPA_TAMPILIN.map((point, index) => {
                const Icon = KENAPA_ICONS[index] ?? Sparkles;
                return (
                  <motion.article
                    key={point.id}
                    className={`rounded-card border border-paper/10 bg-paper/[0.04] p-6 transition-all duration-standard hover:border-flame hover:bg-paper/[0.08] ${
                      index === 0 ? "sm:col-span-2" : ""
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                  >
                    <div className="flex items-center gap-4">
                      <IconContainer tone="flame" size="md">
                        <Icon strokeWidth={2} />
                      </IconContainer>
                      <div className="min-w-0">
                        <span className="mono-xs text-paper/40">{point.num}</span>
                        <h3 className="heading-sm mt-1 text-paper">{point.title}</h3>
                      </div>
                    </div>
                    <p className="body-sm mt-4 text-paper/60">{point.body}</p>
                  </motion.article>
                );
              })}
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* FINAL CTA — Flame */}
      <section className="relative overflow-hidden bg-flame section-pad">
        <div className="section-shell flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <Badge tone="ink" dot>
              Punya ide yang sudah jelas?
            </Badge>
            <h2 className="display-md mt-6 text-balance text-paper">
              Mari obrolkan langkah pertama untuk brand Anda.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={waLink("Halo tampilin.online, saya punya ide website yang ingin dibahas.")}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary shrink-0 border-ink bg-ink text-paper hover:bg-transparent hover:text-ink"
            >
              Mulai konsultasi
              <ArrowUpRight className="h-5 w-5" />
            </a>
            <Link
              href="/layanan"
              className="button-secondary shrink-0 border-paper/50 bg-transparent text-paper hover:border-paper hover:bg-paper hover:text-flame-hover"
            >
              Lihat layanan
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
