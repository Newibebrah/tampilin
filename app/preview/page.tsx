import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/Marquee";
import { Reveal, ClipReveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { SectionLabel } from "@/components/SectionLabel";
import { SITE } from "@/content/site";

export const metadata = {
  title: "Preview",
  description: "Contoh desain website hasil kerja tampilin.online — beneran kami kerjain, bukan template.",
};

export default function PreviewPage() {
  return (
    <>
      <main className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <SectionLabel no="02" label="Preview" />
          <h1 className="mt-6 max-w-3xl font-serif text-6xl font-black leading-[0.9] tracking-tighter md:text-7xl">
            Lihat tampilan,{" "}
            <span className="relative inline-block">
              <em className="relative z-10">sebelum</em>
              <span className="absolute inset-x-0 bottom-1 z-0 h-3 -rotate-1 bg-accent" />
            </span>{" "}
            pesan.
          </h1>
          <p className="mt-8 max-w-xl font-serif text-xl leading-snug text-ink/70">
            Halaman preview biar kamu nggak nebak-nebak hasilnya. Semua project di bawah
            ini dikerjain beneran oleh tampilin.online buat klien, bukan mockup.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-12">
          {/* ===== BESAR (unggulan) ===== */}
          <StaggerGroup className="md:col-span-7">
            <StaggerItem>
              <article className="group relative overflow-hidden rounded-[2rem] border-2 border-ink bg-deep p-8 pb-12 shadow-hard-sm md:min-h-[28rem]">
                <span className="absolute -right-6 -top-6 h-40 w-40 -rotate-12 rounded-full bg-accent/20 blur-2xl" />
                <p className="font-mono text-sm uppercase tracking-[0.3em] text-cream/40">Feature — 2025</p>
                <h3 className="mt-8 max-w-md font-serif text-4xl font-black leading-[0.9] tracking-tight text-cream md:text-5xl">
                  Nama Project Besar
                </h3>
                <p className="mt-4 max-w-sm font-mono text-sm text-cream/60">
                  Deskripsi singkat project unggulan yang paling mewakili gaya tampilin.online.
                </p>
                <span className="mt-10 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wide text-accent">
                  Lihat studi kasus <ArrowUpRight className="h-4 w-4" />
                </span>
              </article>
            </StaggerItem>
          </StaggerGroup>

          <div className="grid gap-6 md:col-span-5">
            {[
              { title: "Project Dua", tag: "UMKM" },
              { title: "Project Tiga", tag: "E-Commerce" },
            ].map((proj) => (
              <article key={proj.title} className="group overflow-hidden rounded-[2rem] border-2 border-ink bg-paper p-6 shadow-hard-sm transition-transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-wide text-accent">{proj.tag}</span>
                  <ArrowUpRight className="h-4 w-4 text-ink/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="mt-8 h-28 rounded-2xl bg-gradient-to-br from-deep to-accent/40" />
                <h4 className="mt-6 font-serif text-2xl font-black tracking-tight">{proj.title}</h4>
                <p className="mt-2 font-mono text-xs text-ink/50">Deskripsi singkat project ini.</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-[2rem] border-2 border-ink bg-lime p-10 md:p-16">
          <p className="font-mono text-sm font-bold uppercase tracking-[0.3em] text-ink/60">Cinematic scroll</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl font-black leading-[0.9] tracking-tight md:text-6xl">
            Mau lihat preview <span className="text-accent">asli</span> yang bisa kamu scroll?
          </h2>
          <Link href="/preview" className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-mono text-sm font-bold uppercase tracking-wide text-cream">
            <Sparkles className="h-4 w-4" /> Ke halaman preview penuh
          </Link>
        </div>
      </main>
    </>
  );
}
