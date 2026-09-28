"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Check, AlertCircle, Tag, MessageCircle, ArrowUpRight, Database } from "lucide-react";
import { cn, formatIdr, waLink } from "@/lib/utils";
import { PAKET, DOMAIN, HOSTING, ADDON, getCmsAddon, DISKON_REFF, REFF_CODES, type PaketId, type DomainId, type HostingId, type AddonId } from "@/lib/data";
import { SITE } from "@/content/site";

type Step = "paket" | "domain" | "hosting" | "addon" | "reff" | "summary";

const STEPS: { id: Step; label: string; icon: React.ReactNode }[] = [
  { id: "paket", label: "Paket", icon: <div className="w-5 h-5" /> },
  { id: "domain", label: "Domain", icon: <div className="w-5 h-5" /> },
  { id: "hosting", label: "Hosting", icon: <Database className="w-5 h-5" /> },
  { id: "addon", label: "Tambahan", icon: <div className="w-5 h-5" /> },
  { id: "reff", label: "Referral", icon: <Tag className="w-5 h-5" /> },
  { id: "summary", label: "Ringkasan", icon: <MessageCircle className="w-5 h-5" /> },
];

function getStepOrder(paket: PaketId | null): Step[] {
  const base: Step[] = ["paket", "domain"];
  if (paket !== "landing") {
    base.push("hosting");
  }
  return [...base, "addon", "reff", "summary"];
}

function getAllowedHosting(paketId: PaketId) {
  return HOSTING.filter((h) => h.paket.includes(paketId));
}

function getAllowedAddons(paketId: PaketId) {
  return ADDON.filter((a) => a.paket.includes(paketId));
}

function getPaketById(id: PaketId | null) {
  return id ? PAKET.find((p) => p.id === id) : null;
}

function getDomainById(id: DomainId) {
  return DOMAIN.find((d) => d.id === id);
}

function getHostingById(id: HostingId) {
  return HOSTING.find((h) => h.id === id);
}

function getAddonById(id: AddonId) {
  return ADDON.find((a) => a.id === id);
}

function getDefaultHosting(paketId: PaketId): HostingId {
  if (paketId === "landing") return "free";
  if (paketId === "umkm") return "free";
  return "backend";
}

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPaket?: PaketId;
}

export function CalculatorModal({ isOpen, onClose, initialPaket }: CalculatorModalProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [paket, setPaket] = useState<PaketId | null>(initialPaket || null);
  const [domain, setDomain] = useState<DomainId>("none");
  const [hosting, setHosting] = useState<HostingId>("none");
  const [addons, setAddons] = useState<AddonId[]>([]);
  const [reffCode, setReffCode] = useState("");
  const [reffValid, setReffValid] = useState(false);
  const [reffNama, setReffNama] = useState("");

  const stepOrder = getStepOrder(paket);
  const currentStep = stepOrder[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === stepOrder.length - 1;

  const allowedHosting = paket ? getAllowedHosting(paket) : [];
  const allowedAddons = paket ? getAllowedAddons(paket) : [];

  useEffect(() => {
    if (paket) {
      const defaultHosting = getDefaultHosting(paket);
      if (!allowedHosting.some((h) => h.id === hosting)) {
        setHosting(defaultHosting);
      }
      setAddons((prev) => prev.filter((a) => allowedAddons.some((allowed) => allowed.id === a)));
    }
  }, [paket, allowedHosting, allowedAddons, hosting]);

  useEffect(() => {
    if (isOpen && initialPaket) {
      setPaket(initialPaket);
      setHosting(getDefaultHosting(initialPaket));
      setStepIndex(1);
    } else if (isOpen) {
      setStepIndex(0);
    }
  }, [isOpen, initialPaket]);

  const nextStep = useCallback(() => {
    if (stepIndex < stepOrder.length - 1) setStepIndex((i) => i + 1);
  }, [stepIndex, stepOrder.length]);

  const prevStep = useCallback(() => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }, [stepIndex]);

  const goToStep = useCallback((targetStep: Step) => {
    const idx = stepOrder.indexOf(targetStep);
    if (idx !== -1) setStepIndex(idx);
  }, [stepOrder]);

  const validateReff = useCallback(() => {
    const code = reffCode.toUpperCase();
    const ref = REFF_CODES[code];
    if (ref && ref.aktif) {
      setReffValid(true);
      setReffNama(ref.nama);
    } else if (code) {
      setReffValid(false);
      setReffNama("");
    } else {
      setReffValid(false);
      setReffNama("");
    }
  }, [reffCode]);

  const totals = (() => {
    const pkg = getPaketById(paket);
    const dom = getDomainById(domain);
    const host = getHostingById(hosting);

    const paketHarga = pkg?.hargaDiskon ?? 0;
    const domainHarga = dom?.harga ?? 0;
    const hostingHarga = host?.harga ?? 0;
    const addonsHarga = addons.reduce((sum, id) => sum + (getAddonById(id)?.harga ?? 0), 0);

    const subtotal = paketHarga + domainHarga + hostingHarga + addonsHarga;
    const diskonReff = reffValid ? DISKON_REFF : 0;
    const total = subtotal - diskonReff;

    return { paketHarga, domainHarga, hostingHarga, addonsHarga, subtotal, diskonReff, total };
  })();

  const handleSubmitReff = (e: React.FormEvent) => {
    e.preventDefault();
    validateReff();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Kalkulator Harga"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg max-h-[90vh] bg-paper rounded-2xl shadow-soft overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4 sticky top-0 bg-paper z-10">
            <h2 className="font-semibold text-ink">Simulasi Harga</h2>
            <button
              onClick={onClose}
              className="icon-button p-2 h-9 w-9"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center justify-between px-5 py-3 border-b border-line bg-cream-dim overflow-x-auto scrollbar-hide">
            {stepOrder.map((s, i) => (
              <button
                key={s}
                onClick={() => goToStep(s)}
                disabled={s === "summary" && !paket}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0",
                  i < stepIndex
                    ? "bg-accent text-white"
                    : i === stepIndex
                    ? "bg-ink text-white"
                    : "bg-paper text-ink-muted hover:bg-cream-dim"
                )}
                aria-current={i === stepIndex ? "step" : undefined}
              >
                {i < stepIndex ? <Check className="h-3.5 w-3.5" /> : <span className="w-5 h-5 text-center">{i + 1}</span>}
                <span className="hidden sm:inline">{STEPS.find((st) => st.id === s)?.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-y-auto p-5"
            >
              {currentStep === "paket" && (
                <PaketStep
                  paket={paket}
                  onSelect={setPaket}
                  onNext={nextStep}
                  disabled={!!paket}
                />
              )}
              {currentStep === "domain" && (
                <DomainStep
                  domain={domain}
                  onSelect={setDomain}
                  onNext={nextStep}
                  onBack={prevStep}
                  hasPaket={!!paket}
                />
              )}
              {currentStep === "hosting" && (
                <HostingStep
                  hosting={hosting}
                  onSelect={setHosting}
                  onNext={nextStep}
                  onBack={prevStep}
                  allowedHosting={allowedHosting}
                  hasPaket={!!paket}
                />
              )}
              {currentStep === "addon" && (
                <AddonStep
                  addons={addons}
                  onToggle={setAddons}
                  onNext={nextStep}
                  onBack={prevStep}
                  allowedAddons={allowedAddons}
                  hasPaket={!!paket}
                />
              )}
              {currentStep === "reff" && (
                <ReffStep
                  reffCode={reffCode}
                  onChange={setReffCode}
                  onSubmit={handleSubmitReff}
                  reffValid={reffValid}
                  reffNama={reffNama}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {currentStep === "summary" && (
                <SummaryStep
                  totals={totals}
                  paket={paket}
                  domain={domain}
                  hosting={hosting}
                  addons={addons}
                  reffValid={reffValid}
                  reffNama={reffNama}
                  onBack={prevStep}
                  onOrder={onClose}
                />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="border-t border-line px-5 py-4 sticky bottom-0 bg-paper flex items-center justify-between gap-3">
            {!isLastStep && (
              <>
                {!isFirstStep && (
                  <button onClick={prevStep} className="button-secondary flex-1 sm:flex-none">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Kembali
                  </button>
                )}
                <button
                  onClick={nextStep}
                  disabled={currentStep === "paket" && !paket}
                  className="button-primary flex-1 sm:flex-none justify-center"
                >
                  Lanjut <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </>
            )}
            {isLastStep && (
              <button onClick={onClose} className="button-secondary w-full">
                Selesai
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function PaketStep({ paket, onSelect, onNext, disabled }: { paket: PaketId | null; onSelect: (id: PaketId) => void; onNext: () => void; disabled: boolean }) {
  const ICONS = { landing: "🌐", umkm: "🏪", ecommerce: "🛒" } as const;
  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-muted text-center">Pilih paket yang paling sesuai untuk bisnis Anda</p>
      <div className="grid gap-3 sm:grid-cols-3">
        {PAKET.map((p) => {
          const isSelected = paket === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => { onSelect(p.id as PaketId); if (!disabled) onNext(); }}
              disabled={disabled && !isSelected}
              className={cn(
                "relative rounded-2xl border p-4 transition-all duration-200 text-center",
                isSelected
                  ? "border-ink bg-ink text-white shadow-soft"
                  : "border-line bg-paper text-ink hover:border-accent/50"
              )}
            >
              <span className="text-3xl">{ICONS[p.id as keyof typeof ICONS]}</span>
              <h3 className="mt-2 font-semibold">{p.nama}</h3>
              <p className="mt-1 text-xs text-ink-muted">{p.deskripsi}</p>
              <div className="mt-3 border-t pt-3" style={{ borderColor: isSelected ? "rgba(255,255,255,.12)" : undefined }}>
                <div className="text-lg font-semibold">Rp{p.hargaDiskon.toLocaleString("id-ID")}</div>
                <div className="text-xs line-through text-ink-muted">Rp{p.hargaNormal.toLocaleString("id-ID")}</div>
              </div>
              {isSelected && <div className="absolute -top-2 -right-2 bg-accent text-white text-[10px] px-1.5 py-0.5 rounded-full">Dipilih</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DomainStep({ domain, onSelect, onNext, onBack, hasPaket }: { domain: DomainId; onSelect: (id: DomainId) => void; onNext: () => void; onBack: () => void; hasPaket: boolean }) {
  if (!hasPaket) return <EmptyState onBack={onBack} message="Pilih paket terlebih dahulu" />;

  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-muted text-center">Sudah punya domain? Pilih "Tanpa domain"</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {DOMAIN.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => { onSelect(d.id as DomainId); onNext(); }}
            className={cn(
              "flex items-center justify-between rounded-xl border p-3 transition-colors",
              domain === d.id ? "border-ink bg-ink/5" : "border-line bg-paper hover:border-accent/50"
            )}
          >
            <span className={cn("font-mono text-sm font-semibold", domain === d.id ? "text-accent" : "text-ink")}>{d.nama}</span>
            <span className={cn("font-semibold", domain === d.id ? "text-accent" : "text-ink")}>
              {d.harga === 0 ? "Gratis" : formatIdr(d.harga)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function HostingStep({ hosting, onSelect, onNext, onBack, allowedHosting, hasPaket }: { hosting: HostingId; onSelect: (id: HostingId) => void; onNext: () => void; onBack: () => void; allowedHosting: typeof HOSTING; hasPaket: boolean }) {
  if (!hasPaket) return <EmptyState onBack={onBack} message="Pilih paket terlebih dahulu" />;

  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-muted text-center">Opsi hosting menyesuaikan paket yang dipilih</p>
      <div className="grid gap-2">
        {allowedHosting.map((h) => (
          <button
            key={h.id}
            type="button"
            onClick={() => { onSelect(h.id as HostingId); onNext(); }}
            className={cn(
              "flex items-center justify-between rounded-xl border p-3 transition-colors text-left",
              hosting === h.id ? "border-ink bg-ink/5" : "border-line bg-paper hover:border-accent/50"
            )}
          >
            <div>
              <div className="font-medium">{h.nama}</div>
              {h.id !== "none" && (
                <p className="text-xs text-ink-muted">
                  {h.id === "free" && "Netlify/Cloudflare — cocok untuk statis"}
                  {h.id === "shared" && "Support form, email, PHP sederhana"}
                  {h.id === "backend" && "VPS untuk Next.js, database, API"}
                </p>
              )}
            </div>
            <span className={cn("font-semibold", hosting === h.id ? "text-accent" : "text-ink")}>
              {h.harga === 0 ? "Gratis" : `${formatIdr(h.harga)}/tahun`}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function AddonStep({ addons, onToggle, onNext, onBack, allowedAddons, hasPaket }: { addons: AddonId[]; onToggle: (ids: AddonId[]) => void; onNext: () => void; onBack: () => void; allowedAddons: typeof ADDON; hasPaket: boolean }) {
  if (!hasPaket) return <EmptyState onBack={onBack} message="Pilih paket terlebih dahulu" />;

  const cmsAddon = getCmsAddon();
  const allAddons = cmsAddon ? [cmsAddon, ...allowedAddons.filter(a => a.id !== "cms")] : allowedAddons;

  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-muted text-center">Tambahkan layanan opsional (hanya yang relevan ditampilkan)</p>
      <div className="grid gap-2 sm:grid-cols-2 max-h-64 overflow-y-auto">
        {allAddons.map((a) => {
          const isSelected = addons.includes(a.id as AddonId);
          return (
            <label
              key={a.id}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition-colors",
                isSelected ? "border-accent bg-accent/5" : "border-line bg-paper hover:border-accent/50"
              )}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggle(
                  isSelected
                    ? addons.filter((id) => id !== a.id)
                    : [...addons, a.id as AddonId]
                )}
                className="h-4 w-4 rounded border-ink text-accent focus:ring-accent"
              />
              <div className="flex-1 min-w-0">
                <span className="font-medium truncate block">{a.nama}</span>
                <span className="text-xs text-ink-muted">+ {formatIdr(a.harga)}</span>
              </div>
            </label>
          );
        })}
      </div>
      <button onClick={onNext} className="button-primary w-full justify-center mt-2">Lanjut</button>
    </div>
  );
}

function ReffStep({ reffCode, onChange, onSubmit, reffValid, reffNama, onNext, onBack }: { reffCode: string; onChange: (v: string) => void; onSubmit: (e: React.FormEvent) => void; reffValid: boolean; reffNama: string; onNext: () => void; onBack: () => void }) {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <p className="text-sm text-ink-muted text-center">Masukkan kode referral untuk potongan {formatIdr(DISKON_REFF)}</p>
      <div className="flex gap-2">
        <input
          type="text"
          value={reffCode}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          placeholder="Contoh: BUDI01"
          maxLength={10}
          className="field text-uppercase tracking-wider flex-1"
          autoComplete="off"
        />
        <button type="submit" className="button-secondary shrink-0 px-4">Cek</button>
      </div>
      {reffCode && (
        <div className={cn("flex items-center gap-2 text-sm px-1", reffValid ? "text-lime" : "text-accent")}>
          {reffValid ? (
            <>
              <Check className="h-4 w-4 shrink-0" />
              Kode valid — <strong>{reffNama}</strong> (Potongan {formatIdr(DISKON_REFF)})
            </>
          ) : (
            <>
              <AlertCircle className="h-4 w-4 shrink-0" />
              Kode <strong>"{reffCode}"</strong> tidak valid
            </>
          )}
        </div>
      )}
      <button type="button" onClick={onNext} className="button-primary w-full justify-center mt-2">Lanjut</button>
    </form>
  );
}

function SummaryStep({ totals, paket, domain, hosting, addons, reffValid, reffNama, onBack, onOrder }: {
  totals: { paketHarga: number; domainHarga: number; hostingHarga: number; addonsHarga: number; subtotal: number; diskonReff: number; total: number };
  paket: PaketId | null;
  domain: DomainId;
  hosting: HostingId;
  addons: AddonId[];
  reffValid: boolean;
  reffNama: string;
  onBack: () => void;
  onOrder: () => void;
}) {
  const pkg = getPaketById(paket!);
  const dom = getDomainById(domain);
  const host = getHostingById(hosting);
  const cmsAddon = addons.includes("cms");

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-line bg-cream-dim p-4">
        <h3 className="font-semibold text-ink">Ringkasan Pesanan</h3>
        <dl className="mt-3 space-y-2 text-sm">
          {pkg && (
            <div className="flex justify-between">
              <dt className="text-ink-soft">{pkg.nama}</dt>
              <dd className="font-semibold text-ink">{formatIdr(totals.paketHarga)}</dd>
            </div>
          )}
          {dom && dom.harga > 0 && (
            <div className="flex justify-between">
              <dt className="text-ink-soft">Domain {dom.nama}</dt>
              <dd className="font-semibold text-ink">{formatIdr(totals.domainHarga)}</dd>
            </div>
          )}
          {host && host.harga > 0 && (
            <div className="flex justify-between">
              <dt className="text-ink-soft">Hosting {host.nama}</dt>
              <dd className="font-semibold text-ink">{formatIdr(totals.hostingHarga)}/tahun</dd>
            </div>
          )}
          {cmsAddon && (
            <div className="flex justify-between">
              <dt className="text-ink-soft">CMS Custom (Kelola Artikel & Konten Sendiri)</dt>
              <dd className="font-semibold text-ink">{formatIdr(500_000)}</dd>
            </div>
          )}
          {addons.filter(id => id !== "cms").length > 0 && (
            <div className="border-t border-line pt-2">
              <dt className="text-ink-soft">Add-on lain ({addons.filter(id => id !== "cms").length})</dt>
              <dd className="mt-1 space-y-1">
                {addons.filter(id => id !== "cms").map((id) => {
                  const a = getAddonById(id);
                  return a ? (
                    <div key={a.id} className="flex justify-between text-xs">
                      <span className="text-ink-soft">{a.nama}</span>
                      <span className="font-medium text-ink">{formatIdr(a.harga)}</span>
                    </div>
                  ) : null;
                })}
              </dd>
            </div>
          )}
        </dl>
        <div className="mt-3 border-t border-line pt-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-ink-soft">Subtotal</span>
            <span className="font-semibold text-ink">{formatIdr(totals.subtotal)}</span>
          </div>
          {reffValid && totals.diskonReff > 0 && (
            <div className="flex justify-between text-sm text-accent">
              <span className="flex items-center gap-1">Diskon Referral ({reffNama})</span>
              <span className="font-semibold">- {formatIdr(totals.diskonReff)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-line pt-2">
            <span className="text-lg font-semibold text-ink">Total</span>
            <span className="text-2xl font-semibold text-accent">{formatIdr(totals.total)}</span>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-ink-muted">DP 50% mulai, 50% sebelum go-live · Revisi 2x · Setup domain & hosting inklusi</p>
      <a
        href={waLink(`Halo ${SITE.name}, saya mau pesan paket *${pkg?.nama}* dengan total *${formatIdr(totals.total)}*.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="button-primary w-full justify-center gap-2"
        onClick={onOrder}
      >
        <MessageCircle className="h-4 w-4" />
        Pesan via WhatsApp
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}

function EmptyState({ onBack, message }: { onBack: () => void; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-12">
      <p className="text-ink-muted">{message}</p>
      <button onClick={onBack} className="button-secondary mt-4">Kembali pilih paket</button>
    </div>
  );
}