"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Badge } from "@/components/Badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ChevronRight, Check, AlertCircle, MessageCircle,
  ArrowUpRight, Database, Globe, Layers, Store, RotateCcw, Gift,
} from "lucide-react";
import { toast } from "sonner";
import { cn, formatIdr, waLink, buildOrderMessage } from "@/lib/utils";
import {
  PAKET, DOMAIN, HOSTING, ADDON, getCmsAddon, DISKON_REFF, REFF_CODES,
  type PaketId, type DomainId, type HostingId, type AddonId,
} from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { NumberFlow } from "@/components/sections/AnimatedNumber";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/Drawer";

type Step = "paket" | "domain" | "hosting" | "addon" | "reff" | "summary";

const STEPS: { id: Step; label: string }[] = [
  { id: "paket", label: "Paket" },
  { id: "domain", label: "Domain" },
  { id: "hosting", label: "Hosting" },
  { id: "addon", label: "Tambahan" },
  { id: "reff", label: "Referral" },
  { id: "summary", label: "Ringkasan" },
];

const PAKET_ICONS = {
  landing: Globe,
  umkm: Layers,
  ecommerce: Store,
} as const;

const CMS_PRICE = getCmsAddon()?.harga ?? 0;

interface Totals {
  paketHarga: number;
  domainHarga: number;
  hostingHarga: number;
  addonsHarga: number;
  subtotal: number;
  diskonReff: number;
  total: number;
}

function getStepOrder(paket: PaketId | null): Step[] {
  const base: Step[] = ["paket", "domain"];
  if (paket !== "landing") base.push("hosting");
  return [...base, "addon", "reff", "summary"];
}

function getDefaultHosting(paketId: PaketId): HostingId {
  if (paketId === "landing" || paketId === "umkm") return "free";
  return "backend";
}

function getPaket(id: PaketId | null) {
  return id ? PAKET.find((p) => p.id === id) ?? null : null;
}

function getDomain(id: DomainId) {
  return DOMAIN.find((d) => d.id === id);
}

function getHosting(id: HostingId) {
  return HOSTING.find((h) => h.id === id);
}

function getAddon(id: AddonId) {
  return ADDON.find((a) => a.id === id);
}

export default function HargaCalculator({
  initialPaket,
}: {
  initialPaket: PaketId | null;
}) {
  const [stepIndex, setStepIndex] = useState(initialPaket ? 1 : 0);
  const [paket, setPaket] = useState<PaketId | null>(initialPaket);
  const [domain, setDomain] = useState<DomainId>("none");
  const [hosting, setHosting] = useState<HostingId>(
    initialPaket ? getDefaultHosting(initialPaket) : "none"
  );
  const [addons, setAddons] = useState<AddonId[]>([]);
  const [reffCode, setReffCode] = useState("");
  const [reffValid, setReffValid] = useState(false);
  const [reffNama, setReffNama] = useState("");

  const stepOrder = useMemo(() => getStepOrder(paket), [paket]);
  const currentStep = stepOrder[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === stepOrder.length - 1;

  const allowedHosting = useMemo(
    () => (paket ? HOSTING.filter((h) => h.paket.includes(paket)) : []),
    [paket]
  );

  const allowedAddons = useMemo(
    () => (paket ? ADDON.filter((a) => a.paket.includes(paket)) : []),
    [paket]
  );

  useEffect(() => {
    if (!paket) return;
    if (!allowedHosting.some((h) => h.id === hosting)) {
      setHosting(getDefaultHosting(paket));
    }
    setAddons((prev) => prev.filter((a) => allowedAddons.some((x) => x.id === a)));
  }, [paket, allowedHosting, allowedAddons, hosting]);

  const totals: Totals = useMemo(() => {
    const pkg = getPaket(paket);
    const dom = getDomain(domain);
    const host = getHosting(hosting);

    const paketHarga = pkg?.hargaDiskon ?? 0;
    const domainHarga = dom?.harga ?? 0;
    const hostingHarga = host?.harga ?? 0;
    const addonsHarga = addons.reduce((sum, id) => sum + (getAddon(id)?.harga ?? 0), 0);

    const subtotal = paketHarga + domainHarga + hostingHarga + addonsHarga;
    const diskonReff = reffValid ? DISKON_REFF : 0;

    return {
      paketHarga, domainHarga, hostingHarga, addonsHarga,
      subtotal, diskonReff, total: subtotal - diskonReff,
    };
  }, [paket, domain, hosting, addons, reffValid]);

  const nextStep = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, stepOrder.length - 1));
  }, [stepOrder.length]);

  const prevStep = useCallback(() => {
    setStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  const goToStep = useCallback(
    (target: Step) => {
      const idx = stepOrder.indexOf(target);
      if (idx !== -1) setStepIndex(idx);
    },
    [stepOrder]
  );

  const validateReff = useCallback(() => {
    const code = reffCode.toUpperCase();
    const ref = REFF_CODES[code];
    if (ref?.aktif) {
      setReffValid(true);
      setReffNama(ref.nama);
      toast.success(`Kode valid — potongan ${formatIdr(DISKON_REFF)}`);
    } else {
      setReffValid(false);
      setReffNama("");
      if (code) toast.error(`Kode "${code}" tidak valid`);
    }
  }, [reffCode]);

  function resetCalculator() {
    setPaket(null);
    setDomain("none");
    setHosting("none");
    setAddons([]);
    setReffCode("");
    setReffValid(false);
    setReffNama("");
    setStepIndex(0);
    window.history.replaceState(null, "", "/harga");
    toast("Kalkulator direset");
  }

  const handleOrder = () => {
    if (!paket) return;
    window.open(waLink(buildOrderMessage({
      paket, domain, hosting, addons,
      reffValid, reffNama,
      subtotal: totals.subtotal,
      diskonReff: totals.diskonReff,
      total: totals.total,
    })), "_blank");
    toast.success("Mengarahkan ke WhatsApp dengan detail pesanan...");
  };

  const hasCms = addons.includes("cms");
  const otherAddons = addons.filter((id) => id !== "cms");

  const summaryBody = (
    <>
      <dl className="space-y-3 text-body-sm">
        {paket && (
          <Row label={getPaket(paket)?.nama ?? "-"} value={totals.paketHarga} />
        )}
        {getDomain(domain)?.harga ? (
          <Row label={`Domain ${getDomain(domain)?.nama}`} value={totals.domainHarga} />
        ) : null}
        {getHosting(hosting)?.harga ? (
          <Row
            label={`Hosting ${getHosting(hosting)?.nama}`}
            value={totals.hostingHarga}
            suffix="/tahun"
          />
        ) : null}
        {hasCms ? <Row label="CMS Custom (artikel & konten)" value={CMS_PRICE} /> : null}
        {otherAddons.length > 0 && (
          <div className="border-t border-border pt-3">
            <dt className="text-ink-muted">Add-on lain ({otherAddons.length})</dt>
            <dd className="mt-2 space-y-1.5">
              {otherAddons.map((id) => {
                const a = getAddon(id);
                if (!a) return null;
                return (
                  <div key={a.id} className="flex justify-between text-xs">
                    <span className="text-ink-muted">{a.nama}</span>
                    <span className="font-medium text-ink">
                      <NumberFlow value={a.harga} prefix="Rp" />
                    </span>
                  </div>
                );
              })}
            </dd>
          </div>
        )}
      </dl>

      <div className="mt-5 space-y-3 border-t border-border pt-4">
        <div className="flex justify-between text-body-sm">
          <span className="text-ink-muted">Subtotal</span>
          <span className="font-semibold text-ink">
            <NumberFlow value={totals.subtotal} prefix="Rp" />
          </span>
        </div>
        {reffValid && totals.diskonReff > 0 && (
          <div className="flex justify-between text-body-sm text-flame-hover">
            <span className="flex items-center gap-1">
              <Gift className="h-3.5 w-3.5" /> Diskon Referral ({reffNama})
            </span>
            <span className="font-semibold">
              <NumberFlow value={totals.diskonReff} prefix="- Rp" />
            </span>
          </div>
        )}
        <div className="flex items-baseline justify-between border-t border-border pt-3">
          <span className="font-display text-xl font-medium text-ink">Total</span>
          <NumberFlow
            value={totals.total}
            prefix="Rp"
            className="text-2xl font-semibold text-flame-hover"
          />
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-ink-muted">
        DP 50% di awal, 50% sebelum go-live · Revisi 2x · Setup domain &amp; hosting inklusi
      </p>

      <Button
        size="lg"
        className="mt-4 w-full justify-center gap-2"
        onClick={handleOrder}
        disabled={!paket}
      >
        <MessageCircle className="h-4 w-4" />
        Pesan via WhatsApp
        <ArrowUpRight className="h-4 w-4" />
      </Button>
    </>
  );

  return (
    <div className="relative">
      <div className="pointer-events-none fixed inset-0 bg-gradient-flame-lime" aria-hidden="true" />

      <div className="section-shell relative pb-28 pt-12 sm:pb-16 sm:pt-16">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="flex justify-center">
            <Badge tone="flame" dot pulse>
              Harga
            </Badge>
          </div>
          <h1 className="display-lg mt-6 text-balance">
            Simulasi Harga <span className="text-flame-hover">Transparan</span>
          </h1>
          <p className="lede mt-5 text-ink-muted">
            Pilih paket, domain, dan hosting — lihat totalnya jelas, tanpa kejutan.
          </p>
        </motion.header>

        <div
          className={cn(
            "mt-10 grid grid-cols-1 gap-8 lg:items-start",
            currentStep === "summary" ? "lg:grid-cols-1" : "lg:grid-cols-[minmax(0,1fr)_360px]"
          )}
        >
          <div className="min-w-0">
            <nav
              aria-label="Langkah simulasi harga"
              className="flex gap-1.5 overflow-x-auto scrollbar-hide border-b border-border pb-4"
            >
              {stepOrder.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => goToStep(s)}
                  disabled={s === "summary" && !paket}
                  aria-current={i === stepIndex ? "step" : undefined}
                  className={cn(
                    "flex flex-shrink-0 items-center gap-1.5 rounded-pill px-3.5 py-1.5 text-mono-xs font-medium transition-all duration-micro",
                    i < stepIndex && "bg-flame text-ink",
                    i === stepIndex && "bg-ink text-paper",
                    i > stepIndex && "bg-paper-subtle text-ink-muted hover:bg-border",
                    (s === "summary" && !paket) && "cursor-not-allowed opacity-50"
                  )}
                >
                  {i < stepIndex ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <span className="w-4 text-center">{i + 1}</span>
                  )}
                  {STEPS.find((x) => x.id === s)?.label}
                </button>
              ))}
            </nav>

            <div className="mt-8 min-h-[24rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {currentStep === "paket" && (
                    <PaketStep
                      selected={paket}
                      locked={!!initialPaket}
                      onSelect={(id) => {
                        setPaket(id);
                        setStepIndex(1);
                      }}
                    />
                  )}

                  {currentStep === "domain" && (
                    <DomainStep
                      value={domain}
                      onSelect={(id) => {
                        setDomain(id);
                        nextStep();
                      }}
                    />
                  )}

                  {currentStep === "hosting" && (
                    <HostingStep
                      value={hosting}
                      options={allowedHosting}
                      onSelect={(id) => {
                        setHosting(id);
                        nextStep();
                      }}
                    />
                  )}

                  {currentStep === "addon" && (
                    <AddonStep
                      value={addons}
                      options={allowedAddons}
                      onToggle={(ids) => setAddons(ids)}
                    />
                  )}

                  {currentStep === "reff" && (
                    <ReffStep
                      code={reffCode}
                      valid={reffValid}
                      nama={reffNama}
                      onChange={setReffCode}
                      onSubmit={(e) => {
                        e.preventDefault();
                        validateReff();
                      }}
                    />
                  )}

                  {currentStep === "summary" && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="mx-auto w-full max-w-2xl"
                    >
                      <div className="rounded-card-lg border border-border bg-paper p-6 shadow-layer-1 sm:p-8">
                        <div className="mb-6 flex items-center gap-3 border-b border-border pb-5">
                          <span className="grid h-11 w-11 place-items-center rounded-soft bg-flame/10 text-flame-hover">
                            <Check className="h-5 w-5" />
                          </span>
                          <div>
                            <h2 className="heading-sm">Ringkasan Pesanan</h2>
                            <p className="mt-0.5 text-xs text-ink-muted">
                              {paket
                                ? `Paket ${getPaket(paket)?.nama} · ${stepOrder.length - 1} langkah selesai`
                                : "Paket belum dipilih"}
                            </p>
                          </div>
                        </div>
                        {summaryBody}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-6">
              {!isFirstStep && (
                <Button variant="secondary" onClick={prevStep}>
                  <ChevronLeft className="mr-1 h-4 w-4" /> Kembali
                </Button>
              )}
              {isLastStep ? (
                <Button variant="secondary" onClick={resetCalculator} className="ml-auto">
                  <RotateCcw className="mr-2 h-4 w-4" /> Reset Kalkulator
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  disabled={currentStep === "paket" && !paket}
                  className="ml-auto"
                >
                  Lanjut <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {currentStep !== "summary" && (
            <aside className="hidden min-w-0 lg:block">
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  aria-live="polite"
                  className="rounded-card-lg border border-border bg-paper p-6 shadow-layer-2"
                >
                  <h2 className="heading-sm mb-5">Ringkasan</h2>
                  {summaryBody}
                </motion.div>
              </div>
            </aside>
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 border-t border-border bg-paper/95 px-5 py-4 text-left backdrop-blur-[12px]"
            >
              <span className="text-body-sm font-medium text-ink">Lihat ringkasan</span>
              <NumberFlow
                value={totals.total}
                prefix="Rp"
                className="text-heading-sm font-semibold text-flame-hover"
              />
              <ChevronRight className="h-4 w-4 text-ink-muted" />
            </button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[88vh] pb-6">
            <DrawerHeader className="pb-4">
              <DrawerTitle>Ringkasan Pesanan</DrawerTitle>
            </DrawerHeader>
            <div className="pb-6">{summaryBody}</div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="shrink-0 font-semibold text-ink">
        <NumberFlow value={value} prefix="Rp" />
        {suffix ? <span className="text-ink-muted">{suffix}</span> : null}
      </dd>
    </div>
  );
}

function StepHeading({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="mb-6">
      <h2 className="heading-md">{title}</h2>
      <p className="body-sm mt-1.5 text-ink-muted">{hint}</p>
    </div>
  );
}

function PaketStep({
  selected,
  locked,
  onSelect,
}: {
  selected: PaketId | null;
  locked: boolean;
  onSelect: (id: PaketId) => void;
}) {
  return (
    <div>
      <StepHeading
        title="Pilih jenis website"
        hint={locked ? "Paket terkunci dari pilihan Anda." : "Pilih paket yang paling sesuai untuk bisnis Anda."}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        {PAKET.map((p, i) => {
          const Icon = PAKET_ICONS[p.id as keyof typeof PAKET_ICONS];
          const isSelected = selected === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelect(p.id as PaketId)}
              disabled={locked && !isSelected}
              className={cn(
                "relative rounded-card border p-6 text-left transition-all duration-standard",
                isSelected
                  ? "border-flame bg-flame/5 shadow-layer-1"
                  : "border-border bg-paper hover:border-flame/40 hover:shadow-layer-1"
              )}
            >
              <div className="flex items-start justify-between">
                <span
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-soft",
                    isSelected ? "bg-flame text-ink" : "bg-paper-subtle text-ink"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="mono-xs text-ink-muted">0{i + 1}</span>
              </div>
              <h3 className="heading-sm mt-5">{p.nama}</h3>
              <p className="mt-2 body-sm text-ink-muted">{p.deskripsi}</p>
              <div className="mt-5 border-t border-border pt-4">
                <span className="font-display text-xl font-medium text-ink">
                  {formatIdr(p.hargaDiskon)}
                </span>
                <span className="ml-2 text-body-sm line-through text-ink-muted">
                  {formatIdr(p.hargaNormal)}
                </span>
              </div>
              {isSelected && (
                <span className="absolute -right-2 -top-2 rounded-pill bg-lime px-2.5 py-1 text-mono-xs font-bold uppercase tracking-[0.08em] text-forest">
                  Dipilih
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DomainStep({
  value,
  onSelect,
}: {
  value: DomainId;
  onSelect: (id: DomainId) => void;
}) {
  return (
    <div>
      <StepHeading
        title="Pilih domain"
        hint="Sudah punya domain sendiri? Pilih “Tanpa domain”."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {DOMAIN.map((d) => {
          const isSelected = value === d.id;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => onSelect(d.id as DomainId)}
              className={cn(
                "flex items-center justify-between gap-4 rounded-soft border px-5 py-4 text-left transition-colors duration-micro",
                isSelected
                  ? "border-flame bg-flame/5"
                  : "border-border bg-paper hover:border-flame/40"
              )}
            >
              <span
                className={cn(
                  "font-mono text-body-sm font-semibold",
                  isSelected ? "text-ink" : "text-ink"
                )}
              >
                {d.nama}
              </span>
              <span
                className={cn(
                  "text-body-sm font-semibold",
                  isSelected ? "text-ink" : "text-ink"
                )}
              >
                {d.harga === 0 ? "Gratis" : formatIdr(d.harga)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function HostingStep({
  value,
  options,
  onSelect,
}: {
  value: HostingId;
  options: typeof HOSTING;
  onSelect: (id: HostingId) => void;
}) {
  const DESC: Record<string, string> = {
    free: "Netlify/Cloudflare — cocok untuk situs statis",
    shared: "Support form, email, PHP sederhana",
    backend: "VPS untuk Next.js, database, API",
  };

  return (
    <div>
      <StepHeading
        title="Pilih hosting"
        hint="Opsi hosting menyesuaikan paket yang dipilih."
      />
      <div className="grid gap-3">
        {options.map((h) => {
          const isSelected = value === h.id;
          return (
            <button
              key={h.id}
              type="button"
              onClick={() => onSelect(h.id as HostingId)}
              className={cn(
                "flex items-center justify-between gap-4 rounded-soft border px-5 py-4 text-left transition-colors duration-micro",
                isSelected
                  ? "border-flame bg-flame/5"
                  : "border-border bg-paper hover:border-flame/40"
              )}
            >
              <div className="flex items-start gap-3">
                <Database
                  className={cn("mt-0.5 h-4 w-4", isSelected ? "text-ink" : "text-ink-muted")}
                />
                <div>
                  <p className={cn("text-body-sm font-medium", isSelected ? "text-ink" : "text-ink")}>
                    {h.nama}
                  </p>
                  {h.id !== "none" && (
                    <p className="mt-1 text-xs text-ink-muted">{DESC[h.id]}</p>
                  )}
                </div>
              </div>
              <span
                className={cn(
                  "shrink-0 text-body-sm font-semibold",
                  isSelected ? "text-ink" : "text-ink"
                )}
              >
                {h.harga === 0 ? "Gratis" : `${formatIdr(h.harga)}/thn`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AddonStep({
  value,
  options,
  onToggle,
}: {
  value: AddonId[];
  options: typeof ADDON;
  onToggle: (ids: AddonId[]) => void;
}) {
  const cms = getCmsAddon();
  const list = cms ? [cms, ...options.filter((a) => a.id !== "cms")] : options;

  return (
    <div>
      <StepHeading
        title="Tambahkan layanan opsional"
        hint="CMS Custom lets you add and manage articles yourself (+Rp500rb)."
      />
      <div className="grid max-h-80 gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
        {list.map((a) => {
          const isSelected = value.includes(a.id as AddonId);
          return (
            <label
              key={a.id}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-soft border px-5 py-4 transition-colors duration-micro",
                isSelected
                  ? "border-flame bg-flame/5"
                  : "border-border bg-paper hover:border-flame/40"
              )}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() =>
                  onToggle(
                    isSelected
                      ? value.filter((id) => id !== (a.id as AddonId))
                      : [...value, a.id as AddonId]
                  )
                }
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-border-strong text-flame-hover focus:ring-flame-hover"
              />
              <span className="min-w-0 flex-1">
                <span className="block text-body-sm font-medium text-ink">{a.nama}</span>
                <span className="mt-1 block text-xs text-ink-muted">
                  + {formatIdr(a.harga)}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function ReffStep({
  code,
  valid,
  nama,
  onChange,
  onSubmit,
}: {
  code: string;
  valid: boolean;
  nama: string;
  onChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit}>
      <StepHeading
        title="Kode referral"
        hint={`Punya kode? Potongan ${formatIdr(DISKON_REFF)} langsung terpotong.`}
      />
      <div className="flex gap-3">
        <input
          type="text"
          value={code}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          placeholder="Contoh: BUDI01"
          maxLength={10}
          autoComplete="off"
          className="input-field flex-1 uppercase tracking-wider"
          aria-label="Kode referral"
        />
        <Button type="submit" className="shrink-0 px-6">
          Cek
        </Button>
      </div>
      {code && (
        <p
          className={cn(
            "mt-3 flex items-center gap-2 text-body-sm",
            valid ? "text-forest" : "text-flame-hover"
          )}
        >
          {valid ? (
            <>
              <Check className="h-4 w-4 shrink-0" />
              Kode valid — <strong>{nama}</strong>
            </>
          ) : (
            <>
              <AlertCircle className="h-4 w-4 shrink-0" />
              Kode <strong>&quot;{code}&quot;</strong> tidak valid
            </>
          )}
        </p>
      )}
    </form>
  );
}
