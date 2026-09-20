export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  color: "lime" | "deep" | "accent" | "cream" | "ink";
  rotate: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "uni",
    name: "Uni Salma",
    role: "Owner @dapuruni.id · Kuliner",
    quote:
      "Katalog aku dulu nyebar di chat doang, sekarang tinggal kirim satu link. Order lewat website naik dan nggak ada lagi 'kak, harganya berapa?'",
    color: "lime",
    rotate: "rotate-[-2deg]",
  },
  {
    id: "reza",
    name: "Reza Fahmi",
    role: "Coach personal branding",
    quote:
      "Aku pikir harus bayar puluhan juta biar websitenya kelihatan 'desainernya beneran'. Ternyata nggak. Sering dapat komentar: ini websitenya bagus siapa yang bikin?",
    color: "deep",
    rotate: "rotate-[1.5deg]",
  },
  {
    id: "vina",
    name: "Vina Rahmawati",
    role: "Skincare lokal",
    quote:
      "Yang paling aku suka: prosesnya diajak cerita. Bukan Cuma ditanya 'mau warna apa', tapi alurnya dibimbing sampai aku paham kenapa halamannya begini.",
    color: "accent",
    rotate: "rotate-[-1deg]",
  },
  {
    id: "budi",
    name: "Budi Santoso",
    role: "Jasa laundry & cleaning",
    quote:
      "Dulu order masuk Instagram, suka nutup toko karena chat numpuk. Sekarang semua masuk form + WhatsApp, rapi. Pendapatan malah naik karena bisa kelihatan profesional.",
    color: "cream",
    rotate: "rotate-[2deg]",
  },
];

export const KUNCI_TESTOMONI =
  "Kata mereka yang udah tampil online.";