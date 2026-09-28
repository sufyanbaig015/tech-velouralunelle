import { Reveal } from "@/components/reveal";
import type { ProcessStep } from "@/content/process";
import { cn } from "@/lib/utils";

// Subtle 3D fan on wide screens: outer cards turn toward the centre card.
const tilts = [
  "xl:[transform:perspective(1200px)_rotateY(14deg)]",
  "xl:[transform:perspective(1200px)_rotateY(7deg)]",
  "",
  "xl:[transform:perspective(1200px)_rotateY(-7deg)]",
  "xl:[transform:perspective(1200px)_rotateY(-14deg)]",
];

// Decorative "constellation" of glowing dots and lines at the top of each card.
const constellations = [
  { path: "M10 30 L45 18 L70 34 M150 12 L180 30", dots: [10, 30, 45, 18, 70, 34, 180, 30] },
  { path: "M20 16 L55 34 L85 20 M140 30 L175 14", dots: [20, 16, 55, 34, 85, 20, 175, 14] },
  { path: "M15 22 L40 12 M130 14 L160 34 L190 20", dots: [15, 22, 40, 12, 160, 34, 190, 20] },
];

function Constellation({ variant }: { variant: number }) {
  const { path, dots } = constellations[variant % constellations.length];
  return (
    <svg viewBox="0 0 200 44" aria-hidden="true" className="absolute inset-x-0 top-3 w-full opacity-80">
      <path d={path} fill="none" strokeWidth="1" className="stroke-accent/40" />
      {Array.from({ length: dots.length / 2 }, (_, index) => (
        <circle
          key={index}
          cx={dots[index * 2]}
          cy={dots[index * 2 + 1]}
          r="2.5"
          className="fill-accent drop-shadow-[0_0_6px_theme(colors.accent.DEFAULT)]"
        />
      ))}
    </svg>
  );
}

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  const highlight = Math.floor(steps.length / 2);

  return (
    <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-5 lg:gap-4">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const active = index === highlight;
        return (
          <li key={step.title} className={cn(active && "lg:-mt-6")}>
            <Reveal delay={index * 0.08} className="h-full">
              <div
                className={cn(
                  "glass relative flex h-full flex-col items-center overflow-hidden rounded-3xl px-5 pb-8 pt-14 text-center",
                  tilts[index],
                  active && "border-accent/40 bg-card-glow shadow-glow lg:pb-12",
                )}
              >
                <Constellation variant={index} />
                <span className="relative rounded-xl bg-gradient-to-b from-primary-light to-primary px-3.5 py-2 font-heading text-lg font-semibold text-primary-foreground shadow-button">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 flex items-center gap-2 text-xl font-medium">
                  <Icon className="size-5 text-accent" aria-hidden="true" />
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed">{step.description}</p>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
