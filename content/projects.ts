export type ProjectCategory = "Landing" | "UMKM" | "E-Commerce";

export interface Project {
  id: string;
  name: string;
  client: string;
  category: ProjectCategory;
  year: string;
  aspect: string;
  g1: string;
  g2: string;
  url: string;
  deskripsi: string;
}

export const PROJECTS: Project[] = [
  {
    id: "kopi-rumah",
    name: "Kopi Rumah",
    client: "Kedai kopi lokal Bandung",
    category: "UMKM",
    year: "2025",
    aspect: "aspect-[4/5]",
    g1: "#2C5647",
    g2: "#E8FF5A",
    url: "/preview",
    deskripsi:
      "Profile kedai: cerita penyangrai, menu musiman, dan lokasi dalam satu halaman yang bikin haus.",
  },
  {
    id: "aras-kelas",
    name: "Aras Studio",
    client: "Kelas online desain",
    category: "Landing",
    year: "2025",
    aspect: "aspect-[4/3]",
    g1: "#FF4D2E",
    g2: "#F5F1EA",
    url: "/preview",
    deskripsi:
      "Landing page pendaftaran kelas yang mengubah postingan naik kelas jadi halaman penuh konversi.",
  },
  {
    id: "dapur-uni",
    name: "Dapur Uni",
    client: "Katering harian",
    category: "E-Commerce",
    year: "2025",
    aspect: "aspect-[3/4]",
    g1: "#E8FF5A",
    g2: "#111111",
    url: "/preview",
    deskripsi:
      "Menu mingguan, sistem pre-order, dan checkout WhatsApp yang mengurangi sampean chat balik chat.",
  },
  {
    id: "rangka",
    name: "Rangka Fitwear",
    client: "Brand apparel lokal",
    category: "E-Commerce",
    year: "2025",
    aspect: "aspect-[4/3]",
    g1: "#1B3A2F",
    g2: "#FF4D2E",
    url: "/preview",
    deskripsi:
      "Katalog limited drop, size guide, dan form order yang bikin launching nggak napsu (eh, nggak berantakan).",
  },
  {
    id: "sana-klinik",
    name: "Sana Klinik Kulit",
    client: "Klinik skincare",
    category: "UMKM",
    year: "2024",
    aspect: "aspect-[3/4]",
    g1: "#F5F1EA",
    g2: "#2C5647",
    url: "/preview",
    deskripsi:
      "Profile yang bikin pasien kenalin treatment, dokter, dan cara booking — tanpa telepon dulu.",
  },
  {
    id: "note-biru",
    name: "Note Biru",
    client: "Jurnal digital pribadi",
    category: "Landing",
    year: "2024",
    aspect: "aspect-[4/3]",
    g1: "#FF4D2E",
    g2: "#E8FF5A",
    url: "/preview",
    deskripsi:
      "Landing page aplikasi jurnal pribadi dengan nada yang tenang — ngajak orang nulis, bukan beli.",
  },
  {
    id: "bakso-mas",
    name: "Bakso Pakde",
    client: "Warung bakso keluarga",
    category: "UMKM",
    year: "2024",
    aspect: "aspect-[4/5]",
    g1: "#1B3A2F",
    g2: "#F5F1EA",
    url: "/preview",
    deskripsi:
      "Satu halaman jujur: menu, harga, jam buka, dan arah kok. Kaos daster nggak ikut kepotret.",
  },
  {
    id: "studio-vena",
    name: "Studio Vena",
    client: "Fotografer freelance",
    category: "Landing",
    year: "2024",
    aspect: "aspect-[3/4]",
    g1: "#111111",
    g2: "#FF4D2E",
    url: "/preview",
    deskripsi:
      "Portofolio fotografer yang bikin calon klien langsung pencet tombol inbox — bukan scroll-scroll doang.",
  },
];

export const PROJECT_FILTERS: Array<{ id: "Semua" | ProjectCategory; label: string }> = [
  { id: "Semua", label: "Semua" },
  { id: "Landing", label: "Landing" },
  { id: "UMKM", label: "UMKM" },
  { id: "E-Commerce", label: "E-Commerce" },
];

export const BEHIND_SCENES = [
  {
    id: "1",
    step: "Sketsa",
    desc: "Coret-coret di kertas dulu — struktur, alur, dan rasa. Belum sentuh komputer.",
    tone: "bg-cream-dim",
    rotate: "rotate-[-2.5deg]",
  },
  {
    id: "2",
    step: "Wireframe",
    desc: "Layout dan prioritas konten ditata. 'Apa yang paling penting dilihat pertama kali?'",
    tone: "bg-deep text-cream",
    rotate: "rotate-[1.5deg]",
  },
  {
    id: "3",
    step: "Desain final",
    desc: "Warna, tipografi, dan detail alur. Diuji di layar kecil sampai besar.",
    tone: "bg-accent text-cream",
    rotate: "rotate-[-1deg]",
  },
];