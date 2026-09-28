export const PAKET = [
  {
    id: "landing",
    nama: "Landing Page",
    hargaNormal: 1_350_000,
    hargaDiskon: 1_050_000,
    estimasiHari: 5,
    deskripsi: "Satu halaman, fokus konversi.",
    fitur: [
      "1 halaman landing",
      "Domain 1 tahun",
      "Hosting gratis (Netlify/Cloudflare)",
      "Tombol WhatsApp",
      "Form kontak",
      "Revisi 2x",
      "5 hari kerja",
    ],
  },
  {
    id: "umkm",
    nama: "UMKM Profile",
    hargaNormal: 1_750_000,
    hargaDiskon: 1_550_000,
    estimasiHari: 10,
    deskripsi: "Company profile 3-5 halaman, siap terima order.",
    fitur: [
      "3-5 halaman",
      "Domain 1 tahun",
      "Hosting 1 tahun",
      "Katalog produk",
      "Blog sederhana",
      "Google Maps",
      "Revisi 2x",
      "10 hari kerja",
    ],
  },
  {
    id: "ecommerce",
    nama: "E-Commerce",
    hargaNormal: 2_500_000,
    hargaDiskon: 2_250_000,
    estimasiHari: 14,
    deskripsi: "Toko online sederhana, terima order otomatis.",
    fitur: [
      "Katalog + keranjang",
      "Checkout sederhana",
      "Notifikasi order",
      "Admin panel",
      "Domain 1 tahun",
      "Hosting backend 1 tahun",
      "Revisi 2x",
      "14 hari kerja",
    ],
  },
];

export const DOMAIN = [
  { id: "none", nama: "Tanpa domain", harga: 0 },
  { id: "myid", nama: ".my.id", harga: 50_000 },
  { id: "online", nama: ".online", harga: 200_000 },
  { id: "com", nama: ".com", harga: 225_000 },
  { id: "id", nama: ".id", harga: 275_000 },
  { id: "coid", nama: ".co.id", harga: 400_000 },
];

export const HOSTING = [
  { id: "none", nama: "Tanpa hosting", harga: 0, paket: [] },
  { id: "free", nama: "Hosting Gratis (Netlify/Cloudflare)", harga: 0, paket: ["landing", "umkm"] },
  { id: "shared", nama: "Shared Hosting (form/email)", harga: 300_000, paket: ["umkm"] },
  { id: "backend", nama: "Hosting Backend (VPS)", harga: 600_000, paket: ["ecommerce"] },
];

export const CMS_ADDON = {
  id: "cms",
  nama: "CMS Custom (Kelola Artikel & Konten Sendiri)",
  harga: 500_000,
  paket: ["landing", "umkm", "ecommerce"],
};

export const ADDON = [
  { id: "extra-page", nama: "Extra halaman", harga: 250_000, paket: ["umkm", "ecommerce"] },
  { id: "copywriting", nama: "Copywriting", harga: 300_000, paket: ["landing", "umkm", "ecommerce"] },
  { id: "gbp", nama: "Setup Google Business Profile", harga: 300_000, paket: ["landing", "umkm", "ecommerce"] },
  { id: "seo", nama: "SEO Dasar", harga: 500_000, paket: ["landing", "umkm", "ecommerce"] },
  { id: "payment", nama: "Integrasi Payment Gateway", harga: 500_000, paket: ["ecommerce"] },
  { id: "ongkir", nama: "Integrasi Ongkir Otomatis", harga: 500_000, paket: ["ecommerce"] },
  { id: "foto", nama: "Foto Produk", harga: 500_000, paket: ["umkm", "ecommerce"] },
  { id: "cms", nama: "CMS Custom (Kelola Artikel & Konten Sendiri)", harga: 500_000, paket: ["landing", "umkm", "ecommerce"] },
];

export function getCmsAddon() {
  return ADDON.find((a) => a.id === "cms");
}

export const DISKON_REFF = 50_000;

export const REFF_CODES: Record<string, { nama: string; aktif: boolean }> = {
  "BUDI01": { nama: "Budi", aktif: true },
  "SITI02": { nama: "Siti", aktif: true },
  "ANDI03": { nama: "Andi", aktif: true },
};

export type PaketId = "landing" | "umkm" | "ecommerce";
export type DomainId = "none" | "myid" | "online" | "com" | "id" | "coid";
export type HostingId = "none" | "free" | "shared" | "backend";
export type AddonId = "extra-page" | "copywriting" | "gbp" | "seo" | "payment" | "ongkir" | "foto" | "cms";

export interface CalculatorState {
  paket: PaketId | null;
  domain: DomainId;
  hosting: HostingId;
  addons: AddonId[];
  reffCode: string;
  reffValid: boolean;
  reffNama: string;
}

export interface CalculatorTotals {
  paketHarga: number;
  domainHarga: number;
  hostingHarga: number;
  addonsHarga: number;
  subtotal: number;
  diskonReff: number;
  total: number;
}