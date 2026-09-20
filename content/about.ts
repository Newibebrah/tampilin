export interface Fact {
  label: string;
  value: string;
}

export interface Filosofi {
  no: string;
  title: string;
  body: string;
}

export interface Tool {
  name: string;
  kind: string;
}

export const ABOUT_FACTS: Fact[] = [
  { label: "Mulai", value: "2025" },
  { label: "Proyek selesai", value: "24+" },
  { label: "Waktu respons chat", value: "< 1 jam" },
  { label: "Basis", value: "Remote, Indonesia" },
  { label: "Spesialisasi", value: "Custom front-end" },
];

export const FILOSOFI: Filosofi[] = [
  {
    no: "01",
    title: "Konten menang dulu baru desain",
    body: "Desain yang cantik tapi kosong itu cuma wallpaper. Kami susun pesan dulu — orang butuh apa, baca apa, klik apa — baru lukis tampilannya.",
  },
  {
    no: "02",
    title: "Cepat, tapi nggak buru-buru",
    body: "Landing page seminggu jadi. Tapi seminggu yang diisi keputusan matang, bukan sprint yang menelantarkan kualitas.",
  },
  {
    no: "03",
    title: "Transparan dari celah terkecil",
    body: "Harga, batas revisi, timeline — semua disepakati di depan. Nggak ada tagihan kejutan di akhir bulan, nggak ada fitur siluman.",
  },
  {
    no: "04",
    title: "Klien ikut pegang kemudi",
    body: "Kamu bukan cuma penonton. Ada access di tiap tahap, akses penuh setelah selesai, dan kursus singkat biar bisa kelola sendiri.",
  },
];

export const TOOLS: Tool[] = [
  { name: "Figma", kind: "Desain" },
  { name: "Next.js", kind: "Framework" },
  { name: "TypeScript", kind: "Bahasa" },
  { name: "Tailwind", kind: "Styling" },
  { name: "Framer Motion", kind: "Animasi" },
  { name: "Vercel", kind: "Deploy" },
  { name: "Payload", kind: "CMS" },
  { name: "Cloudinary", kind: "Media" },
];

export const ABOUT_INTRO = {
  eyebrow: "Tentang",
  title: ["Tampilin.", "Bikin (website) yang", "layak dibanggakan."],
  body: [
    "Tampilin.online lahir dari keluhan yang sama: banyak UMKM dan freelancer punya produk bagus, jasa mumpuni — tapi nggak kelihatan. Website mereka template, lelet, atau malah nggak punya.",
    "Kami nggak jualan template jalan pintas. Kami susun website custom yang jujur: satu orang yang bikin, kamu yang ngobrol langsung, dan hasilnya siap tampil di depan publik.",
  ],
};

export const ABOUT_FAKTA_KOLOM =
  "Setiap proyek dikerjakan tim kecil — ngobrolnya langsung sama orang yang mengetik kodenya.";