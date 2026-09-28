import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { whatsappUrl } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <aside aria-label="Quick contact">
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp (opens in a new tab)"
        className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-30 flex size-14 items-center justify-center rounded-full bg-whatsapp text-primary-foreground shadow-soft-lg ring-4 ring-surface transition-all duration-200 hover:-translate-y-0.5 hover:bg-whatsapp-hover focus-visible:rounded-full"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    </aside>
  );
}
