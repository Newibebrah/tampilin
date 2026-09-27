import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator Harga",
  description: "Hitung estimasi biaya website custom Anda secara transparan. Pilih paket, domain, hosting, dan add-on — lihat totalnya langsung.",
};

export default function KalkulatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}