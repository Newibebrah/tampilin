"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, Sparkles, Globe2, Layers3, Store, TrendingDown } from "lucide-react";

interface ServiceCardProps {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice: number;
  features: string[];
  icon: "globe" | "layers" | "store";
  isPopular?: boolean;
  onOrder: () => void;
}

export function ServiceCard({
  id,
  name,
  category,
  description,
  price,
  originalPrice,
  features,
  icon,
  isPopular = false,
  onOrder,
}: ServiceCardProps) {
  const IconComponent = icon === "globe" ? Globe2 : icon === "layers" ? Layers3 : Store;
  const savings = originalPrice - price;

  return (
    <motion.article
      layout
      className={cn(
        "relative flex flex-col rounded-sharp border border-border bg-paper/80 backdrop-blur-md p-8 transition-all duration-standard hover:shadow-layer-2 hover:-translate-y-1",
        isPopular && "border-flame/50"
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-flame px-3 py-1 text-mono-xs font-semibold text-paper">
            <Sparkles className="h-3 w-3" /> Paling Populer
          </span>
        </div>
      )}

      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-flame/10 text-flame">
            <IconComponent className="h-6 w-6" />
          </span>
          <span className="tag tag-flame">{category}</span>
        </div>
        <span className="mono-xs text-ink-muted">0{id === "landing" ? 1 : id === "umkm" ? 2 : 3}</span>
      </div>

      <h3 className="heading-md mb-3">{name}</h3>
      <p className="body-sm mb-6 flex-1 text-ink-muted">{description}</p>

      <div className="mb-6 border-y border-border py-5">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-display-sm font-display font-medium leading-none text-ink">
            Rp{price.toLocaleString("id-ID")}
          </span>
          <span className="text-body-sm text-ink-muted line-through decoration-ink-subtle/60">
            Rp{originalPrice.toLocaleString("id-ID")}
          </span>
        </div>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-pill bg-lime px-3 py-1 text-mono-xs font-bold uppercase tracking-[0.08em] text-forest">
          <TrendingDown className="h-3.5 w-3.5" strokeWidth={2.5} />
          Hemat Rp{savings.toLocaleString("id-ID")}
        </span>
      </div>

      <ul className="mb-6 flex-1 space-y-3">
        {features.slice(0, 4).map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-body-sm text-ink-muted">
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-flame/10">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            </span>
            {feature}
          </li>
        ))}
        {features.length > 4 && (
          <li className="text-body-sm font-medium text-flame">+{features.length - 4} fitur lain</li>
        )}
      </ul>

      <div className="border-t border-border pt-5">
        <Button size="lg" className="group w-full" onClick={onOrder}>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Pesan Paket Ini
          <ArrowUpRight className="h-4 w-4 transition-transform duration-standard group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Button>
      </div>
    </motion.article>
  );
}

interface BentoGridProps {
  services: Array<{
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    originalPrice: number;
    features: string[];
    icon: "globe" | "layers" | "store";
    isPopular?: boolean;
  }>;
  onOrder: (id: string) => void;
}

export function BentoGrid({ services, onOrder }: BentoGridProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          {...service}
          onOrder={() => onOrder(service.id)}
        />
      ))}
    </div>
  );
}