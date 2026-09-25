import { ArrowUpRight, Check, Clock3, Coffee, MapPin } from "lucide-react";
import { SectionLabel } from "@/components/SectionLabel";
import { SITE } from "@/content/site";
import { waLink } from "@/lib/utils";

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
  { no: "01", title: "Transparan", desc: "Harga final di depan. Tidak ada biaya tambahan yang muncul diam-diam di akhir proyek." },
  { no: "02", title: "Custom", desc: "Setiap halaman dibangun dari nol sesuai karakter, kebutuhan, dan cara bisnis Anda bekerja." },
  { no: "03", title: "Cepat", desc: "Bisnis butuh tampil segera. Kami menjaga timeline tanpa mengorbankan kualitas hasil." },
  { no: "04", title: "Jujur", desc: "Kalau belum bisa, kami bilang. Kalau bisa, kami kerjakan dengan komitmen yang jelas." },
] as const;

export default function TentangPage() {
  return (
    <main>
      <section className="border-b border-line bg-canvas">
        <div className="section-shell grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-32">
          <div>
            <SectionLabel no="03" label="Tentang kami" />
            <h1 className="display-title mt-7 max-w-3xl">Website yang dibuat dengan <span className="text-accent">pemahaman</span> dan niat.</h1>
          </div>
          <div>
            <p className="lede max-w-xl">{SITE.tagline} Kami adalah tim kecil yang fokus membangun website custom untuk personal brand, UMKM, dan toko online.</p>
            <a
              href={waLink("Halo tampilin.online, saya ingin tahu lebih lanjut tentang tim Anda.")}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary mt-7"
            >
              Ngobrol dengan kami
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-24">
        <div className="grid grid-cols-2 border-y border-line md:grid-cols-4">
          {FACTS.map((fact, index) => (
            <div key={fact.label} className={`px-1 py-7 sm:px-6 ${index % 2 === 0 ? "border-r border-line" : ""} ${index < 2 ? "border-b border-line md:border-b-0" : ""} md:border-r md:last:border-r-0`}>
              <p className="text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">{fact.value}</p>
              <p className="mt-2 text-xs leading-5 text-ink-muted">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="section-shell py-24 sm:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <SectionLabel no="04" label="Cara kami bekerja" />
              <h2 className="section-title mt-6 max-w-md">Nilai yang hadir di setiap halaman dan setiap percakapan.</h2>
              <p className="lede mt-6 max-w-md">Karena website yang baik bukan cuma soal visual. Ia harus mencerminkan apa yang bisnis Anda butuhkan.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {VALUES.map((value) => (
                <article key={value.no} className="rounded-2xl border border-line bg-canvas p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-ink-muted">{value.no}</span>
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  </div>
                  <h3 className="mt-8 text-xl font-semibold tracking-[-0.03em] text-ink">{value.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-muted">{value.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-24 sm:py-32">
        <div className="grid gap-10 rounded-3xl bg-deep p-8 text-white sm:p-12 lg:grid-cols-[0.85fr_1.15fr] lg:p-16">
          <div>
            <p className="eyebrow text-lime">Di balik layar</p>
            <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">Satu tim kecil, proses yang tetap besar.</h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/60">Tidak ada serah-terima yang membuat Anda kehilangan konteks. Dari brief sampai go-live, Anda tahu apa yang sedang dikerjakan.</p>
          </div>
          <div className="space-y-7">
            {[
              { icon: Check, title: "Desain & kode", desc: "Satu orang mengoordinasikan dari brief sampai live agar hasil dan komunikasi tetap konsisten." },
              { icon: MapPin, title: "Remote, Indonesia", desc: "Kami bekerja dengan klien di berbagai kota. Komunikasi bisa lewat WhatsApp atau video call." },
              { icon: Coffee, title: "Detail yang terasa", desc: "Kami memusatkan perhatian pada tipografi, jarak, dan alur agar website terasa tenang saat digunakan." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-lime"><Icon className="h-4 w-4" /></span>
                <div>
                  <h3 className="text-base font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-white/60">{desc}</p>
                </div>
              </div>
            ))}
            <a
              href={waLink("Halo tampilin.online, saya mau berkenalan dengan tim tampilin.online.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 pt-2 text-sm font-semibold text-lime transition-colors duration-150 hover:text-white"
            >
              Kenalan lebih jauh
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-cream-dim">
        <div className="section-shell flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between sm:py-16">
          <div>
            <p className="eyebrow">Lokasi & waktu</p>
            <p className="mt-3 text-sm text-ink-soft">{SITE.city} · {SITE.hours}</p>
          </div>
          <span className="flex items-center gap-2 text-sm text-ink-muted"><Clock3 className="h-4 w-4" /> Respons chat biasanya di bawah 1 jam</span>
        </div>
      </section>
    </main>
  );
}
