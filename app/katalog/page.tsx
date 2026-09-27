import { ArrowUpRight, Check, Clock3 } from "lucide-react";
import { cn, formatIdr, waLink } from "@/lib/utils";
import { SITE } from "@/content/site";
import { PAKET, DOMAIN, HOSTING, ADDON } from "@/lib/data";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata = {
  title: "Katalog & Harga",
  description: "Harga jelas, no bonus kejutan. Tiap paket sudah termasuk desain custom, hosting siap pakai, dan garansi revisi.",
};

function getHostingForPaket(paketId: string) {
  return HOSTING.filter((h) => h.paket.includes(paketId));
}

export default function KatalogPage() {
  return (
    <main>
      <section className="border-b border-line bg-canvas">
        <div className="section-shell py-20 sm:py-28 lg:py-32">
          <SectionLabel no="02" label="Katalog" />
          <h1 className="display-title mt-7 max-w-4xl">Pilih paket yang <span className="text-accent">paling pas</span> untuk bisnis Anda.</h1>
          <p className="lede mt-7 max-w-2xl">Harga jelas, no bonus kejutan. Tiap paket sudah termasuk desain custom, hosting siap pakai, dan garansi revisi.</p>
          <div className="mt-9 flex flex-wrap gap-2">
            <span className="rounded-full border border-ink bg-ink px-4 py-2 text-xs font-medium text-white">Semua</span>
            <span className="rounded-full border border-line bg-paper px-4 py-2 text-xs font-medium text-ink-muted">Personal</span>
            <span className="rounded-full border border-line bg-paper px-4 py-2 text-xs font-medium text-ink-muted">UMKM</span>
            <span className="rounded-full border border-line bg-paper px-4 py-2 text-xs font-medium text-ink-muted">E-Commerce</span>
          </div>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-24">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-ink-muted">Harga dalam Rupiah · estimasi ditulis terbuka</p>
          <p className="flex items-center gap-2 text-sm text-ink-muted"><Clock3 className="h-4 w-4" /> Timeline ditulis jelas di setiap paket</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {PAKET.map((paket) => {
            const hostingOptions = getHostingForPaket(paket.id);
            const freeHosting = hostingOptions.find((h) => h.harga === 0);
            const paidHosting = hostingOptions.find((h) => h.harga > 0);
            return (
              <article
                key={paket.id}
                className={cn(
                  "flex flex-col rounded-2xl border p-7 shadow-card sm:p-8",
                  paket.id === "landing" ? "border-ink bg-ink text-white" : "border-line bg-paper text-ink",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-ink-muted">{paket.id === "landing" ? "01" : paket.id === "umkm" ? "02" : "03"}</span>
                    <span className={cn("rounded-full px-3 py-1 text-[11px] font-semibold", paket.id === "landing" ? "bg-accent text-white" : "bg-cream-dim text-ink-soft")}>
                      {paket.id === "landing" ? "Personal" : paket.id === "umkm" ? "UMKM" : "E-Commerce"}
                    </span>
                  </div>
                  {paket.id === "landing" && <span className="text-xs font-semibold text-lime">Paling populer</span>}
                </div>

                <h2 className="mt-8 text-3xl font-semibold tracking-[-0.04em]">{paket.nama}</h2>
                <p className={cn("mt-3 max-w-xl text-sm leading-6", paket.id === "landing" ? "text-white/60" : "text-ink-muted")}>{paket.deskripsi}</p>

                <div className="mt-8 border-y py-5" style={{ borderColor: paket.id === "landing" ? "rgba(255,255,255,.12)" : undefined }}>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-3xl font-semibold tracking-[-0.04em]">Rp{paket.hargaDiskon.toLocaleString("id-ID")}</span>
                    <span className={cn("text-xs line-through", paket.id === "landing" ? "text-white/50" : "text-ink-muted")}>Rp{paket.hargaNormal.toLocaleString("id-ID")}</span>
                  </div>
                  <p className={cn("mt-2 text-xs", paket.id === "landing" ? "text-white/50" : "text-ink-muted")}>Estimasi {paket.estimasiHari} hari kerja</p>
                </div>

                <ul className="mt-7 flex-1 space-y-3">
                  {paket.fitur.map((feature) => (
                    <li key={feature} className={cn("flex items-start gap-3 text-sm", paket.id === "landing" ? "text-white/75" : "text-ink-soft")}>
                      <Check className={cn("mt-0.5 h-4 w-4 shrink-0", paket.id === "landing" ? "text-lime" : "text-accent")} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t pt-4" style={{ borderColor: paket.id === "landing" ? "rgba(255,255,255,.12)" : undefined }}>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
                    <span>Domain: </span>
                    <span className="font-medium">Termasuk 1 tahun</span>
                    <span className="mx-1">·</span>
                    <span>Hosting: </span>
                    <span className="font-medium">{freeHosting ? "Gratis (Netlify/Cloudflare)" : paidHosting ? `${formatIdr(paidHosting.harga)}/tahun` : "Tidak termasuk"}</span>
                  </div>
                </div>

                <a
                  href={waLink(`Halo ${SITE.name}, saya pilih paket *${paket.nama}* (Rp${paket.hargaDiskon.toLocaleString("id-ID")}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "mt-6 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors duration-150",
                    paket.id === "landing" ? "bg-accent text-white hover:bg-accent-deep" : "bg-ink text-white hover:bg-deep",
                  )}
                >
                  Pesan paket ini
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-line bg-cream-dim p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-ink">Butuh custom atau punya kebutuhan khusus?</h2>
            <p className="mt-2 text-sm leading-6 text-ink-muted">Ceritakan skopnya. Kami bantu susuri solusi yang paling masuk akal.</p>
          </div>
          <a
            href={waLink("Halo tampilin.online, saya punya kebutuhan website custom.")}
            target="_blank"
            rel="noopener noreferrer"
            className="button-secondary shrink-0"
          >
            Konsultasi custom
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="section-shell py-24 sm:py-32">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <SectionLabel no="03" label="Kalkulator Harga" />
              <h2 className="section-title mt-6 max-w-xl">Hitung total biaya lengkap dengan domain, hosting, dan add-on.</h2>
            </div>
            <a href="/kalkulator" className="button-primary shrink-0">
              Buka Kalkulator
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="section-shell pb-24 sm:pb-32">
        <div className="grid gap-10 rounded-3xl bg-deep p-8 text-white sm:p-12 lg:grid-cols-[0.8fr_1.2fr] lg:p-16">
          <div>
            <p className="eyebrow text-lime">Add-on Tersedia</p>
            <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
              Tambahkan layanan sesuai kebutuhan, tanpa paket bundling.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ADDON.map((a) => (
              <div key={a.id} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold">{a.nama}</h3>
                <p className="mt-1 text-sm text-white/60">+ {formatIdr(a.harga)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}