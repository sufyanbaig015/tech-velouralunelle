import { TechLogo } from "@/components/tech-logo";
import { techStack, trustStrip } from "@/content/tech";

export function TrustStrip() {
  return (
    <section aria-labelledby="trust-title" className="py-12">
      <div className="container">
        <h2 id="trust-title" className="text-center font-sans text-sm font-medium text-body">
          Built with modern, proven technology
        </h2>
        <ul className="mt-8 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-5 lg:grid-cols-9">
          {trustStrip.map((id) => {
            const tech = techStack[id];
            return (
              <li
                key={id}
                className="flex flex-col items-center gap-2 text-body/80 transition-colors hover:text-heading"
              >
                <TechLogo tech={tech} className="size-7" />
                <span className="text-xs font-medium">{tech.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
