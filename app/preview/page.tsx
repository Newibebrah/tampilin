import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/SectionLabel";
import { PROJECTS } from "@/content/projects";
import { waLink } from "@/lib/utils";

export const metadata = {
  title: "Preview",
  description: "Contoh desain website hasil kerja tampilin.online — dibuat untuk dipakai, bukan sekadar dipamerkan.",
};

export default function PreviewPage() {
  return (
    <main>
      <section className="border-b border-line bg-canvas">
        <div className="section-shell py-20 sm:py-28 lg:py-32">
          <SectionLabel no="02" label="Preview karya" />
          <h1 className="display-title mt-7 max-w-4xl">Lihat hasil sebelum Anda <span className="text-accent">memutuskan.</span></h1>
          <p className="lede mt-7 max-w-2xl">Beberapa website yang kami bangun untuk bisnis dengan konteks, industri, dan kebutuhan yang berbeda. Semua dibuat agar mudah dipakai.</p>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-24">
        <div className="mb-8 flex items-center justify-between gap-4">
          <p className="text-sm text-ink-muted">6 project terpilih</p>
          <p className="tag-mono text-ink-muted">UMKM · personal · e-commerce</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {PROJECTS.slice(0, 6).map((project, index) => (
            <Link key={project.id} href={project.url} className="group rounded-2xl border border-line bg-paper p-3 transition-colors duration-150 hover:border-accent/50">
              <div
                className="relative flex min-h-64 flex-col justify-between overflow-hidden rounded-xl p-6 text-white sm:min-h-72"
                style={{ background: `linear-gradient(135deg, ${project.g1}, ${project.g2})` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full bg-black/20 px-3 py-1 text-[11px] font-semibold backdrop-blur-sm">{project.category}</span>
                  <span className="rounded-full border border-white/25 px-3 py-1 text-[11px]">{project.year}</span>
                </div>
                <div>
                  <p className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">{project.name}</p>
                  <p className="mt-2 max-w-xs text-xs leading-5 text-white/75">{project.client}</p>
                </div>
                <span className="absolute bottom-6 right-6 grid h-10 w-10 place-items-center rounded-full bg-white/20 text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="px-3 pb-3 pt-5">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-lg font-semibold tracking-[-0.025em] text-ink">{project.name}</h2>
                  <span className="font-mono text-xs text-ink-muted">0{index + 1}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-ink-muted">{project.deskripsi}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-shell pb-24 sm:pb-32">
        <div className="rounded-3xl bg-deep p-8 text-white sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:p-16">
          <div>
            <p className="eyebrow text-lime">Punya kebutuhan serupa?</p>
            <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">Mari bikin versi yang terasa pas untuk brand Anda.</h2>
          </div>
          <a
            href={waLink("Halo tampilin.online, saya melihat preview dan ingin konsultasi.")}
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary mt-8 shrink-0 bg-accent hover:bg-accent-deep lg:mt-0"
          >
            Diskusikan kebutuhan
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
