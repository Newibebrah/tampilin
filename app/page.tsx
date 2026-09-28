"use client";

import { ArrowUpRight, Check, Sparkles, MessageCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatIdr, waLink } from "@/lib/utils";
import { SITE } from "@/content/site";
import { PAKET } from "@/lib/data";
import { PROSES_STEPS, KENAPA_TAMPILIN } from "@/content/home";
import { SectionLabel } from "@/components/SectionLabel";
import { MeshGradient } from "@/components/sections/HeroMeshGradient";
import { KineticText } from "@/components/sections/KineticText";
import { StaggerReveal } from "@/components/sections/RevealMask";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { HorizontalScroll, TimelineStep } from "@/components/sections/HorizontalScroll";

const TRUST_POINTS = [
  { value: "5–14", label: "hari rata-rata pengerjaan" },
  { value: "100%", label: "desain dibuat custom" },
  { value: "24+", label: "proyek sudah selesai" },
];

export default function HomePage() {
  const services = PAKET.map((p) => ({
    id: p.id,
    name: p.nama,
    category: p.id === "landing" ? "Personal" : p.id === "umkm" ? "UMKM" : "E-Commerce",
    description: p.deskripsi,
    price: p.hargaDiskon,
    originalPrice: p.hargaNormal,
    features: p.fitur,
    icon: (p.id === "landing" ? "globe" : p.id === "umkm" ? "layers" : "store") as "globe" | "layers" | "store",
    isPopular: p.id === "landing",
  }));

  const prosesSteps = PROSES_STEPS.map((step) => ({
    no: step.no,
    title: step.title,
    body: step.body,
    duration: step.duration,
  }));

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-paper">
        <MeshGradient className="opacity-50" />
        <div className="relative section-shell py-20 sm:py-28 lg:py-32 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="relative z-10">
            <p className="eyebrow">Jasa pembuatan website · {SITE.city}</p>
            <h1 className="mt-7 max-w-3xl">
              <KineticText
                text="Website yang bikin bisnis Anda sulit dilewati."
                highlightWords={["bisnis"]}
                highlightClassName="text-flame"
                className="display-lg text-balance"
                stagger={0.06}
              />
            </h1>
            <p className="lede mt-7 max-w-xl">
              Landing page, profil UMKM, sampai toko online. Kami bantu brand Anda tampil
              dengan website yang jelas, cepat, dan siap mengubah pengunjung menjadi pelanggan.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/layanan" className="button-primary">
                Lihat paket & harga
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href={waLink("Halo tampilin.online, saya mau tanya soal website.")}
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary"
              >
                <MessageCircle className="h-4 w-4" />
                Konsultasi gratis
              </a>
            </div>
            <div className="mt-10 flex items-center gap-3 text-sm text-ink-muted">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-lime/20 text-forest">
                <Check className="h-4 w-4" />
              </span>
              Proses jelas, harga transparan, tanpa jargon teknis.
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:ml-auto z-10">
            <motion.div
              className="relative rounded-2xl border border-border bg-paper/80 backdrop-blur-md p-3 shadow-layer-2 rotate-[-1.5deg]"
              initial={{ opacity: 0, scale: 0.95, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: -1.5 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              <div className="flex items-center justify-between border-b border-border px-3 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-flame" />
                  <span className="h-2 w-2 rounded-full bg-lime" />
                  <span className="h-2 w-2 rounded-full bg-forest" />
                </div>
                <span className="mono-xs text-ink-muted">tampilin.online / overview</span>
              </div>
              <div className="p-5 sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="tag text-flame">Ringkasan brand</p>
                    <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-ink">Bisnis lebih mudah ditemukan.</p>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-flame/10 text-flame">
                    <Sparkles className="h-5 w-5" />
                  </span>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-ink p-4 text-white">
                    <p className="text-3xl font-semibold tracking-[-0.04em]">24+</p>
                    <p className="mt-1 text-xs text-white/60">proyek selesai</p>
                  </div>
                  <div className="rounded-xl bg-flame p-4 text-white">
                    <p className="text-3xl font-semibold tracking-[-0.04em]">4,9</p>
                    <p className="mt-1 text-xs text-white/70">skor kepuasan</p>
                  </div>
                </div>
                <div className="mt-3 space-y-3">
                  {["Identitas visual", "Halaman yang menjual", "Tombol WhatsApp"].map((item, index) => (
                    <motion.div
                      key={item}
                      className="flex items-center gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    >
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-flame/10 text-xs font-semibold text-flame">
                        0{index + 1}
                      </span>
                      <span className="text-sm text-ink-muted">{item}</span>
                      <Check className="ml-auto h-4 w-4 text-flame" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            <div className="absolute -bottom-6 -left-5 hidden items-center gap-3 rounded-xl border border-border bg-paper/80 backdrop-blur-md px-4 py-3 shadow-layer-2 sm:flex rotate-[1deg]">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-lime/20 text-forest"><Sparkles className="h-4 w-4" /></span>
              <div>
                <p className="text-xs font-semibold text-ink">Siap tayang</p>
                <p className="text-[11px] text-ink-muted">Mobile-first & SEO friendly</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-border">
          <div className="section-shell grid divide-y divide-border py-0 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {TRUST_POINTS.map((point, index) => (
              <motion.div
                key={point.label}
                className="flex items-baseline gap-3 px-0 py-5 sm:px-6 sm:first:pl-0 sm:last:pr-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <span className="text-2xl font-semibold tracking-[-0.04em] text-ink">{point.value}</span>
                <span className="text-xs leading-5 text-ink-muted">{point.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MASALAH YANG FAMILIAR */}
      <section id="masalah" className="section-shell py-20 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionLabel no="01" label="Masalah" />
            <h2 className="display-md mt-6 max-w-md text-balance">
              <KineticText
                text="Produknya sudah bagus. Sekarang waktunya tampil lebih jelas."
                highlightWords={["tampil lebih jelas"]}
                highlightClassName="text-flame"
                stagger={0.05}
              />
            </h2>
            <p className="lede mt-6 max-w-md">
              Website yang rapi memberi bisnis Anda rumah digital yang mudah ditemukan,
              dipercaya, dan dihubungi.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
            <StaggerReveal stagger={0.1} className="pl-8">
              {PROSES_STEPS.map((point) => (
                <motion.div
                  key={point.id}
                  className="relative pl-8 pb-10 last:pb-0 before:absolute before:left-0 before:top-0 before:h-2 before:w-2 before:rounded-full before:bg-flame"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="mono-xs text-flame -ml-8 absolute left-0 top-1">{point.no}</span>
                  <h3 className="heading-sm">{point.title}</h3>
                  <p className="mt-2 max-w-xl body-sm text-ink-muted">{point.body}</p>
                </motion.div>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* LAYANAN - BENTO GRID */}
      <section id="layanan" className="relative border-y border-border bg-gradient-flame-lime py-20 sm:py-32">
        <div className="relative z-10 section-shell py-16 sm:py-24">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end mb-12">
            <div>
              <SectionLabel no="02" label="Layanan" />
              <h2 className="display-sm mt-6 max-w-xl text-balance">
                Bangun fondasi online yang tepat untuk tahap bisnis Anda.
              </h2>
            </div>
            <Link
              href="/layanan"
              className="button-ghost self-start"
            >
              Lihat semua paket
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <BentoGrid
            services={services}
            onOrder={(id) => {
              const pkg = PAKET.find((p) => p.id === id);
              if (pkg) {
                window.open(waLink(`Halo ${SITE.name}, saya mau pesan paket *${pkg.nama}* (${formatIdr(pkg.hargaDiskon)}).`), "_blank");
              }
            }}
          />
        </div>

        {/* CTA SIMULASI */}
        <div className="relative z-10 section-shell mt-16">
          <div className="relative rounded-3xl overflow-hidden bg-flame/90 backdrop-blur-[12px] border border-flame/20 p-8 sm:p-12 lg:p-16">
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
                <Link
                  href="/harga"
                  className="relative inline-flex items-center gap-3 rounded-xl bg-white px-8 py-5 text-lg font-semibold text-flame shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:bg-white/90 hover:scale-[1.02] transition-all duration-200"
                >
                  <span className="flex items-center justify-center h-10 w-10 rounded-lg bg-flame/10">
                    <svg className="h-5 w-5 text-flame" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </span>
                  <span>Mulai Simulasi Harga</span>
                  <svg className="h-5 w-5 ml-2 text-flame" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
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
        </div>
      </section>

      {/* PROSES KERJA - HORIZONTAL SCROLL */}
      <section id="proses" className="section-shell py-20 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <SectionLabel no="03" label="Proses" />
            <h2 className="display-sm mt-6 max-w-sm text-balance">
              Dari obrolan pertama sampai website tayang.
            </h2>
            <p className="lede mt-6 max-w-sm">
              Proses yang terstruktur supaya hasil akhirnya tidak hanya terlihat bagus, tetapi juga mudah dipakai.
            </p>
          </div>
          <div className="relative">
            <HorizontalScroll gap={24}>
              {prosesSteps.map((step, index) => (
                <TimelineStep key={step.no} step={step} index={index} />
              ))}
            </HorizontalScroll>
          </div>
        </div>
      </section>

      {/* KENAPA TAMPILIN - EDITORIAL */}
      <section className="section-shell pb-20 sm:pb-32">
        <div className="grid gap-10 rounded-3xl bg-ink p-8 text-white sm:p-12 lg:grid-cols-[0.8fr_1.2fr] lg:p-16">
          <div>
            <p className="eyebrow text-lime">Kenapa tampilin.online</p>
            <h2 className="display-sm mt-6 text-balance">
              Website yang dibuat untuk bekerja, bukan hanya dipamerkan.
            </h2>
            <p className="mt-6 max-w-md body text-white/60">
              Setiap keputusan desain dan kode dibuat dengan satu tujuan: membantu
              orang memahami dan menghubungi bisnis Anda.
            </p>
          </div>
          <div className="divide-y divide-white/10 border-y border-white/10">
            <StaggerReveal stagger={0.08} className="py-4">
              {KENAPA_TAMPILIN.map((point) => (
                <motion.div
                  key={point.id}
                  className="grid gap-3 py-5 sm:grid-cols-[2.5rem_1fr] sm:gap-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="mono-xs text-white/40">{point.num}</span>
                  <div>
                    <h3 className="heading-sm">{point.title}</h3>
                    <p className="mt-2 body-sm text-white/60">{point.body}</p>
                  </div>
                </motion.div>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-border bg-paper-subtle">
        <div className="section-shell flex flex-col gap-8 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-20">
          <div>
            <p className="eyebrow">Punya ide yang sudah jelas?</p>
            <h2 className="display-sm mt-4 max-w-2xl text-balance">
              Mari obrolkan langkah pertama untuk brand Anda.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={waLink("Halo tampilin.online, saya punya ide website yang ingin dibahas.")}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary shrink-0"
            >
              Mulai konsultasi
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link href="/layanan" className="button-secondary shrink-0">
              Lihat layanan
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}