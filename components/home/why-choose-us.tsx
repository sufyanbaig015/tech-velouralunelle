import { Bot, MessageCircle, Timer } from "lucide-react";

import { GlyphField } from "@/components/glyph-field";
import { SectionHeading } from "@/components/section-heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { reasons } from "@/content/home";

const chartBars = [30, 45, 38, 62, 50, 84, 58, 70, 46, 64];

// Decorative mock-up: an AI lead agent's code next to a small results dashboard.
function AgentMockup() {
  return (
    <div aria-hidden="true" className="relative select-none">
      <span className="absolute -inset-10 -z-10 rounded-full bg-primary/20 blur-3xl" />
      <div className="glass overflow-hidden rounded-2xl">
        <div className="flex items-center gap-1.5 border-b px-4 py-3">
          <span className="size-2.5 rounded-full bg-danger/70" />
          <span className="size-2.5 rounded-full bg-accent/50" />
          <span className="size-2.5 rounded-full bg-teal/70" />
          <span className="ml-3 font-mono text-xs text-body">lead-agent.ts</span>
        </div>
        <div className="grid gap-px bg-border sm:grid-cols-5">
          <pre className="overflow-hidden bg-surface p-5 font-mono text-[11px] leading-6 text-body sm:col-span-3">
            <span className="text-accent">agent</span>.on(<span className="text-teal">&quot;new_lead&quot;</span>, async (lead) =&gt; {"{"}
            {"\n"}  <span className="text-accent">const</span> score = await claude.qualify(lead);
            {"\n"}  <span className="text-accent">if</span> (score &gt; <span className="text-teal">0.8</span>) crm.assign(lead);
            {"\n"}  await whatsapp.reply(lead, {"{"}
            {"\n"}    template: <span className="text-teal">&quot;book_call&quot;</span>,
            {"\n"}  {"}"});
            {"\n"}{"}"});
          </pre>
          <div className="space-y-3 bg-surface p-5 sm:col-span-2">
            <div className="flex h-20 items-end gap-1 rounded-lg border bg-background/60 p-2">
              {chartBars.map((height, index) => (
                <span
                  key={index}
                  className={index === 5 ? "flex-1 rounded-sm bg-accent" : "flex-1 rounded-sm bg-primary/35"}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            {[
              { icon: Timer, label: "Reply time", value: "12s" },
              { icon: Bot, label: "Leads qualified", value: "148" },
              { icon: MessageCircle, label: "Calls booked", value: "37" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center justify-between rounded-lg border bg-background/60 px-3 py-2 text-xs">
                <span className="flex items-center gap-2">
                  <Icon className="size-3.5 text-accent" />
                  {label}
                </span>
                <span className="font-medium text-heading">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="relative isolate overflow-hidden py-20 sm:py-28">
      <GlyphField className="-right-10 top-10 -z-10 hidden lg:block" seed={29} />
      <div className="container">
        <SectionHeading
          id="why-title"
          eyebrow="Why choose us"
          title="A partner that makes software feel simple"
          description="We keep things clear, honest, and focused on results that matter to your business."
        />
        <div className="mt-14 grid items-center gap-12 lg:grid-cols-12">
          <Accordion type="single" defaultValue={reasons[0].title} className="space-y-3 lg:col-span-5">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <AccordionItem
                  key={reason.title}
                  value={reason.title}
                  className="data-[state=open]:bg-[linear-gradient(135deg,theme(colors.surface)_35%,theme(colors.primary.DEFAULT)_140%)] data-[state=open]:shadow-glow"
                >
                  <AccordionTrigger indicator="plus">
                    <span className="flex items-center gap-3">
                      <Icon className="size-5 shrink-0 text-accent" aria-hidden="true" />
                      {reason.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8 text-heading/80">{reason.description}</AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
          <div className="lg:col-span-7">
            <AgentMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
