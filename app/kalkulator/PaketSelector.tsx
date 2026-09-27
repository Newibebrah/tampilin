"use client";

import { useCalculatorStore } from "@/lib/calculator-store";
import { PAKET } from "@/lib/data";
import { Check, Globe, Users, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PaketId } from "@/lib/data";

const ICONS = {
  landing: Globe,
  umkm: Users,
  ecommerce: ShoppingCart,
} as const;

export function PaketSelector() {
  const { paket, setPaket } = useCalculatorStore();

  return (
    <fieldset className="space-y-4">
      <legend className="text-lg font-semibold text-ink">1. Pilih Paket</legend>
      <div className="grid gap-4 sm:grid-cols-3">
        {PAKET.map((p) => {
          const isSelected = paket === p.id;
          const Icon = ICONS[p.id as keyof typeof ICONS];
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setPaket(p.id as PaketId)}
              className={cn(
                "relative flex flex-col rounded-2xl border p-6 transition-all duration-200 hover:border-accent/50",
                isSelected
                  ? "border-ink bg-ink text-white shadow-soft"
                  : "border-line bg-paper text-ink"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink-muted">{p.id === "landing" ? "01" : p.id === "umkm" ? "02" : "03"}</span>
                {isSelected && (
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-white">Dipilih</span>
                )}
              </div>
              <div className="mt-4 flex items-center gap-3">
                <span className={cn("grid h-12 w-12 place-items-center rounded-xl", isSelected ? "bg-white/10" : "bg-cream-dim")}>
                  <Icon className={cn("h-6 w-6", isSelected ? "text-accent" : "text-deep")} />
                </span>
                <h3 className="text-xl font-semibold tracking-[-0.03em]">{p.nama}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-ink-muted">{p.deskripsi}</p>
              <div className="mt-6 border-t pt-4" style={{ borderColor: isSelected ? "rgba(255,255,255,.12)" : undefined }}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-semibold tracking-[-0.04em]">{p.hargaDiskon.toLocaleString("id-ID")}</span>
                    <span className="ml-2 line-through text-sm text-ink-muted">Rp{p.hargaNormal.toLocaleString("id-ID")}</span>
                  </div>
                  <span className="tag-mono text-lime">Hemat Rp{(p.hargaNormal - p.hargaDiskon).toLocaleString("id-ID")}</span>
                </div>
                <p className="mt-1 text-xs text-ink-muted">Estimasi {p.estimasiHari} hari kerja</p>
              </div>
              <ul className="mt-6 flex-1 space-y-2">
                {p.fitur.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink-muted">
                    <Check className={cn("mt-0.5 h-4 w-4 shrink-0", isSelected ? "text-lime" : "text-accent")} />
                    {f}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}