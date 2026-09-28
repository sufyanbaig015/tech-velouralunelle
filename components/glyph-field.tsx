import { cn } from "@/lib/utils";

type GlyphFieldProps = {
  className?: string;
  /** Shifts the pattern so neighbouring fields don't look identical. */
  seed?: number;
};

/**
 * Faint "code rain" texture behind hero and feature sections. Purely decorative.
 * The characters live in one cached SVG (public/images/glyphs.svg) instead of the page HTML.
 */
export function GlyphField({ className, seed = 0 }: GlyphFieldProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute h-[400px] w-[442px] bg-glyphs [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]",
        className,
      )}
      style={{ backgroundPosition: `${(seed * 37) % 442}px ${(seed * 53) % 400}px` }}
    />
  );
}
