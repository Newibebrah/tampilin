"use client";

import { useCalculatorStore } from "@/lib/calculator-store";
import { DOMAIN } from "@/lib/data";
import { formatIdr } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { DomainId } from "@/lib/data";

export function DomainSelector() {
  const { domain, setDomain } = useCalculatorStore();

  return (
    <fieldset className="space-y-4">
      <legend className="text-lg font-semibold text-ink">2. Pilih Domain</legend>
      <p className="text-sm text-ink-muted">Sudah punya domain? Pilih "Tanpa domain" dan arahkan nameserver nanti.</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {DOMAIN.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setDomain(d.id as DomainId)}
            className={cn(
              "flex items-center justify-between rounded-xl border p-4 transition-colors duration-150",
              domain === d.id
                ? "border-ink bg-ink/5"
                : "border-line bg-paper hover:border-accent/50"
            )}
          >
            <div className="flex items-center gap-3">
              <span className={cn("font-mono text-lg font-semibold", domain === d.id ? "text-accent" : "text-ink")}>
                {d.nama}
              </span>
            </div>
            <span className={cn("font-semibold", domain === d.id ? "text-accent" : "text-ink")}>
              {d.harga === 0 ? "Gratis" : formatIdr(d.harga)}
            </span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}