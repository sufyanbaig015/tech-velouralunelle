"use client";

import { ArrowLeft, CalendarCheck, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useTransition, type FormEvent } from "react";
import { z } from "zod";

import { bookCall } from "@/app/book/actions";
import { FormAlert } from "@/components/form-alert";
import { FormField } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/site";
import {
  bookingDetailsSchema,
  type BookingDetailsValues,
  type BookingField,
  type BookingFieldErrors,
  type PublicBooking,
} from "@/lib/validations/booking";

const fieldOrder: BookingField[] = ["name", "email", "company", "phone", "notes"];

export type BookingDraft = Partial<Record<BookingField, string>>;

type BookingDetailsFormProps = {
  start: string;
  timeZone: string;
  /** Values typed earlier, kept when the visitor goes back to change the time. */
  draft: BookingDraft;
  onBack: (draft: BookingDraft) => void;
  onBooked: (booking: PublicBooking) => void;
  /** The slot was taken while the form was open. */
  onSlotTaken: (message: string, draft: BookingDraft) => void;
};

export function BookingDetailsForm({ start, timeZone, draft, onBack, onBooked, onSlotTaken }: BookingDetailsFormProps) {
  const [errors, setErrors] = useState<BookingFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const currentValues = () =>
    Object.fromEntries(new FormData(formRef.current ?? undefined)) as BookingDraft & { website?: string };

  function showErrors(fieldErrors: BookingFieldErrors) {
    setErrors(fieldErrors);
    const firstInvalid = fieldOrder.find((field) => fieldErrors[field]?.length);
    if (firstInvalid) (formRef.current?.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
  }

  function clearError(event: FormEvent<HTMLFormElement>) {
    const name = (event.target as HTMLInputElement).name as BookingField;
    if (!errors[name]) return;
    setErrors((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const values = currentValues();
    const parsed = bookingDetailsSchema.safeParse(values);
    if (!parsed.success) {
      showErrors(z.flattenError(parsed.error).fieldErrors);
      return;
    }

    setErrors({});
    const details: BookingDetailsValues = parsed.data;
    startTransition(async () => {
      try {
        const result = await bookCall({ ...details, start, timeZone });
        if (result.ok) return onBooked(result.booking);
        if (result.code === "slot_taken") return onSlotTaken(result.message, values);
        setFormError(result.message);
        if (result.fieldErrors) showErrors(result.fieldErrors);
      } catch {
        setFormError(`Sorry, we couldn't book your call. Please try again, or email us at ${siteConfig.email}.`);
      }
    });
  }

  const error = (field: BookingField) => errors[field]?.[0];

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} onChange={clearError} className="relative space-y-5">
      {formError && <FormAlert>{formError}</FormAlert>}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField idPrefix="booking" name="name" label="Full name" required error={error("name")}>
          {(props) => (
            <Input {...props} type="text" autoComplete="name" placeholder="Jane Smith" defaultValue={draft.name} />
          )}
        </FormField>
        <FormField idPrefix="booking" name="email" label="Email" required error={error("email")}>
          {(props) => (
            <Input
              {...props}
              type="email"
              autoComplete="email"
              placeholder="jane@company.com"
              defaultValue={draft.email}
            />
          )}
        </FormField>
        <FormField idPrefix="booking" name="company" label="Company" error={error("company")}>
          {(props) => (
            <Input
              {...props}
              type="text"
              autoComplete="organization"
              placeholder="Your business name"
              defaultValue={draft.company}
            />
          )}
        </FormField>
        <FormField idPrefix="booking" name="phone" label="Phone" error={error("phone")}>
          {(props) => (
            <Input {...props} type="tel" autoComplete="tel" placeholder="+1 555 123 4567" defaultValue={draft.phone} />
          )}
        </FormField>
        <FormField
          idPrefix="booking"
          name="notes"
          label="Anything we should know before the call?"
          error={error("notes")}
          className="sm:col-span-2"
        >
          {(props) => (
            <Textarea
              {...props}
              rows={4}
              placeholder="Your project, goals, questions, or links that will help us prepare."
              defaultValue={draft.notes}
            />
          )}
        </FormField>
      </div>

      {/* Honeypot: hidden from people and screen readers. Bots that fill it are ignored. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
        <label htmlFor="booking-website">Website</label>
        <input id="booking-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-sm">
        By booking, you agree to our{" "}
        <Link href="/privacy" className="font-medium text-accent underline-offset-4 hover:underline">
          Privacy Policy
        </Link>
        .
      </p>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button type="button" variant="ghost" onClick={() => onBack(currentValues())} disabled={pending}>
          <ArrowLeft aria-hidden="true" />
          Change time
        </Button>
        <Button type="submit" variant="gradient" size="lg" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              Booking...
            </>
          ) : (
            <>
              <CalendarCheck aria-hidden="true" />
              Schedule call
            </>
          )}
        </Button>
      </div>
      <p aria-live="polite" className="sr-only">
        {pending ? "Booking your call..." : ""}
      </p>
    </form>
  );
}
