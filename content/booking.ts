import type { Faq } from "@/content/faqs";

// Booking settings for the "Book a Call" scheduler at /book.
// Working hours are in `timeZone`; visitors see every slot in their own local time.

type TimeRange = [start: string, end: string]; // "HH:MM" 24-hour

export const bookingConfig = {
  meetingTitle: "Free 30-minute consultation",
  durationMinutes: 30,
  timeZone: "America/New_York",
  /** Working hours per weekday (0 = Sunday … 6 = Saturday). Leave a day out to close it. */
  weeklyHours: {
    1: [["09:00", "17:00"]],
    2: [["09:00", "17:00"]],
    3: [["09:00", "17:00"]],
    4: [["09:00", "17:00"]],
    5: [["09:00", "15:00"]],
  } as Partial<Record<number, TimeRange[]>>,
  /** Days off in the host time zone, e.g. public holidays ("YYYY-MM-DD"). */
  blockedDates: ["2026-11-26", "2026-12-25", "2027-01-01"] as string[],
  /** Start a slot every N minutes. */
  slotIntervalMinutes: 30,
  /** Free time kept before and after every meeting. */
  bufferMinutes: 15,
  /** Earliest booking, in hours from now. */
  minNoticeHours: 12,
  /** How far ahead people can book. */
  maxDaysAhead: 30,
  /** Anti-spam: most upcoming calls one email address can hold. */
  maxUpcomingPerEmail: 2,
};

export const bookingPage = {
  title: "Book a free call",
  description:
    "Pick a time that suits you for a free 30-minute call. We'll talk about your goals and give you honest advice on the best way forward.",
  hostName: "Veloura Lunelle Team",
  location: "Google Meet",
  agenda: [
    "Understand your business and goals",
    "Talk through ideas, scope, and options",
    "Clear next steps with a rough timeline and budget",
  ],
};

export const bookingFaqs: Faq[] = [
  {
    question: "Is the call really free?",
    answer:
      "Yes. The first call is free and there's no obligation. It's a chance to talk through your idea and see if we're a good fit.",
  },
  {
    question: "How do I join the call?",
    answer:
      "We use Google Meet. You'll get the link in your confirmation email and calendar invite. You can join from a browser on any computer or phone; no download is needed.",
  },
  {
    question: "Can I reschedule or cancel?",
    answer:
      "Of course. Your confirmation email has links to reschedule or cancel at any time before the call. No need to email us.",
  },
  {
    question: "What should I prepare?",
    answer:
      "Nothing formal. It helps to know what you want to achieve, any deadlines, and examples of websites or apps you like. If you have a rough budget in mind, that helps us suggest the right approach.",
  },
];
