"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global error]", error);
  }, [error]);

  return (
    <html lang="id">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F5F1EA",
          color: "#111111",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <div style={{ maxWidth: "32rem", padding: "2rem" }}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#4A4A4A",
            }}
          >
            Gagal memuat situs
          </p>
          <h1 style={{ fontSize: "2rem", lineHeight: 1.2, margin: "1.5rem 0 0" }}>
            Ada yang tidak beres.
          </h1>
          <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "#4A4A4A" }}>
            Situs gagal dimuat sepenuhnya. Coba muat ulang halaman ini.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2rem",
              padding: "0.875rem 1.5rem",
              border: 0,
              borderRadius: 0,
              background: "#FF4D2E",
              color: "#F5F1EA",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Muat ulang
          </button>
        </div>
      </body>
    </html>
  );
}
