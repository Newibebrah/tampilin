import type { Metadata } from "next";
import HargaCalculator from "./HargaCalculator";
import { PAKET, type PaketId } from "@/lib/data";

export const metadata: Metadata = {
  title: "Simulasi Harga — Tampilin.online",
  description:
    "Hitung estimasi biaya website: paket landing page, UMKM, atau e-commerce, lengkap dengan domain, hosting, dan add-on.",
};

const VALID_PAKET = PAKET.map((p) => p.id as string);

export default function HargaPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const raw = searchParams.paket;
  const value = Array.isArray(raw) ? raw[0] : raw;
  const initialPaket =
    value && VALID_PAKET.includes(value) ? (value as PaketId) : null;

  return <HargaCalculator initialPaket={initialPaket} />;
}
