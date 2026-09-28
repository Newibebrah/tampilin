import { ArrowUpRight, Check, Clock3, Coffee, MapPin } from "lucide-react";
import { Badge } from "@/components/Badge";
import { IconContainer } from "@/components/IconContainer";
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

const BEHIND = [
  { icon: Check, title: "Desain & kode", desc: "Satu orang mengoordinasikan dari brief sampai live agar hasil dan komunikasi tetap konsisten." },
  { icon: MapPin, title: "Remote, Indonesia", desc: "Kami bekerja dengan klien di berbagai kota. Komunikasi bisa lewat WhatsApp atau video call." },
  { icon: Coffee, title: "Detail yang terasa", desc: "Kami memusatkan perhatian pada tipografi, jarak, dan alur agar website terasa tenang saat digunakan." },
] as const;

export default function TentangPage() {
  return (
    <div>
      {/* HEADER — Editorial Split */}
      <section className="border-b border-border bg-paper">
        <div className="section-shell section-pad grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Badge tone="flame" dot>
              Tentang kami
            </Badge>
            <h1 className="display-lg mt-7 max-w-3xl text-balance">
              Website yang dibuat dengan <span className="text-flame">pemahaman</span> dan niat.
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="lede max-w-xl">
              {SITE.tagline} Kami adalah tim kecil yang fokus membangun website custom untuk
              personal brand, UMKM, dan toko online.
            </p>
            <a
              href={waLink("Halo tampilin.online, saya ingin tahu lebih lanjut tentang tim Anda.")}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary mt-7"
            >
              Ngobrol dengan kami
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ANGKA — Number Highlight */}
      <section className="section-shell py-14 sm:py-16">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {FACTS.map((fact) => (
            <div
              key={fact.label}
              className="rounded-card border border-border bg-paper-subtle p-6"
            >
              <p className="font-display text-3xl font-extrabold tracking-[-0.04em] text-ink sm:text-4xl">
                {fact.value}
              </p>
              <p className="mt-2 text-caption leading-5 text-ink-muted">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NILAI — Bento 2x2 */}
      <section className="border-y border-border bg-paper-subtle section-pad">
        <div className="section-shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Badge tone="flame" dot>
              Cara kami bekerja
            </Badge>
            <h2 className="display-md mt-6 text-balance">
              Nilai yang hadir di setiap halaman dan setiap percakapan.
            </h2>
            <p className="lede mt-6">
              Karena website yang baik bukan cuma soal visual. Ia harus mencerminkan apa
              yang bisnis Anda butuhkan.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {VALUES.map((value) => (
              <article
                key={value.no}
                className="rounded-card-lg border border-border bg-paper p-7 transition-all duration-standard hover:-translate-y-1 hover:border-flame hover:shadow-layer-2"
              >
                <div className="flex items-center justify-between">
                  <span className="mono-xs text-flame">{value.no}</span>
                  <span className="h-2 w-2 rounded-full bg-lime" />
                </div>
                <h3 className="heading-md mt-7 text-ink">{value.title}</h3>
                <p className="body-sm mt-3 text-ink-muted">{value.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DI BALIK LAYAR — Full-Bleed Forest */}
      <section className="bg-forest section-pad">
        <div className="section-shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Badge tone="lime" dot>
              Di balik layar
            </Badge>
            <h2 className="display-md mt-6 text-balance text-paper">
              Satu tim kecil, proses yang tetap besar.
            </h2>
            <p className="body-lg mt-6 max-w-md text-paper/70">
              Tidak ada serah-terima yang membuat Anda kehilangan konteks. Dari brief sampai
              go-live, Anda tahu apa yang sedang dikerjakan.
            </p>
            <a
              href={waLink("Halo tampilin.online, saya mau berkenalan dengan tim tampilin.online.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 body-sm font-bold text-lime transition-colors duration-micro hover:text-paper"
            >
              Kenalan lebih jauh
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="space-y-4 lg:col-span-7">
            {BEHIND.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-5 rounded-card border border-paper/10 bg-paper/[0.04] p-6 transition-all duration-standard hover:border-lime/40 hover:bg-paper/[0.08]"
              >
                <IconContainer tone="lime" size="md">
                  <Icon strokeWidth={2} />
                </IconContainer>
                <div>
                  <h3 className="heading-sm text-paper">{title}</h3>
                  <p className="body-sm mt-2 text-paper/70">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOKASI — Forest continuation */}
      <section className="bg-forest pb-20">
        <div className="section-shell flex flex-col gap-4 border-t border-paper/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="body-sm text-paper/60">
            {SITE.city} · {SITE.hours}
          </p>
          <span className="flex items-center gap-2 body-sm text-paper/60">
            <Clock3 className="h-4 w-4 text-lime" strokeWidth={2} />
            Respons chat biasanya di bawah 1 jam
          </span>
        </div>
      </section>
    </div>
  );
}
