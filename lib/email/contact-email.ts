import type { ContactFormValues } from "@/lib/validations/contact";

const htmlEscapes: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
}

// Builds the lead notification email. All user input is escaped before it goes into HTML.
export function buildContactEmail(data: ContactFormValues) {
  const details: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "Not provided"],
    ["Company", data.company],
    ["Service", data.service],
    ["Budget", data.budget],
  ];

  const subject = `New lead: ${data.name} (${data.company}) - ${data.service}`.replace(/\s+/g, " ");

  const text = [...details.map(([label, value]) => `${label}: ${value}`), "", "Message:", data.message].join("\n");

  const rows = details
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#475569;vertical-align:top">${label}</td><td style="padding:6px 0;color:#0F172A;font-weight:600">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;max-width:600px">
  <h2 style="margin:0 0 16px;color:#4338CA">New contact form lead</h2>
  <table style="border-collapse:collapse">${rows}</table>
  <h3 style="margin:24px 0 8px;color:#0F172A">Message</h3>
  <p style="margin:0;white-space:pre-wrap;color:#0F172A">${escapeHtml(data.message)}</p>
  <p style="margin:24px 0 0;color:#475569;font-size:13px">Reply to this email to respond directly to ${escapeHtml(data.name)}.</p>
</div>`;

  return { subject, text, html };
}
