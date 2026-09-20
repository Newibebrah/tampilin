export interface MasalahPoint {
  id: string;
  num: string;
  title: string;
  body: string;
}

export const MASALAH_POINTS: MasalahPoint[] = [
  {
    id: "invisible",
    num: "01",
    title: "Terjual mati di chat, tapi nggak ada 'rumah' digital",
    body: "Katalog dihapus, link hilang, pembeli bingung. Bisnismu cuma hidup di antara jempol orang-orang.",
  },
  {
    id: "instagram",
    num: "02",
    title: "Instagram rajin isi, tapi zero konversi",
    body: "Follower nambah, rejeki nggak. Postingan bagus nyangkut di feed — nggak ada jalan buat jadi penjualan.",
  },
  {
    id: "template",
    num: "03",
    title: "Website template itu kelihatan template",
    body: "Calon pembeli bisa ngerasain website dibuat 10 menit pake template. Citra brand minim, kepercayaan ikut ragu.",
  },
  {
    id: "sibuk",
    num: "04",
    title: "Produk bagus, tapi nggak punya waktu buat web",
    body: "Pengen bikin website sendiri, tapi ujung-ujungnya nunda terus. Tenaga dipakai di operasional, bukan ngoding.",
  },
];

export interface MenuItem {
  no: string;
  name: string;
  category: string;
  desc: string;
  price: string;
}

export const LAYANAN_MENU: MenuItem[] = [
  {
    no: "01",
    name: "Landing Page",
    category: "Personal",
    desc: "Satu halaman fokus konversi buat profil, kelas, atau promo.",
    price: "Rp1jt",
  },
  {
    no: "02",
    name: "Company Profile",
    category: "UMKM",
    desc: "Ceritain brand + produk dalam beberapa halaman yang rapi.",
    price: "Rp1,75jt",
  },
  {
    no: "03",
    name: "E-Commerce",
    category: "Toko Online",
    desc: "Katalog produk, keranjang, checkout lewat WhatsApp.",
    price: "Rp2jt",
  },
  {
    no: "04",
    name: "Custom & Backend",
    category: "Bebas",
    desc: "Booking, dashboard, API, apapun itu — dibahas dulu.",
    price: "Rp3jt+",
  },
];

export interface ProsesStep {
  id: string;
  no: string;
  title: string;
  body: string;
  duration: string;
}

export const PROSES_STEPS: ProsesStep[] = [
  {
    id: "discover",
    no: "01",
    title: "Ngobrol & gali kebutuhan",
    body: "Kita dengar dulu ceritamu — target pasar, produk, dan 'perasaan' yang kamu mau orang rasakan. Gratis, tanpa dipaksa ngomongin harga.",
    duration: "hari 1",
  },
  {
    id: "sketsa",
    no: "02",
    title: "Sketsa & arsitektur",
    body: "Bukan balon mockup. Kita susun struktur konten dan sketsa alur dulu, biar website-nya 'mengalir' — bukan cuma bagus dilirik.",
    duration: "hari 2–4",
  },
  {
    id: "desain",
    no: "03",
    title: "Desain custom",
    body: "Warna, tipografi, dan layout dibangun dari nol untuk brandmu. Kamu lihat progress tiap tahap, bukan akhirnya doang.",
    duration: "hari 5–9",
  },
  {
    id: "go-live",
    no: "04",
    title: "Kunci, tes, dan tampil",
    body: "Responsif di semua layar, kecepatan dipantau, lalu serah terima. Kamu dapat akses penuh + tutorial mengelola sendiri.",
    duration: "hari 10+",
  },
];

export interface KenapaPoint {
  id: string;
  num: string;
  title: string;
  body: string;
}

export const KENAPA_TAMPILIN: KenapaPoint[] = [
  {
    id: "custom",
    num: "01",
    title: "Bukan template",
    body: "Nggak ada dua website yang sama. Semua dibangun dari nol sesuai brand, produk, dan karakter bisnismu.",
  },
  {
    id: "cepat",
    num: "02",
    title: "Cepat, nggak asal cepat",
    body: "Landing page siap dalam seminggu. Tapi tetap lewat proses: konten yang runtut, desain yang dipikirkan, bukan sprint sundul.",
  },
  {
    id: "harga",
    num: "03",
    title: "Harga jujur",
    body: "Tertulis di katalog, tanpa biaya siluman. Revisi ada batasnya yang jelas, dan semua disepakati di depan.",
  },
  {
    id: "orang",
    num: "04",
    title: "Ada orangnya, bukan bot",
    body: "Kamu ngobrol langsung sama orang yang bikin websitenya. Nggak ada perantara, nggak ada kebingungan siapa yang musti dihubungi.",
  },
  {
    id: "hasil",
    num: "05",
    title: "Hasilnya kelihatan",
    body: "Index Google, tombol WA, testimoni — semua sengaja dirancang supaya website itu kerja, bukan cuma pajangan.",
  },
];

export const MASALAH_HEADLINE = "Banyak bisnis bagus, tapi tidak terlihat.";
export const MASALAH_SUB = "Bukan kurang bagus produknya. Cuma belum ada yang jemput.";