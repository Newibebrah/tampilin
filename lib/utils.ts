import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  PAKET, DOMAIN, HOSTING, ADDON,
  type PaketId, type DomainId, type HostingId, type AddonId,
} from "@/lib/data";
import { SITE } from "@/content/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const WHATSAPP_NUMBER = "6287716058371";

export const WHATSAPP_DEFAULT_MESSAGE =
  `Halo ${SITE.name}, saya mau konsultasi soal pembuatan website.`;

export function waLink(message: string = WHATSAPP_DEFAULT_MESSAGE) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function formatIdr(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

const SHORT_NAMES: Partial<Record<string, string>> = {
  cms: "CMS Custom",
  backend: "VPS Backend",
  free: "Hosting Gratis",
  shared: "Shared Hosting",
};

export interface OrderDraft {
  paket: PaketId | null;
  domain: DomainId;
  hosting: HostingId;
  addons: AddonId[];
  reffValid: boolean;
  reffNama: string;
  subtotal: number;
  diskonReff: number;
  total: number;
}

export function buildOrderMessage(draft: OrderDraft): string {
  const lines: string[] = [
    `Halo ${SITE.name}, saya mau mulai project. Berikut detail pesanan saya:`,
    "",
  ];

  const pkg = draft.paket ? PAKET.find((p) => p.id === draft.paket) : null;
  if (pkg) lines.push(`*Paket:* ${pkg.nama} — ${formatIdr(pkg.hargaDiskon)}`);

  const dom = DOMAIN.find((x) => x.id === draft.domain);
  if (dom && dom.harga > 0) {
    lines.push(`*Domain:* ${dom.nama} — ${formatIdr(dom.harga)}/tahun`);
  }

  const host = HOSTING.find((x) => x.id === draft.hosting);
  if (host && host.harga > 0) {
    const label = SHORT_NAMES[host.id] ?? host.nama;
    lines.push(`*Hosting:* ${label} — ${formatIdr(host.harga)}/tahun`);
  }

  for (const id of draft.addons) {
    const addon = ADDON.find((x) => x.id === id);
    if (addon) {
      const label = SHORT_NAMES[addon.id] ?? addon.nama;
      lines.push(`*Add-on:* ${label} — ${formatIdr(addon.harga)}`);
    }
  }

  lines.push("");
  lines.push(`Subtotal: ${formatIdr(draft.subtotal)}`);
  if (draft.reffValid && draft.diskonReff > 0) {
    lines.push(`Diskon referral (${draft.reffNama}): -${formatIdr(draft.diskonReff)}`);
  }
  lines.push("");
  lines.push(`*Total: ${formatIdr(draft.total)}*`);
  lines.push("");
  lines.push("Mohon dibantu untuk langkah selanjutnya. Terima kasih!");

  return lines.join("\n");
}