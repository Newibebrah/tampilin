"use client";

import { useCalculatorStore } from "@/lib/calculator-store";
import { HOSTING, PAKET } from "@/lib/data";
import { formatIdr } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { HostingId } from "@/lib/data";

export function HostingSelector() {
  const { paket, hosting, setHosting } = useCalculatorStore();
  const pkg = PAKET.find((p) => p.id === paket);
  const allowedHosting = pkg ? HOSTING.filter((h) => h.paket.includes(pkg.id)) : [];

  if (!paket || allowedHosting.length === 0) {
    return (
      <fieldset className="space-y-4" aria-hidden="true">
        <legend className="text-lg font-semibold text-ink">3. Hosting</legend>
        <div className="rounded-xl border border-line bg-cream-dim p-6 text-center">
          <p className="text-ink-muted">Pilih paket terlebih dahulu untuk melihat opsi hosting.</p>
        </div>
      </fieldset>
    );
  }

  return (
    <fieldset className="space-y-4">
      <legend className="text-lg font-semibold text-ink">3. Pilih Hosting</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {allowedHosting.map((h) => (
          <button
            key={h.id}
            type="button"
            onClick={() => setHosting(h.id as HostingId)}
            className={cn(
              "flex flex-col items-start gap-2 rounded-xl border p-4 transition-colors duration-150",
              hosting === h.id
                ? "border-ink bg-ink/5"
                : "border-line bg-paper hover:border-accent/50"
            )}
          >
            <div className="flex items-center justify-between w-full">
              <span className={cn("font-semibold", hosting === h.id ? "text-ink" : "text-ink")}>
                {h.nama}
              </span>
              <span className={cn("font-semibold", hosting === h.id ? "text-accent" : "text-ink")}>
                {h.harga === 0 ? "Gratis" : `${formatIdr(h.harga)}/tahun`}
              </span>
            </div>
            {h.id !== "none" && (
              <p className="text-xs text-ink-muted w-full">
                {h.id === "free" && "Cocok untuk landing page & company profile statis"}
                {h.id === "shared" && "Support form, email, dan PHP sederhana"}
                {h.id === "backend" && "VPS untuk Next.js backend, database, API"}
              </p>
            )}
          </button>
        ))}
      </div>
    </fieldset>
  );
}