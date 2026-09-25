import Link from "next/link";
import { ArrowUpRight, Check, Globe2, Layers3, MessageCircle, Sparkles } from "lucide-react";
import { SectionLabel } from "@/components/SectionLabel";
import { SITE } from "@/content/site";
import { KENAPA_TAMPILIN, LAYANAN_MENU, MASALAH_POINTS, PROSES_STEPS } from "@/content/home";
import { waLink } from "@/lib/utils";

const TRUST_POINTS = [
  { value: "5–14", label: "hari rata-rata pengerjaan" },
  { value: "100%", label: "desain dibuat custom" },
  { value: "24+", label: "proyek sudah selesai" },
];

export default function HomePage() {
  return (
    <>
      <section className="overflow-hidden border-b border-line bg-canvas">
        <div className="section-shell grid gap-16 py-20 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-32">
          <div>
            <p className="eyebrow">Jasa pembuatan website · {SITE.city}</p>
            <h1 className="display-title mt-7 max-w-3xl">
              Website yang bikin <span className="text-accent">bisnis</span> Anda sulit dilewati.
            </h1>
            <p className="lede mt-7 max-w-xl">
              Landing page, profil UMKM, sampai toko online. Kami bantu brand Anda tampil
              dengan website yang jelas, cepat, dan siap mengubah pengunjung menjadi pelanggan.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/katalog" className="button-primary">
                Lihat paket dan harga
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
              <span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-ink">
                <Check className="h-4 w-4" />
              </span>
              Proses jelas, harga transparan, tanpa jargon teknis.
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:ml-auto">
            <div className="absolute -inset-8 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative rounded-2xl border border-line bg-paper p-3 shadow-soft">
              <div className="flex items-center justify-between border-b border-line px-3 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span className="h-2 w-2 rounded-full bg-lime" />
                  <span className="h-2 w-2 rounded-full bg-deep-soft" />
                </div>
                <span className="font-mono text-[10px] text-ink-muted">tampilin.online / overview</span>
              </div>
              <div className="p-5 sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="tag-mono text-ink-muted">Ringkasan brand</p>
                    <p className="mt-2 text-lg font-semibold tracking-[-0.03em]">Bisnis lebih mudah ditemukan.</p>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-cream-dim text-accent">
                    <Sparkles className="h-5 w-5" />
                  </span>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-deep p-4 text-white">
                    <p className="text-3xl font-semibold tracking-[-0.04em]">24+</p>
                    <p className="mt-1 text-xs text-white/60">proyek selesai</p>
                  </div>
                  <div className="rounded-xl bg-accent p-4 text-white">
                    <p className="text-3xl font-semibold tracking-[-0.04em]">4,9</p>
                    <p className="mt-1 text-xs text-white/70">skor kepuasan</p>
                  </div>
                </div>
                <div className="mt-3 space-y-3">
                  {["Identitas visual", "Halaman yang menjual", "Tombol WhatsApp"].map((item, index) => (
                    <div key={item} className="flex items-center gap-3 border-b border-line pb-3 last:border-0 last:pb-0">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-cream-dim text-xs font-semibold text-deep">
                        0{index + 1}
                      </span>
                      <span className="text-sm text-ink-soft">{item}</span>
                      <Check className="ml-auto h-4 w-4 text-accent" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-5 hidden items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3 shadow-card sm:flex">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-lime text-deep"><Globe2 className="h-4 w-4" /></span>
              <div>
                <p className="text-xs font-semibold text-ink">Siap tayang</p>
                <p className="text-[11px] text-ink-muted">Mobile-first & SEO friendly</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-line">
          <div className="section-shell grid divide-y divide-line py-0 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {TRUST_POINTS.map((point) => (
              <div key={point.label} className="flex items-baseline gap-3 px-0 py-5 sm:px-6 sm:first:pl-0 sm:last:pr-0">
                <span className="text-2xl font-semibold tracking-[-0.04em] text-ink">{point.value}</span>
                <span className="text-xs leading-5 text-ink-muted">{point.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionLabel no="01" label="Masalah yang familiar" />
            <h2 className="section-title mt-6 max-w-md">Produknya sudah bagus. Sekarang waktunya tampil lebih jelas.</h2>
            <p className="lede mt-6 max-w-md">
              Website yang rapi memberi bisnis Anda rumah digital yang mudah ditemukan,
              dipercaya, dan dihubungi.
            </p>
          </div>
          <div className="border-t border-line">
            {MASALAH_POINTS.map((point) => (
              <div key={point.id} className="grid gap-4 border-b border-line py-6 sm:grid-cols-[3rem_1fr] sm:gap-6">
                <span className="font-mono text-xs text-ink-muted">{point.num}</span>
                <div>
                  <h3 className="text-base font-semibold text-ink">{point.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-ink-muted">{point.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="section-shell py-24 sm:py-32">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <SectionLabel no="02" label="Layanan" />
              <h2 className="section-title mt-6 max-w-xl">Bangun fondasi online yang tepat untuk tahap bisnis Anda.</h2>
            </div>
            <Link href="/katalog" className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors duration-150 hover:text-accent">
              Lihat semua paket
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
              {LAYANAN_MENU.map((service) => (
              <article key={service.no} className="group rounded-2xl border border-line bg-canvas p-7 transition-colors duration-150 hover:border-accent/50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-deep text-white">
                      <Layers3 className="h-5 w-5" />
                    </span>
                    <span className="tag-mono text-ink-muted">{service.category}</span>
                  </div>
                  <span className="font-mono text-xs text-ink-muted">{service.no}</span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold tracking-[-0.035em] text-ink">{service.name}</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-ink-muted">{service.desc}</p>
                <div className="mt-8 flex items-center justify-between border-t border-line pt-5">
                  <span className="text-sm font-semibold text-ink">Mulai {service.price}</span>
                  <ArrowUpRight className="h-4 w-4 text-ink-muted transition-colors duration-150 group-hover:text-accent" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <SectionLabel no="03" label="Cara kami kerja" />
            <h2 className="section-title mt-6 max-w-sm">Dari obrolan pertama sampai website tayang.</h2>
            <p className="lede mt-6 max-w-sm">
              Proses yang terstruktur supaya hasil akhirnya tidak hanya terlihat bagus, tetapi juga mudah dipakai.
            </p>
          </div>
          <div className="grid gap-0 border-t border-line sm:grid-cols-2 sm:border-t-0 sm:gap-8">
            {PROSES_STEPS.map((step) => (
              <article key={step.id} className="border-t border-line py-6 sm:border-t">
                <div className="flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-xs font-bold text-white">{step.no}</span>
                  <span className="tag-mono text-ink-muted">{step.duration}</span>
                </div>
                <h3 className="mt-7 text-lg font-semibold tracking-[-0.02em] text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-muted">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pb-24 sm:pb-32">
        <div className="grid gap-10 rounded-3xl bg-deep p-8 text-white sm:p-12 lg:grid-cols-[0.8fr_1.2fr] lg:p-16">
          <div>
            <p className="eyebrow text-lime">Kenapa tampilin.online</p>
            <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
              Website yang dibuat untuk bekerja, bukan hanya dipamerkan.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/60">
              Setiap keputusan desain dan kode dibuat dengan satu tujuan: membantu
              orang memahami dan menghubungi bisnis Anda.
            </p>
          </div>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {KENAPA_TAMPILIN.map((point) => (
              <div key={point.id} className="grid gap-3 py-5 sm:grid-cols-[2.5rem_1fr] sm:gap-5">
                <span className="font-mono text-xs text-white/40">{point.num}</span>
                <div>
                  <h3 className="text-base font-semibold">{point.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">{point.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-cream-dim">
        <div className="section-shell flex flex-col gap-8 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-20">
          <div>
            <p className="eyebrow">Punya ide yang sudah jelas?</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.04em] text-ink sm:text-4xl">
              Mari obrolkan langkah pertama untuk brand Anda.
            </h2>
          </div>
          <a
            href={waLink("Halo tampilin.online, saya punya ide website yang ingin dibahas.")}
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary shrink-0"
          >
            Mulai konsultasi
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  );
}
