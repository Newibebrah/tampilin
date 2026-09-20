import Link from "next/link";
import { ArrowUpRight, MapPin, Clock, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/SectionLabel";
import { Marquee } from "@/components/Marquee";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { SITE } from "@/content/site";

export const metadata = {
  title: "Tentang tampilin.online",
  description: `Kenalan sama tampilin.online — ${SITE.tagline}.`,
};

const FACTS = [
  { label: "Mulai", value: "2025" },
  { label: "Proyek selesai", value: "24+" },
  { label: "Revisi rata-rata", value: "2x" },
  { label: "Pengerjaan", value: "5–14 hari" },
] as const;

const VALUES = [
  { no: "01", title: "Transparan", desc: "Harga final di depan. Nggak ada plus-plus misterius pas di akhir." },
  { no: "02", title: "Custom", desc: "Bukan template serumpit-LPG. Tiap halaman dibikin dari nol sesuai brand kamu." },
  { no: "03", title: "Cepat", desc: "Bisnis butuh tampil segera. Pengerjaan 5–14 hari kerja, bukan berbulan-bulan." },
  { no: "04", title: "Jujur", desc: "Kalau nggak bisa, bilang nggak bisa. Kalau bisa, kita kerjain beneran." },
] as const;

export default function TentangPage() {
  return (
    <main className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <SectionLabel no="03" label="Tentang" />
        <h1 className="mt-6 max-w-3xl font-serif text-6xl font-black leading-[0.9] tracking-tighter md:text-8xl">
          Website yang{" "}
          <span className="relative inline-block">
            <em className="relative z-10">dibuat</em>
            <span className="absolute inset-x-0 bottom-1 z-0 h-3 -rotate-1 bg-accent" />
          </span>{" "}
          biar bisnis mu nggak numpang tampil.
        </h1>
        <p className="mt-8 max-w-2xl font-serif text-xl leading-normal text-ink/70 md:text-2xl">
          {SITE.tagline} Kami bukan agensi gede. Kami tim kecil yang fokus ngerjain
          website custom buat personal, UMKM, dan toko online yang mau langsung
          dipakai — bukan cuma koleksi mockup.
        </p>
      </div>

      {/* ====== FAKTA ====== */}
      <section className="mt-16">
        <StaggerGroup className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
          {FACTS.map((f) => (
            <StaggerItem key={f.label} className="border-2 border-ink/10 p-6 [&:not(:first-child)]:border-l-0 md:[&:not(:first-child)]:border-l-2">
              <span className="font-serif text-5xl font-black tracking-tighter text-accent">{f.value}</span>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-ink/50">{f.label}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* ====== VALUES ====== */}
      <section className="mt-24">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-sm font-bold uppercase tracking-[0.3em] text-accent">Cara kami kerja</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl font-black leading-[0.9] tracking-tight md:text-5xl">
            Valor yang hadir di tiap halaman.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {VALUES.map((v) => (
              <Reveal key={v.no}>
                <article className="group h-full rounded-[2rem] border-2 border-ink bg-paper p-8 shadow-hard-sm transition-transform hover:-translate-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-sm font-bold text-ink/30">{v.no}</span>
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  </div>
                  <h3 className="mt-6 font-serif text-3xl font-black tracking-tight">{v.title}</h3>
                  <p className="mt-3 font-mono text-sm leading-relaxed text-ink/60">{v.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====== ORANG DI BALIK ====== */}
      <section className="mt-24 grid gap-8 rounded-[2.5rem] bg-deep p-10 text-cream md:grid-cols-12 md:p-16">
        <div className="md:col-span-5">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cream/40">Orang di baliknya</p>
          <h2 className="mt-5 font-serif text-4xl font-black leading-[0.95] tracking-tight md:text-5xl">
            Satu tim kecil, <em className="text-accent">nggak kedinginan.</em>
          </h2>
        </div>
        <div className="space-y-5 md:col-span-6 md:col-start-7">
          {[
            ["Desain & kode", "Satu orang ngerjain dari brief sampai live — biar konsisten, nggak ketuker arah."],
            ["Remote, Indonesia", "Kerja dari mana aja. Kamu di kota mana pun tetap bisa kolaborasi via WhatsApp & video call."],
            ["Kopi hangat", "Oke ini nggak penting, tapi jujur aja bisa bikin website-nya lebih cepat selesai."],
          ].map(([t, d]) => (
            <div key={t} className="flex items-start gap-4">
              <Coffee className="mt-1 h-5 w-5 shrink-0 text-accent" />
              <div>
                <h4 className="font-serif text-xl font-black">{t}</h4>
                <p className="mt-1 font-mono text-sm leading-relaxed text-cream/60">{d}</p>
              </div>
            </div>
          ))}
          <Link href="/kontak" className="inline-flex items-center gap-2 pt-3 font-mono text-sm font-bold uppercase tracking-wide text-accent">
            Kenalan lebih jauh <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
