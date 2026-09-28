"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[route error]", error);
  }, [error]);

  return (
    <div className="section-shell flex min-h-[70vh] flex-col justify-center py-20 lg:py-24">
      <div className="max-w-2xl">
        <p className="eyebrow-lime">Terjadi kesalahan</p>

        <h1 className="mt-7 display-md">
          Ada yang tidak
          <br />
          beres di sini.
        </h1>

        <p className="lede mt-6">
          Halaman ini gagal dimuat. Coba muat ulang sekali — kalau masih gagal,
          kirim saja detailnya ke kami, biasanya kami perbaiki di hari yang
          sama.
        </p>

        {error.digest && (
          <p className="mt-6 inline-block rounded-soft bg-paper-subtle px-3 py-2 text-mono-xs text-ink-muted">
            Kode error: {error.digest}
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button type="button" onClick={reset} className="button-primary">
            <RotateCcw className="h-4 w-4" />
            <span>Coba lagi</span>
          </button>
          <Link href="/" className="button-secondary">
            <Home className="h-4 w-4" />
            <span>Kembali ke beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
