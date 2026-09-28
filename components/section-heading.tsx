import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({ id, eyebrow, title, description, align = "center", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>}
      <h2 id={id} className="text-gradient mt-3 text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-5 text-lg leading-relaxed">{description}</p>}
    </div>
  );
}
