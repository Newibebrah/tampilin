"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/Badge";
import { IconContainer } from "@/components/IconContainer";
import {
  ArrowUpRight,
  Building2,
  Check,
  MessageCircle,
  Rocket,
  ShoppingBag,
  Sparkles,
  TrendingDown,
} from "lucide-react";

export type ServiceIcon = "rocket" | "building" | "store";

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice: number;
  features: string[];
  icon: ServiceIcon;
  isPopular?: boolean;
}

const ICONS = { rocket: Rocket, building: Building2, store: ShoppingBag } as const;

const rupiah = (value: number) => `Rp${value.toLocaleString("id-ID")}`;

export function ServiceCard({
  service,
  onOrder,
  footnote,
  orderLabel = "Pesan Paket Ini",
  orderIcon = <MessageCircle className="h-4 w-4" />,
}: {
  service: Service;
  onOrder: () => void;
  footnote?: React.ReactNode;
  orderLabel?: string;
  orderIcon?: React.ReactNode;
}) {
  const Icon = ICONS[service.icon];
  const savings = service.originalPrice - service.price;
  const featured = Boolean(service.isPopular);

  return (
    <motion.article
      className={cn(
        "relative flex h-full flex-col rounded-card-lg border p-8 transition-all duration-standard",
        featured
          ? "border-flame bg-flame text-paper shadow-glow-flame lg:-my-3 lg:py-11"
          : "border-border bg-paper-subtle hover:-translate-y-1 hover:border-flame hover:bg-paper hover:shadow-layer-2"
      )}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {featured && (
        <div className="absolute -top-3 left-8">
          <Badge tone="ink" className="border-transparent bg-lime text-forest">
            <Sparkles className="h-3 w-3" />
            Paling Populer
          </Badge>
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <IconContainer tone={featured ? "inverse" : "flame"} size="lg">
          <Icon strokeWidth={2} />
        </IconContainer>
        <span className={cn("mono-xs", featured ? "text-paper/70" : "text-ink-subtle")}>
          {service.category}
        </span>
      </div>

      <h3 className={cn("heading-md mt-6", featured ? "text-paper" : "text-ink")}>{service.name}</h3>
      <p className={cn("body-sm mt-2 flex-1", featured ? "text-paper/80" : "text-ink-muted")}>
        {service.description}
      </p>

      <div className={cn("mt-6 border-y py-5", featured ? "border-paper/20" : "border-border")}>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span
            className={cn(
              "font-display text-[2rem] font-extrabold leading-none tracking-[-0.04em]",
              featured ? "text-paper" : "text-ink"
            )}
          >
            {rupiah(service.price)}
          </span>
          <span className={cn("body-sm line-through", featured ? "text-paper/60" : "text-ink-subtle")}>
            {rupiah(service.originalPrice)}
          </span>
        </div>
        <span
          className={cn(
            "mt-3 inline-flex items-center gap-1.5 text-mono-xs font-bold uppercase tracking-[0.08em]",
            featured ? "text-lime" : "text-forest"
          )}
        >
          <TrendingDown className="h-3.5 w-3.5" strokeWidth={2.5} />
          Hemat {rupiah(savings)}
        </span>
      </div>

      {footnote && (
        <p
          className={cn(
            "mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-mono-xs",
            featured ? "text-paper/70" : "text-ink-muted"
          )}
        >
          {footnote}
        </p>
      )}

      <ul className="mt-6 flex-1 space-y-2.5">
        {service.features.slice(0, 4).map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <span
              className={cn(
                "mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full",
                featured ? "bg-lime/25 text-lime" : "bg-flame/10 text-flame"
              )}
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className={cn("body-sm", featured ? "text-paper/85" : "text-ink-muted")}>{feature}</span>
          </li>
        ))}
        {service.features.length > 4 && (
          <li className={cn("body-sm font-semibold", featured ? "text-lime" : "text-flame")}>
            +{service.features.length - 4} fitur lain
          </li>
        )}
      </ul>

      <Button
        size="lg"
        variant={featured ? "secondary" : "primary"}
        className={cn(
          "mt-8 w-full",
          featured && "border-paper/40 bg-transparent text-paper hover:bg-paper hover:text-forest"
        )}
        onClick={onOrder}
      >
        {orderIcon}
        {orderLabel}
        <ArrowUpRight className="h-4 w-4" />
      </Button>
    </motion.article>
  );
}

export function ServiceGrid({
  services,
  onOrder,
  footnote,
  orderLabel,
  orderIcon,
}: {
  services: Service[];
  onOrder: (id: string) => void;
  footnote?: (service: Service) => React.ReactNode;
  orderLabel?: string;
  orderIcon?: React.ReactNode;
}) {
  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          footnote={footnote?.(service)}
          orderLabel={orderLabel}
          orderIcon={orderIcon}
          onOrder={() => onOrder(service.id)}
        />
      ))}
    </div>
  );
}
