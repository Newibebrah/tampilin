"use client";

import { ArrowUpRight, Calculator, Clock, Globe } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { formatIdr, waLink } from "@/lib/utils";
import { PAKET, HOSTING, ADDON } from "@/lib/data";
import { Badge } from "@/components/Badge";
import { ServiceGrid, type Service } from "@/components/sections/ServiceGrid";
import { RevealMask } from "@/components/sections/RevealMask";

const hostingFor = (id: string) => HOSTING.filter((h) => h.paket.includes(id));
const addonsFor = (id: string) => ADDON.filter((a) => a.paket.includes(id));

export default function LayananPage() {
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
      {/* HEADER — Editorial */}
      <section className="relative overflow-hidden border-b border-border bg-paper">
        <div className="section-shell section-pad">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge tone="flame" dot pulse className="mx-auto">
                Layanan
              </Badge>
            </motion.div>

            <motion.h1
              className="display-lg mt-7 text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              Pilih paket yang <span className="text-flame-hover">paling pas</span> untuk bisnis Anda.
            </motion.h1>

            <motion.p
              className="lede mx-auto mt-6 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              Harga jelas, no bonus kejutan. Tiap paket sudah termasuk desain custom, hosting siap pakai, dan garansi revisi.
            </motion.p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <span className="flex items-center gap-2 body-sm text-ink-muted">
                <Globe className="h-4 w-4 text-flame-hover" strokeWidth={2} />
                Harga dalam Rupiah · estimasi ditulis terbuka
              </span>
              <span className="flex items-center gap-2 body-sm text-ink-muted">
                <Clock className="h-4 w-4 text-flame-hover" strokeWidth={2} />
                Timeline ditulis jelas di setiap paket
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 PAKET — Card Grid, kartu populer dibesarkan */}
      <section className="section-shell section-pad">
        <ServiceGrid
          services={services}
          footnote={(service) => {
            const options = hostingFor(service.id);
            const free = options.find((h) => h.harga === 0);
            const paid = options.find((h) => h.harga > 0);
            const hostingLabel = free
              ? "Gratis (Netlify/Cloudflare)"
              : paid
                ? `${formatIdr(paid.harga)}/tahun`
                : "Tidak termasuk";
            return (
              <>
                <span>Domain: </span>
                <span className={service.isPopular ? "font-bold text-lime" : "font-semibold text-ink"}>
                  Termasuk 1 tahun
                </span>
                <span aria-hidden="true">·</span>
                <span>Hosting: </span>
                <span className={service.isPopular ? "font-bold text-lime" : "font-semibold text-ink"}>
                  {hostingLabel}
                </span>
                <span aria-hidden="true">·</span>
                <span>{addonsFor(service.id).length} add-on tersedia</span>
              </>
            );
          }}
          onOrder={(id) => router.push(`/harga?paket=${id}`)}
        />

        {/* CUSTOM CTA */}
        <RevealMask delay={300} className="mt-14">
          <div className="flex flex-col gap-6 rounded-card-lg border border-border bg-paper-subtle p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
            <div>
              <h2 className="heading-md text-ink">Butuh custom atau punya kebutuhan khusus?</h2>
              <p className="body-sm mt-2 text-ink-muted">
                Ceritakan skopnya. Kami bantu susuri solusi yang paling masuk akal.
              </p>
            </div>
            <a
              href={waLink("Halo tampilin.online, saya punya kebutuhan website custom.")}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary w-full shrink-0 sm:w-auto lg:self-auto"
            >
              Konsultasi custom
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>
        </RevealMask>
      </section>

      {/* SIMULASI HARGA — Full-Bleed Forest */}
      <section className="relative overflow-hidden bg-forest section-pad">
        <div className="section-shell grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Badge tone="lime" dot pulse>
              Langkah berikutnya
            </Badge>
            <h2 className="display-md mt-6 max-w-xl text-balance text-paper">
              Pilih paketnya, angkanya <span className="text-lime">muncul sendiri</span>.
            </h2>
            <p className="body-lg mt-5 max-w-lg text-paper/70">
              Domain, hosting, dan CMS ikut dihitung di dalamnya — jadi tidak ada komponen
              yang terlewat saat Anda membandingkan opsi.
            </p>
          </div>

          <div>
            <Link href="/harga" className="button-lime button-lime-lg w-full justify-center sm:w-auto">
              <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-icon bg-forest text-lime">
                <Calculator className="h-5 w-5" strokeWidth={2} />
              </span>
              Mulai Simulasi Harga
              <ArrowUpRight className="h-5 w-5 text-flame-hover" />
            </Link>
            <p className="mt-4 body-sm text-paper/50">
              Tidak ada komitmen · Bisa dibatalkan kapan saja · Estimasi akurat
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
