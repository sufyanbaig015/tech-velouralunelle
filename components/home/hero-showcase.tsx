import { Bot, Cloud, CodeXml, FileCheck2, Globe, Rocket, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

// Decorative product collage for the home hero, built from shapes and SVG (no images).

function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("glass relative overflow-hidden rounded-2xl p-5", className)}>{children}</div>;
}

function IconTile({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span
      className={cn(
        "flex size-16 items-center justify-center rounded-2xl bg-gradient-to-b from-primary-light to-primary text-primary-foreground shadow-button",
        className,
      )}
    >
      <Icon className="size-7" strokeWidth={1.75} />
    </span>
  );
}

function PipelineCard() {
  const steps = ["Discover", "Design", "Build", "Launch"];
  return (
    <Panel className="p-6">
      <p className="font-heading text-lg text-heading">Project Pipeline</p>
      <div className="mt-5 flex items-center gap-4">
        <ol className="relative space-y-3 before:absolute before:bottom-3 before:left-1/2 before:top-3 before:w-px before:bg-accent/30">
          {steps.map((step) => (
            <li
              key={step}
              className="relative rounded-lg border bg-background/80 px-5 py-1.5 text-center text-xs text-heading/90 shadow-soft"
            >
              {step}
            </li>
          ))}
        </ol>
        <div className="flex flex-1 items-center">
          <span className="h-px flex-1 bg-gradient-to-r from-accent/10 to-accent/70" />
          <span className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-button">
            Live &amp; supported
          </span>
        </div>
      </div>
    </Panel>
  );
}

// 48 dial ticks drawn as two dashed circles (alternating colours) instead of 48 separate lines.
const dialRadius = 49;
const tickGap = (2 * Math.PI * dialRadius) / 48;

function ScoreDial() {
  return (
    <Panel className="flex items-center justify-center p-4">
      <svg viewBox="0 0 120 120" className="size-32">
        {["stroke-accent/80", "stroke-teal/80"].map((color, index) => (
          <circle
            key={color}
            cx="60"
            cy="60"
            r={dialRadius}
            fill="none"
            strokeWidth="10"
            strokeDasharray={`2 ${tickGap * 2 - 2}`}
            strokeDashoffset={1 - index * tickGap}
            transform="rotate(-90 60 60)"
            className={color}
          />
        ))}
        <text x="60" y="66" textAnchor="middle" className="fill-heading font-heading text-[28px]">
          98
        </text>
        <text x="60" y="82" textAnchor="middle" className="fill-body text-[8px]">
          speed score
        </text>
      </svg>
    </Panel>
  );
}

function QualityCard() {
  const checks = [
    { label: "Tests passed", value: 100 },
    { label: "Accessibility", value: 96 },
    { label: "SEO", value: 100 },
  ];
  return (
    <Panel className="p-6">
      <p className="font-heading text-lg text-heading">Launch Checklist</p>
      <ul className="mt-5 space-y-2.5">
        {checks.map((check) => (
          <li key={check.label} className="rounded-lg border bg-background/70 px-3 py-2 text-xs">
            <div className="flex justify-between text-heading/90">
              <span>{check.label}</span>
              <span>{check.value}%</span>
            </div>
            <span className="mt-1.5 block h-1 rounded-full bg-border">
              <span
                className="block h-full rounded-full bg-gradient-to-r from-accent to-teal"
                style={{ width: `${check.value}%` }}
              />
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function AiPlanetCard() {
  return (
    <div className="relative h-72 overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-b from-surface via-surface to-primary/80 p-6 text-center shadow-glow">
      <p className="font-heading text-xl text-heading">AI Agents That Never Sleep</p>
      <p className="mt-1 text-xs text-body">Answering leads and automating busywork, 24/7</p>
      <svg viewBox="0 0 400 200" className="absolute inset-x-0 -bottom-2 mx-auto w-full">
        <defs>
          <path id="hero-arc" d="M 60 200 A 140 140 0 0 1 340 200" />
        </defs>
        <text className="fill-accent/60 font-mono text-[13px] tracking-[0.3em]">
          <textPath href="#hero-arc" startOffset="4%">
            1001010110 010 001 1001 0110 100101 01
          </textPath>
        </text>
      </svg>
      <span className="absolute -bottom-32 left-1/2 size-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_22%,theme(colors.heading)_0%,theme(colors.accent.DEFAULT)_12%,theme(colors.primary.DEFAULT)_38%,theme(colors.background)_75%)] shadow-[0_-10px_60px_-5px_theme(colors.primary.light)]" />
      <span className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-accent/30 bg-background/70 px-3 py-1.5 text-xs text-heading backdrop-blur">
        <Bot className="size-3.5 text-accent" />
        Lead qualified · sent to CRM
      </span>
    </div>
  );
}

function GrowthCard() {
  return (
    <Panel className="h-40 p-4">
      <span className="absolute right-4 top-4 rounded-full border border-teal/40 bg-teal/10 px-2.5 py-0.5 text-xs font-medium text-teal">
        +32%
      </span>
      <p className="text-xs text-body">Monthly enquiries</p>
      <svg viewBox="0 0 200 90" className="absolute inset-x-0 bottom-0 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="hero-growth" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.35" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 84 C 30 76, 45 78, 70 66 S 110 68, 130 52 S 170 44, 200 30 L 200 90 L 0 90 Z"
          fill="url(#hero-growth)"
          className="text-accent"
        />
        <path
          d="M0 84 C 30 76, 45 78, 70 66 S 110 68, 130 52 S 170 44, 200 30"
          fill="none"
          strokeWidth="2"
          className="stroke-accent"
        />
      </svg>
    </Panel>
  );
}

function SecurityCard() {
  return (
    <Panel className="p-6 text-center">
      <p className="font-heading text-lg text-heading">Secure by Default</p>
      <div className="relative mx-auto mt-5 flex size-24 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-primary/25 blur-xl" />
        <span className="absolute inset-0 rounded-full border border-accent/20" />
        <ShieldCheck className="relative size-14 text-accent" strokeWidth={1.5} />
      </div>
    </Panel>
  );
}

function ActivityCard() {
  const events = [
    { icon: Bot, title: "AI agent", detail: "qualified a new lead" },
    { icon: FileCheck2, title: "Automation", detail: "processed 12 invoices" },
    { icon: Rocket, title: "Deploy", detail: "shipped v2.4 to production" },
  ];
  return (
    <Panel className="space-y-2.5 p-4">
      {events.map(({ icon: Icon, title, detail }) => (
        <div key={title} className="flex items-center gap-3 rounded-xl border bg-background/70 px-3 py-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/20 text-accent">
            <Icon className="size-4" />
          </span>
          <span className="text-xs leading-tight">
            <span className="block font-medium text-heading">{title}</span>
            {detail}
          </span>
        </div>
      ))}
    </Panel>
  );
}

export function HeroShowcase() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto mt-16 max-w-6xl select-none text-left [mask-image:linear-gradient(to_bottom,black_70%,transparent)] lg:mt-20"
    >
      {/* One set of cards: a compact stack on small screens, a staggered collage on desktop. */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-4 lg:pt-10">
          <PipelineCard />
          <div className="hidden grid-cols-5 gap-4 lg:grid">
            <div className="col-span-3">
              <QualityCard />
            </div>
            <div className="col-span-2 flex flex-col gap-4">
              <ScoreDial />
              <IconTile icon={Cloud} className="motion-safe:animate-float" />
            </div>
          </div>
        </div>

        <div className="order-first space-y-4 sm:col-span-2 lg:order-none lg:col-span-4 lg:pt-24">
          <AiPlanetCard />
          <div className="hidden gap-4 lg:flex">
            <IconTile icon={Sparkles} className="border bg-none bg-surface text-accent" />
            <IconTile icon={Globe} className="border bg-none bg-surface text-accent" />
          </div>
        </div>

        <div className="space-y-4 lg:col-span-4">
          <GrowthCard />
          <div className="hidden grid-cols-5 gap-4 lg:grid">
            <div className="col-span-3">
              <SecurityCard />
            </div>
            <div className="col-span-2 flex items-end">
              <IconTile icon={CodeXml} className="motion-safe:animate-float-delayed" />
            </div>
          </div>
          <div className="hidden lg:block">
            <ActivityCard />
          </div>
        </div>
      </div>
    </div>
  );
}
