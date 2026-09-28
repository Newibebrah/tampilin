"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, Sparkles, Globe2, Layers3, Store } from "lucide-react";

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
  onSimulate: () => void;
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
  onSimulate,
  onOrder,
}: ServiceCardProps) {
  const IconComponent = icon === "globe" ? Globe2 : icon === "layers" ? Layers3 : Store;

  const icons = { globe: Globe2, layers: Layers3, store: Store };

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
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-flame/10 px-3 py-1 text-mono-xs font-semibold text-flame">
            <Sparkles className="h-3 w-3" /> Paling Populer
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-flame/10 text-flame">
            <IconComponent className="h-6 w-6" />
          </span>
          <span className="tag tag-flame">{category}</span>
        </div>
        <span className="mono-xs text-ink-muted">0{id === "landing" ? 1 : id === "umkm" ? 2 : 3}</span>
      </div>

      <h3 className="heading-md mb-3">{name}</h3>
      <p className="body-sm text-ink-muted mb-6 flex-1">{description}</p>

      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-display-sm font-display font-medium text-ink">
          Rp{price.toLocaleString("id-ID")}
        </span>
        <span className="text-body-sm line-through text-ink-muted">
          Rp{originalPrice.toLocaleString("id-ID")}
        </span>
        <span className="tag tag-lime ml-auto">Hemat Rp{(originalPrice - price).toLocaleString("id-ID")}</span>
      </div>

      <ul className="space-y-3 mb-6 flex-1">
        {features.slice(0, 4).map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-body-sm text-ink-soft">
            <span className="mt-0.5 flex-shrink-0 h-5 w-5 rounded-full bg-flame/10 flex items-center justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            </span>
            {feature}
          </li>
        ))}
        {features.length > 4 && (
          <li className="text-body-sm text-flame font-medium">+{features.length - 4} fitur lain</li>
        )}
      </ul>

      <div className="flex gap-3 pt-4 border-t border-border">
        <Button variant="primary" size="sm" className="flex-1" onClick={onSimulate}>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Simulasi Harga
        </Button>
        <Button variant="secondary" size="sm" className="flex-1" onClick={onOrder}>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Pesan
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
  onSimulate: (id: string) => void;
  onOrder: (id: string) => void;
}

export function BentoGrid({ services, onSimulate, onOrder }: BentoGridProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {services.map((service, index) => (
        <ServiceCard
          key={service.id}
          {...service}
          onSimulate={() => onSimulate(service.id)}
          onOrder={() => onOrder(service.id)}
        />
      ))}
    </div>
  );
}