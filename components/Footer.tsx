import { ArrowUpRight, Clock3, Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { waLink } from "@/lib/utils";
import { SITE, NAV_LINKS, FOOTER_NOTE } from "@/content/site";

const CONTACT_LINKS = [
  { href: waLink(), external: true, icon: MessageCircle, label: SITE.whatsappDisplay },
  { href: `mailto:${SITE.email}`, external: false, icon: Mail, label: SITE.email },
  { href: SITE.instagramUrl, external: true, icon: Instagram, label: SITE.instagram },
] as const;

const CONTACT_STATIC = [
  { icon: Clock3, label: SITE.hours },
  { icon: MapPin, label: SITE.city },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-paper-deep/40">
      <div className="section-shell grid gap-12 py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-soft bg-flame text-heading-sm font-extrabold text-paper shadow-glow-flame">
              t.
            </span>
            <span className="text-heading-lg font-bold tracking-[-0.03em] text-ink">
              tampilin<span className="text-flame-hover">.</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm body text-ink-muted">{SITE.tagline}</p>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="button-secondary button-secondary-sm mt-7"
          >
            {SITE.whatsappDisplay}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="md:col-span-3">
          <h3 className="flex items-center gap-2 text-caption font-bold uppercase tracking-[0.14em] text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-flame" />
            Navigasi
          </h3>
          <ul className="mt-5 space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="-ml-3 flex items-center gap-2 rounded-soft px-3 py-2 body-sm font-medium text-ink-muted transition-colors duration-micro hover:bg-paper hover:text-flame-hover"
                >
                  <span className="h-1 w-1 rounded-full bg-flame/40 transition-colors duration-micro group-hover:bg-flame" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h3 className="flex items-center gap-2 text-caption font-bold uppercase tracking-[0.14em] text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            Hubungi kami
          </h3>
          <ul className="mt-5 space-y-2.5 body-sm text-ink-muted">
            {CONTACT_LINKS.map(({ href, external, icon: Icon, label }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-3 transition-colors duration-micro hover:text-flame-hover"
                >
                  <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-icon bg-paper-subtle text-ink-muted transition-colors duration-micro group-hover:bg-flame group-hover:text-paper">
                    <Icon className="h-4 w-4" />
                  </span>
                  {label}
                </a>
              </li>
            ))}
            {CONTACT_STATIC.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-icon bg-paper-subtle text-ink-muted">
                  <Icon className="h-4 w-4" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="section-shell flex flex-col gap-3 py-8 text-body-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {SITE.since} {SITE.name}. {FOOTER_NOTE}</p>
          <p className="mono-xs uppercase tracking-[0.16em] text-ink-subtle">
            Web yang jelas, profesional, siap dipakai
          </p>
        </div>
      </div>
    </footer>
  );
}