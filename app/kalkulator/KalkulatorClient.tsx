"use client";

import { useCalculatorStore } from "@/lib/calculator-store";
import { PAKET } from "@/lib/data";
import { formatIdr } from "@/lib/utils";
import { PaketSelector } from "./PaketSelector";
import { DomainSelector } from "./DomainSelector";
import { HostingSelector } from "./HostingSelector";
import { AddonSelector } from "./AddonSelector";
import { ReffInput } from "./ReffInput";
import { PriceSummary } from "./PriceSummary";
import { ArrowUpRight, MessageCircle, Calculator } from "lucide-react";
import { SectionLabel } from "@/components/SectionLabel";
import { waLink } from "@/lib/utils";
import { SITE } from "@/content/site";

export function KalkulatorClient() {
  const { paket, getTotals } = useCalculatorStore();
  const totals = getTotals();

  return (
    <main>
      <section className="border-b border-line bg-canvas">
        <div className="section-shell py-20 sm:py-28 lg:py-32">
          <SectionLabel no="01" label="Kalkulator" />
          <h1 className="display-title mt-7 max-w-4xl">Hitung biaya website Anda dengan <span className="text-accent">transparan.</span></h1>
          <p className="lede mt-7 max-w-2xl">Pilih paket, domain, hosting, dan tambahan. Total terupdate otomatis — tidak ada biaya tersembunyi.</p>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
          <div className="space-y-8">
            <PaketSelector />
            <DomainSelector />
            <HostingSelector />
            <AddonSelector />
            <ReffInput />
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <PriceSummary />
            {paket && (
              <a
                href={waLink(`Halo ${SITE.name}, saya mau pesan paket *${PAKET.find((p) => p.id === paket)?.nama}* dengan total *${formatIdr(totals.total)}*.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary mt-6 w-full justify-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Pesan via WhatsApp
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {!paket && (
              <p className="mt-6 text-center text-sm text-ink-muted">
                Pilih paket terlebih dahulu untuk melihat ringkasan biaya.
              </p>
            )}
          </aside>
        </div>
      </section>

      <section className="border-t border-line bg-cream-dim">
        <div className="section-shell flex flex-col gap-8 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-20">
          <div>
            <p className="eyebrow">Masih ragu paket mana yang cocok?</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.04em] text-ink sm:text-4xl">
              Lihat detail di halaman Katalog atau konsultasi langsung.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/katalog" className="button-secondary">
              Lihat Katalog
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={waLink("Halo tampilin.online, saya butuh bantuan memilih paket yang pas.")}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary"
            >
              <Calculator className="h-4 w-4" />
              Konsultasi Paket
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}