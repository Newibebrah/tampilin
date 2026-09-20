export type Category = "Personal" | "UMKM" | "E-Commerce" | "Custom";

export interface Paket {
  id: string;
  no: string;
  name: string;
  category: Category;
  tagline: string;
  price: number | string;
  priceNote: string;
  duration: string;
  features: string[];
  featured?: boolean;
}

export const PAKET_LIST: Paket[] = [
  {
    id: "landing",
    no: "01",
    name: "Landing Page",
    category: "Personal",
    tagline:
      "Satu halaman, satu fokus: bawa pengunjung jadi pelanggan. Cocok untuk profil diri, kelas online, atau promo produk.",
    price: 1000000,
    priceNote: "harga tetap",
    duration: "siap dalam 5–7 hari kerja",
    featured: true,
    features: [
      "1 halaman berperforma tinggi",
      "Copywriting ringan (bantu tulis)",
      "Integrasi WhatsApp & form kontak",
      "Google Analytics + index siap SEO",
      "Responsif mobile-first",
      "Revisi hingga 2 putaran",
      "Bantuan setup domain + hosting 30 hari",
    ],
  },
  {
    id: "umkm",
    no: "02",
    name: "UMKM / Company Profile",
    category: "UMKM",
    tagline:
      "Katalog produk, cerita brand, dan lokasi toko — dalam satu situs yang bikin bisnismu keliatan profesional. Cocok buat kuliner, fashion, skincare, jasa.",
    price: 1750000,
    priceNote: "harga tetap",
    duration: "siap dalam 10–14 hari kerja",
    features: [
      "5–8 halaman: Home, Produk, Tentang, Kontak",
      "Desain identitas visual dari brand-mu",
      "Galeri produk + apa kata mereka",
      "Form kontak + tombol WhatsApp",
      "SEO on-page + sitemap otomatis",
      "Revisi hingga 3 putaran",
      "Video orientasi kelola konten sendiri",
    ],
  },
  {
    id: "ecom",
    no: "03",
    name: "E-Commerce Sederhana",
    category: "E-Commerce",
    tagline:
      "Toko online ringan tanpa ribet: katalog produk, keranjang, dan checkout via WhatsApp. Nggak perlu pusing inventory ala marketplace.",
    price: 2000000,
    priceNote: "harga tetap",
    duration: "siap dalam 14–21 hari kerja",
    features: [
      "Katalog hingga 30 produk",
      "Keranjang belanja + checkout via WhatsApp",
      "Kategori & pencarian produk",
      "Halaman detail produk yang rapi",
      "Status stok sederhana",
      "Form order + konfirmasi otomatis",
      "Revisi hingga 3 putaran",
      "Tutorial kelola produk 1-on-1",
    ],
  },
  {
    id: "custom",
    no: "04",
    name: "Custom / Backend",
    category: "Custom",
    tagline:
      "Kebutuhan unik punya jawaban unik. Dashboard, sistem booking, autentikasi user, integrasi API — kita bahas detail dulu, baru ngomong budget.",
    price: "Mulai Rp3.000.000",
    priceNote: "estimasi setelah konsultasi",
    duration: "sesuai scope",
    features: [
      "Diskusi kebutuhan gratis",
      "Arsitektur & roadmap pengembangan",
      "Backend, database, atau integrasi API",
      "Fitur custom sesuai kebutuhan",
      "Maintenance & support bulanan",
      "Harga transparan, dibayar bertahap",
    ],
  },
];

export const KATEGORI_FILTER: Array<{ id: "Semua" | Category; label: string }> = [
  { id: "Semua", label: "Semua" },
  { id: "Personal", label: "Personal" },
  { id: "UMKM", label: "UMKM" },
  { id: "E-Commerce", label: "E-Commerce" },
];

export const KATALOG_HEADER = {
  eyebrow: "Katalog",
  title: ["Katalog", "Layanan", "2025"],
  lede: "Harga jelas, no bonus kejutan. Tiap paket sudah termasuk desain custom, hosting siap pakai, dan garansi revisi.",
};

export const COMPARISON_ROWS: { fitur: string; cols: Record<Category, string | boolean> }[] = [
  {
    fitur: "Halaman",
    cols: { Personal: "1", UMKM: "5–8", "E-Commerce": "hingga 30 produk", Custom: "Unlimited" },
  },
  {
    fitur: "Desain 100% custom",
    cols: { Personal: true, UMKM: true, "E-Commerce": true, Custom: true },
  },
  {
    fitur: "Responsif mobile",
    cols: { Personal: true, UMKM: true, "E-Commerce": true, Custom: true },
  },
  {
    fitur: "Checkout",
    cols: { Personal: "Tombol WA", UMKM: "Tombol WA", "E-Commerce": "Keranjang + WA", Custom: "Bebas" },
  },
  {
    fitur: "Revisi",
    cols: { Personal: "2 putaran", UMKM: "3 putaran", "E-Commerce": "3 putaran", Custom: "Sesuai kontrak" },
  },
  {
    fitur: "SEO on-page",
    cols: { Personal: true, UMKM: true, "E-Commerce": true, Custom: true },
  },
  {
    fitur: "Pelatihan kelola konten",
    cols: { Personal: "Bantuan 30 hari", UMKM: "Video + 1-on-1", "E-Commerce": "Video + 1-on-1", Custom: "Sesuai kebutuhan" },
  },
  {
    fitur: "Maintenance",
    cols: { Personal: "Opsional", UMKM: "Opsional", "E-Commerce": "Opsional", Custom: "Paket bulanan" },
  },
];