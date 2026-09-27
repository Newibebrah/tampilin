"use client";

import { useCalculatorStore } from "@/lib/calculator-store";
import { ADDON } from "@/lib/data";
import { formatIdr } from "@/lib/utils";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AddonId } from "@/lib/data";

export function AddonSelector() {
  const { addons, toggleAddon } = useCalculatorStore();

  return (
    <fieldset className="space-y-4">
      <legend className="text-lg font-semibold text-ink">4. Tambahkan Layanan (Opsional)</legend>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ADDON.map((a) => {
          const isSelected = (addons as string[]).includes(a.id);
          return (
            <label
              key={a.id}
              className={cn(
                "flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition-colors duration-150",
                isSelected
                  ? "border-accent bg-accent/5"
                  : "border-line bg-paper hover:border-accent/50"
              )}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleAddon(a.id as AddonId)}
                className={cn(
                  "mt-0.5 h-4 w-4 rounded border-ink text-accent focus:ring-accent",
                  "appearance-none border transition-colors"
                )}
              />
              <div className="flex-1">
                <span className={cn("font-medium", isSelected ? "text-ink" : "text-ink-soft")}>
                  {a.nama}
                </span>
                <p className="mt-0.5 text-xs text-ink-muted">+ {formatIdr(a.harga)}</p>
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}