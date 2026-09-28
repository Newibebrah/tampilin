# UI/UX Guide — tampilin.online

Dokumen ini mencatat sistem desain `tampilin.online` seperti yang benar-benar
terimplementasi di `tailwind.config.ts` dan `app/globals.css`. Kalau kamu
menambah token atau komponen, perbarui file ini di commit yang sama.

Arah desain: **Editorial Tech Precision** — kontras tinggi, tipografi tegas,
permukaan datar, satu aksen oranye sebagai focal point. Bukan glassy,
gradien ungu, atau rounded-bulat.

---

## 1. Typography

Semua font di-self-host lewat `@fontsource-variable`. Tidak ada permintaan ke
Google Fonts, jadi build tetap jalan offline.

| Peran | Token CSS | Family | Pemakaian |
| --- | --- | --- | --- |
| Sans (body/UI) | `--font-geist` | Geist Variable | `font-sans` |
| Display (heading) | `--font-fraunces` | Fraunces Variable | `font-display` |
| Mono (label/kode) | `--font-mono` | Geist Mono Variable | `font-mono` |

Fallback: sans → `system-ui`; display → `Georgia, serif`; mono → `monospace`.

### Skala tipografi

Semua ukuran ada di `tailwind.config.ts` **dan** sebagai class utility di
`app/globals.css`. Gunakan class-nya (`text-heading-md`), jangan utilities
arbitrer.

| Class | Ukuran | Weight | Tracking |
| --- | --- | --- | --- |
| `text-display-xl` | `clamp(4rem, 8vw, 7rem)` | 500 | -0.04em |
| `text-display-lg` | `clamp(3rem, 6vw, 5rem)` | 500 | -0.035em |
| `text-display-md` | `clamp(2.25rem, 4vw, 3.5rem)` | 500 | -0.03em |
| `text-display-sm` | `clamp(1.75rem, 3vw, 2.5rem)` | 500 | -0.02em |
| `text-heading-lg` | `clamp(1.5rem, 2.5vw, 2rem)` | 600 | -0.02em |
| `text-heading-md` | `clamp(1.25rem, 2vw, 1.5rem)` | 600 | -0.01em |
| `text-heading-sm` | 1.125rem | 600 | -0.01em |
| `text-body-lg` | 1.125rem | 400 | 0 |
| `text-body` | 1rem | 400 | 0 |
| `text-body-sm` | 0.875rem | 400 | 0 |
| `text-caption` | 0.75rem | 400 | +0.02em |
| `text-mono-sm` | 0.75rem | 400 | +0.02em |
| `text-mono-xs` | 0.625rem | 400 | +0.04em |

`display-*` memakai Fraunces; `heading-*` dan `body-*` memakai Geist.

### Aturan

- `font-serif` Tailwind **dilarang** — itu `ui-serif`, bukan Fraunces. Pakai
  `font-display`.
- Ukuran fluid pakai `clamp()`, jangan breakpoint + text-size manual.
- `leading` sudah baked di setiap token; jangan menambah `leading-*` pada
  `display-*`.

---

## 2. Warna

Token warna ada sebagai utility Tailwind **dan** sebagai CSS variable untuk
runtime (progress bar, canvas, animasi).

### Light

| Token | Nilai | Pakai untuk |
| --- | --- | --- |
| `paper` | `#F5F1EA` | Background halaman |
| `paper-subtle` | `#EDE8E0` | Surface terangkat, hover |
| `paper-deep` | `#E5DFD4` | Surface paling dalam |
| `ink` | `#111111` | Teks utama, border kuat |
| `ink-muted` | `#4A4A4A` | Teks sekunder |
| `ink-subtle` | `#8A8A8A` | Label, placeholder |
| `flame` | `#FF4D2E` | Aksen primer, CTA |
| `flame-hover` | `#E63E1F` | Hover CTA |
| `flame-subtle` | `#FFE5DE` | Badge, latar peringatan |
| `forest` | `#1B3A2F` | Aksen sekunder |
| `forest-subtle` | `#E5EDE8` | Badge sekunder |
| `lime` | `#E8FF5A` | Highlight, aksen ketiga |
| `border` | `rgba(17,17,17,0.08)` | Border default |
| `border-strong` | `rgba(17,17,17,0.16)` | Border emphasis |

### Dark

Diterapkan lewat class `.dark` (bukan `prefers-color-scheme`) supaya tema bisa
di-toggle manual oleh pengguna.

`paper` `#0A0A0A` · `paper-subtle` `#1A1A1A` · `paper-deep` `#222222` ·
`ink` `#F5F1EA` · `ink-muted` `#B0B0B0` · `ink-subtle` `#7A7A7A` ·
`border` `rgba(245,241,234,0.12)` · `border-strong` `rgba(245,241,234,0.24)` ·
`flame-subtle` `#3D1A12` · `forest-subtle` `#0D2018`

`flame`, `lime`, `forest` **tidak** di-override di dark mode — sengaja, agar CTA
punya kontras yang sama di kedua tema.

### Aturan

- **Jangan** menulis hex langsung. Selalu token.
- **Jangan** mengarang nama warna. Kalau tidak ada di tabel, itu bug — bukan
  fitur. (`text-ink-soft` pernah ada di Beranda dan tidak pernah didefinisikan.)
- Kontras teks: `ink` di atas `paper`, atau `paper` di atas `flame`/`forest`.
  Jangan `ink-muted` di atas `flame`.
- Scrim/overlay selalu `bg-black/50`, **bukan** `bg-ink/40` — di dark mode `ink`
  itu terang, jadi scrim-nya jadi kabut putih.

---

## 3. Spasi, radius, elevasi

**Spacing:** skala px eksplisit (`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96,
128, 160, 192`) di `theme.spacing`. Tailwind default (4 = 16px) sengaja
dibuang supaya tidak ada dua sistem. Padding section: `py-20` mobile, `py-24`
desktop.

**Radius:**

| Token | Nilai | Pakai untuk |
| --- | --- | --- |
| `rounded-sharp` | `0` | Tombol, card, input — default |
| `rounded-soft` | 8px | Badge, kbd, menu |
| `rounded-pill` | 9999px | Pill, avatar |
| `rounded-blob` | 32px | Decorative blob |

Default desain ini **0px**. Jangan pakai `rounded-lg/md/xl` Tailwind default.

**Elevasi:** `shadow-layer-1` (border halus), `shadow-layer-2` (card hover),
`shadow-layer-3` (popover/modal), `shadow-glow-flame` (aksen flame). Card
default **tidak** pakai shadow, border saja.

---

## 4. Layout

- Container: `container` centered, padding 24/32/48/64px (default/sm/lg/xl).
- Breakpoint: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 · `2xl` 1440.
- Mobile-first. Pola desktop `hidden lg:flex`, mobile `lg:hidden`.
- Maksimal 1 `<main>` per halaman, di `app/layout.tsx`. **Jangan** nest `<main>`
  di dalam page.
- `.skip-link` tersedia di layout, selalu pertahankan.

---

## 5. Motion

**Durasi** (`transitionDuration`):

| Token | Nilai | Pakai untuk |
| --- | --- | --- |
| `duration-micro` | 150ms | Hover, focus, state kecil |
| `duration-standard` | 300ms | Transisi normal |
| `duration-complex` | 600ms | Reveal, mask |
| `duration-page` | 800ms | Transisi halaman penuh |

**Easing:** `ease-out` untuk masuk, `ease-in-out` untuk gerak berlanjut. Default
Tailwind cukup; jangan menambah timing function kustom.

**Keyframe** tersedia: `fadeIn`, `fadeOut`, `slideUp`, `slideDown`, `scaleIn`,
`reveal`, `shimmer`, `pulseSoft`.

**Prinsip:**
- Scroll animation pakai Framer Motion + Lenis (`components/LenisProvider.tsx`).
  Reveal via `IntersectionObserver` (`components/sections/RevealMask.tsx`).
  `gsap` terinstall tapi belum dipakai — jangan mulai/style motion dengan GSAP
  sebelum ada keputusan arsitektur.
- Component reveal **wajib** aman untuk elemen yang sudah di dalam viewport saat
  mount (cek `getBoundingClientRect` di observer), dan **wajib** mengecek
  `prefers-reduced-motion` sebelum menyetel property.
- Durasi, `font-variation-settings`, dan `clip-path` tidak boleh dianimasikan
  lewat JS per-frame. Gunakan CSS/property yang di-animate GPU.

---

## 6. Komponen

### Button

Sudah di-token di `globals.css`, **jangan** tulis class button manual:

`button-primary` · `button-primary-lg` · `button-primary-sm` ·
`button-secondary` · `button-secondary-lg` · `button-secondary-sm` ·
`button-ghost` · `button-icon`

Semua sudah punya `focus-visible:ring-2 focus-visible:ring-flame` +
`active:scale-[0.98]`. Aksesibel tanpa tambahan.

### Surface

`surface-card` · `surface-card-hover` · `surface-glass`

### Primitives (`components/ui/`)

- `Button.tsx` — wrapper Radix Slot, varian `primary | secondary | ghost`.
- `Drawer.tsx` — Radix Dialog dengan gaya bottom sheet, untuk nav mobile.
  (Beralih ke `vaul` untuk drag gesture masih dipertimbangkan.)
- `CommandPalette` — `cmdk` di dalam Radix Dialog. **Wajib** controlled
  (`open={isOpen}`), tidak boleh dirender tanpa gate.

### Section & motion components

`BentoGrid` · `HeroMeshGradient` · `HorizontalScroll` · `KineticText` ·
`RevealMask` · `ScrollProgress` · `AnimatedNumber`

`HorizontalScroll` menerima prop `gap` dan **harus** meneruskannya ke style —
`gap-6` hardcoded pernah membuat prop itu diam-diam diabaikan.

---

## 7. Aksesibilitas

- Kontras: ikuti tabel di §2. Cek dark mode juga.
- Focus: selalu terlihat. Kalau bikin elemen focusable manual, tambahkan
  `focus-visible:ring-2 focus-visible:ring-flame`.
- Ikon-only button wajib punya `aria-label`. Ikon dekoratif wajib
  `aria-hidden="true"`.
- Heading berurutan tanpa lompat level. Heading besar = Fraunces (`text-display-*`).
- Animasi: hormati `prefers-reduced-motion` (utility global di `globals.css`
  + cek eksplisit di komponen JS).
- Label form tetap dipakai walau `react-hook-form` sudah tidak terpasang. Label
  tetap wajib ada.

---

## 8. Aturan Commit

- `npm run check` (lint + typecheck) harus hijau sebelum commit.
- `npm run build` harus hijau; build Next 14 sudah menjalankan lint + typecheck
  sendiri, jadi build gagal kalau ada violation.
- **Class yang tidak ada di design system adalah bug**,
  bukan placeholder. Kalau butuh warna/ruas baru, tambahkan token dulu di
  `tailwind.config.ts` + `globals.css`, baru pakai.
- Setelah ubah layout, cek semua route: `/`, `/layanan`, `/harga`,
  `/harga?paket=umkm`, `/harga?paket=ecommerce`, `/tentang`, `/preview`.
- Jangan pernah commit `tsconfig.tsbuildinfo` atau `.next`.

---

## 9. Known gaps

Hal-hal yang **disengaja** masih terbuka, biar tidak dianggap bug:

- `vaul` terinstall tapi `Drawer` masih Radix Dialog (belum ada drag gesture).
- `gsap` terinstall tapi belum dipakai.
- `zustand` + `lib/calculator-store.ts` belum dipakai; kalkulator `/harga`
  pakai React state lokal.
- Belum ada test suite / E2E. Verifikasi saat ini: `npm run check`,
  `npm run build`, dan smoke test HTTP per route.
- `app/fonts` sudah dihapus (file Fraunces di sana korup — bukan font sungguhan).
