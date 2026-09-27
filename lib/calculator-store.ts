import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PAKET, DOMAIN, HOSTING, ADDON, DISKON_REFF, REFF_CODES, type CalculatorState, type CalculatorTotals, type PaketId, type DomainId, type HostingId, type AddonId } from "./data";

interface CalculatorStore extends CalculatorState {
  setPaket: (paket: PaketId | null) => void;
  setDomain: (domain: DomainId) => void;
  setHosting: (hosting: HostingId) => void;
  toggleAddon: (addon: AddonId) => void;
  setReffCode: (code: string) => void;
  validateReff: () => void;
  reset: () => void;
  getTotals: () => CalculatorTotals;
}

const initialState: CalculatorState = {
  paket: null,
  domain: "none",
  hosting: "none",
  addons: [],
  reffCode: "",
  reffValid: false,
  reffNama: "",
};

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

export const useCalculatorStore = create<CalculatorStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setPaket: (paket) => {
        const state = get();
        let newHosting: HostingId = state.hosting;
        const pkg = getPaketById(paket);
        if (pkg) {
          const allowedHosting = HOSTING.filter((h) => h.paket.includes(pkg.id)).map((h) => h.id) as HostingId[];
          if (!allowedHosting.includes(state.hosting)) {
            newHosting = allowedHosting[0] || "none";
          }
        }
        set({ paket, hosting: newHosting });
        get().validateReff();
      },

      setDomain: (domain) => set({ domain }),

      setHosting: (hosting) => set({ hosting }),

      toggleAddon: (addon) =>
        set((state) => ({
          addons: state.addons.includes(addon)
            ? state.addons.filter((a) => a !== addon)
            : [...state.addons, addon],
        })),

      setReffCode: (code) => set({ reffCode: code.toUpperCase() }),

      validateReff: () => {
        const { reffCode } = get();
        const code = reffCode.toUpperCase();
        const ref = REFF_CODES[code];
        if (ref && ref.aktif) {
          set({ reffValid: true, reffNama: ref.nama });
        } else if (code) {
          set({ reffValid: false, reffNama: "" });
        } else {
          set({ reffValid: false, reffNama: "" });
        }
      },

      reset: () => set(initialState),

      getTotals: () => {
        const { paket, domain, hosting, addons, reffValid } = get();
        const pkg = getPaketById(paket);
        const dom = getDomainById(domain);
        const host = getHostingById(hosting);

        const paketHarga = pkg?.hargaDiskon ?? 0;
        const domainHarga = dom?.harga ?? 0;
        const hostingHarga = host?.harga ?? 0;
        const addonsHarga = (addons as AddonId[]).reduce((sum, id) => sum + (getAddonById(id)?.harga ?? 0), 0);

        const subtotal = paketHarga + domainHarga + hostingHarga + addonsHarga;
        const diskonReff = reffValid ? DISKON_REFF : 0;
        const total = subtotal - diskonReff;

        return {
          paketHarga,
          domainHarga,
          hostingHarga,
          addonsHarga,
          subtotal,
          diskonReff,
          total,
        };
      },
    }),
    {
      name: "tampilin-calculator",
      partialize: (state) => ({
        paket: state.paket,
        domain: state.domain,
        hosting: state.hosting,
        addons: state.addons,
        reffCode: state.reffCode,
      }),
    }
  )
);