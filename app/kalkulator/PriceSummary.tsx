"use client";

import { useCalculatorStore } from "@/lib/calculator-store";
import { PAKET, DOMAIN, HOSTING, ADDON } from "@/lib/data";
import { formatIdr } from "@/lib/utils";
import { Minus, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

export function PriceSummary() {
  const { paket, domain, hosting, addons, reffValid, getTotals } = useCalculatorStore();
  const totals = getTotals();
  const pkg = paket ? PAKET.find((p) => p.id === paket) : null;
  const dom = DOMAIN.find((d) => d.id === domain);
  const host = HOSTING.find((h) => h.id === hosting);

  return (
    <div className="rounded-2xl border border-line bg-paper p-6 shadow-card sticky top-24">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-ink">Ringkasan Biaya</h2>
        <Tag className="h-5 w-5 text-ink-muted" />
      </div>

      <dl className="mt-6 space-y-4 border-y border-line py-4">
        {pkg && (
          <div className="flex items-center justify-between gap-4">
            <dt className="text-sm text-ink-soft">{pkg.nama}</dt>
            <dd className="font-semibold text-ink text-right">{formatIdr(totals.paketHarga)}</dd>
          </div>
        )}
        {dom && dom.harga > 0 && (
          <div className="flex items-center justify-between gap-4">
            <dt className="text-sm text-ink-soft">Domain {dom.nama}</dt>
            <dd className="font-semibold text-ink text-right">{formatIdr(totals.domainHarga)}</dd>
          </div>
        )}
        {host && host.harga > 0 && (
          <div className="flex items-center justify-between gap-4">
            <dt className="text-sm text-ink-soft">Hosting {host.nama}</dt>
            <dd className="font-semibold text-ink text-right">{formatIdr(totals.hostingHarga)}/tahun</dd>
          </div>
        )}
        {addons.length > 0 && (
          <div>
            <dt className="text-sm text-ink-soft">Add-on</dt>
            <dd className="mt-2 space-y-1">
              {addons.map((id) => {
                const a = ADDON.find((ad) => ad.id === id);
                return a ? (
                  <div key={a.id} className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-ink-soft">{a.nama}</span>
                    <span className="font-medium text-ink">{formatIdr(a.harga)}</span>
                  </div>
                ) : null;
              })}
            </dd>
          </div>
        )}
      </dl>

      <div className="border-t border-line pt-4 space-y-3">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-ink-soft">Subtotal</span>
          <span className="font-semibold text-ink">{formatIdr(totals.subtotal)}</span>
        </div>
        {reffValid && totals.diskonReff > 0 && (
          <div className="flex items-center justify-between gap-4 text-accent">
            <span className="flex items-center gap-2 text-sm">
              <Minus className="h-4 w-4" /> Diskon Referral
            </span>
            <span className="font-semibold">- {formatIdr(totals.diskonReff)}</span>
          </div>
        )}
        <div className="border-t border-line pt-3">
          <div className="flex items-center justify-between gap-4">
            <span className="text-lg font-semibold text-ink">Total</span>
            <span className="text-2xl font-semibold tracking-[-0.04em] text-accent">{formatIdr(totals.total)}</span>
          </div>
          <p className="mt-2 text-xs text-ink-muted text-center">
            {paket ? "Termasuk revisi 2x, setup domain & hosting, pelatihan kelola konten" : "Pilih paket untuk melihat detail"}
          </p>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-ink-muted">
        Harga final, tidak ada biaya tersembunyi. Pembayaran: DP 50% mulai, 50% sebelum go-live.
      </p>
    </div>
  );
}