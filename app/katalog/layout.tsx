import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Katalog & Harga",
  description: "Harga jelas, no bonus kejutan. Tiap paket sudah termasuk desain custom, hosting siap pakai, dan garansi revisi.",
};

export default function KatalogLayout({ children }: { children: React.ReactNode }) {
  return children;
}