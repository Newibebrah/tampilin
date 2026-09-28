import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/Badge";
import { SITE } from "@/content/site";
import { PROJECTS } from "@/content/projects";
import { waLink } from "@/lib/utils";

export const metadata = {
  title: "Preview",
  description:
    "Contoh desain website hasil kerja tampilin.online — dibuat untuk dipakai, bukan sekadar dipamerkan.",
};

export default function PreviewPage() {
  const shown = Math.min(6, PROJECTS.length);

  return (
    <div>
      {/* HEADER */}
      <section className="border-b border-border bg-paper">
        <div className="section-shell section-pad">
          <Badge tone="flame" dot>
            Preview karya
          </Badge>
          <h1 className="display-lg mt-7 max-w-4xl text-balance">
            Lihat hasil sebelum Anda <span className="text-flame">memutuskan.</span>
          </h1>
          <p className="lede mt-7 max-w-2xl">
            Beberapa website yang kami bangun untuk bisnis dengan konteks, industri, dan
            kebutuhan yang berbeda. Semua dibuat agar mudah dipakai.
          </p>
        </div>
      </section>

      {/* GRID PROYEK */}
      <section className="section-shell pb-16 pt-14 sm:pb-24">
        <div className="mb-8 flex items-center justify-between gap-4">
          <p className="body-sm text-ink-muted">{shown} project terpilih</p>
          <p className="mono-xs text-ink-subtle">UMKM · personal · e-commerce</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {PROJECTS.slice(0, shown).map((project, index) => (
            <Link
              key={project.id}
              href={project.url}
              className="group relative overflow-hidden rounded-card-lg border border-border bg-paper p-4 transition-all duration-standard hover:-translate-y-1 hover:border-flame hover:shadow-layer-2"
            >
              <div
                className="relative flex min-h-64 flex-col justify-between overflow-hidden rounded-card p-6 text-paper sm:min-h-72"
                style={{ background: `linear-gradient(135deg, ${project.g1}, ${project.g2})` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-pill bg-ink/30 px-3 py-1 text-mono-xs font-bold uppercase tracking-[0.06em] backdrop-blur-sm">
                    {project.category}
                  </span>
                  <span className="rounded-pill border border-paper/30 px-3 py-1 text-mono-xs text-paper/80">
                    {project.year}
                  </span>
                </div>
                <div>
                  <p className="font-display text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
                    {project.name}
                  </p>
                  <p className="mt-2 max-w-xs text-caption leading-5 text-paper/75">
                    {project.client}
                  </p>
                </div>
                <span className="absolute bottom-6 right-6 grid h-10 w-10 place-items-center rounded-full bg-paper/20 text-paper opacity-0 transition-opacity duration-standard group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="px-2 pb-2 pt-5">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="heading-md text-ink">{project.name}</h2>
                  <span className="mono-xs text-ink-muted">0{index + 1}</span>
                </div>
                <p className="body-sm mt-2 text-ink-muted">{project.deskripsi}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest section-pad">
        <div className="section-shell grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <Badge tone="lime" dot>
              Punya kebutuhan serupa?
            </Badge>
            <h2 className="display-md mt-6 text-balance text-paper">
              Mari bikin versi yang terasa pas untuk brand Anda.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Link
              href={waLink("Halo tampilin.online, saya melihat preview dan ingin konsultasi.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-card bg-paper px-8 py-5 text-body-lg font-bold text-forest shadow-layer-3 transition-all duration-standard hover:-translate-y-1 hover:bg-lime"
            >
              <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-icon bg-flame/10 text-flame">
                <Sparkles className="h-5 w-5" strokeWidth={2} />
              </span>
              Diskusikan kebutuhan
              <ArrowUpRight className="h-5 w-5 text-flame" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER META */}
      <section className="bg-forest pb-16">
        <div className="section-shell flex flex-col gap-4 border-t border-paper/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="body-sm text-paper/60">
            {SITE.city} · {SITE.hours}
          </p>
          <p className="mono-xs text-paper/50">tampilin.online — preview</p>
        </div>
      </section>
    </div>
  );
}