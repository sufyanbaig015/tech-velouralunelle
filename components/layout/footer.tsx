import { Mail } from "lucide-react";
import Link from "next/link";

import { GitHubIcon, LinkedInIcon, WhatsAppIcon, XIcon } from "@/components/icons/brand-icons";
import { BookCallButton } from "@/components/layout/book-call-button";
import { Logo } from "@/components/layout/logo";
import { companyLinks, legalLinks, type NavLink } from "@/content/navigation";
import { services } from "@/content/services";
import { formatPhone, siteConfig, whatsappUrl } from "@/lib/site";

const socialLinks = [
  { label: "LinkedIn", href: siteConfig.socials.linkedin, Icon: LinkedInIcon },
  { label: "X (Twitter)", href: siteConfig.socials.x, Icon: XIcon },
  { label: "GitHub", href: siteConfig.socials.github, Icon: GitHubIcon },
];

const serviceLinks: NavLink[] = services.map((service) => ({
  label: service.title,
  href: `/services/${service.slug}`,
}));

function FooterColumn({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-sm font-semibold text-heading">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm transition-colors hover:text-accent">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-surface">
      <div className="container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            We build websites, web apps, mobile apps, and AI automation for startups and growing businesses.
            Clear process, honest pricing, and software that works.
          </p>
          <ul className="mt-6 flex gap-2" aria-label="Social media">
            {socialLinks.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  className="flex size-10 items-center justify-center rounded-full border text-body transition-colors hover:border-primary/30 hover:bg-tint hover:text-accent"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <FooterColumn title="Services" links={serviceLinks} />
        </div>

        <div className="lg:col-span-2">
          <FooterColumn title="Company" links={companyLinks} />
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-heading">Get in touch</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-accent"
              >
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-accent"
              >
                <WhatsAppIcon className="size-4 shrink-0" />
                <span>
                  WhatsApp {formatPhone(siteConfig.whatsappNumber)}
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            </li>
          </ul>
          <BookCallButton size="sm" label="Book a Free Call" className="mt-6" />
        </div>
      </div>

      <div className="border-t">
        <div className="container flex flex-col gap-4 pb-24 pt-6 text-sm sm:flex-row sm:pb-6 sm:items-center sm:justify-between sm:pr-24">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
