"use client";

import { CircleAlert, CircleCheck, Loader2, Send } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition, type FormEvent, type ReactNode } from "react";
import { z } from "zod";

import { sendContactMessage } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { contactSchema, type ContactField, type ContactFieldErrors } from "@/lib/validations/contact";

const fieldOrder: ContactField[] = ["name", "email", "phone", "company", "service", "budget", "message"];

type ControlProps = {
  id: string;
  name: ContactField;
  required?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

type FieldProps = {
  name: ContactField;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: (props: ControlProps) => ReactNode;
};

function Field({ name, label, required = false, error, className, children }: FieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>
        {label}
        {required ? (
          <span className="text-danger" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-body"> (optional)</span>
        )}
      </Label>
      {children({
        id,
        name,
        required,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
      })}
      {error && (
        <p id={errorId} className="flex items-center gap-1.5 text-sm font-medium text-danger">
          <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

type ContactFormProps = {
  serviceOptions: string[];
  budgetOptions: string[];
  success: { title: string; description: string };
  fallbackEmail: string;
};

export function ContactForm({ serviceOptions, budgetOptions, success, fallbackEmail }: ContactFormProps) {
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  function showErrors(fieldErrors: ContactFieldErrors) {
    setErrors(fieldErrors);
    const firstInvalid = fieldOrder.find((field) => fieldErrors[field]?.length);
    if (firstInvalid) (formRef.current?.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
  }

  function clearError(event: FormEvent<HTMLFormElement>) {
    const name = (event.target as HTMLInputElement).name as ContactField;
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

    const parsed = contactSchema.safeParse(Object.fromEntries(new FormData(event.currentTarget)));
    if (!parsed.success) {
      showErrors(z.flattenError(parsed.error).fieldErrors);
      return;
    }

    setErrors({});
    startTransition(async () => {
      try {
        const result = await sendContactMessage(parsed.data);
        if (result.ok) {
          setSubmitted(true);
          return;
        }
        setFormError(result.message);
        if (result.fieldErrors) showErrors(result.fieldErrors);
      } catch {
        setFormError(`Sorry, we couldn't send your message. Please try again, or email us at ${fallbackEmail}.`);
      }
    });
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-10 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-tint text-accent">
          <CircleCheck className="size-8" aria-hidden="true" />
        </span>
        <h3 ref={successRef} tabIndex={-1} className="mt-6 text-2xl font-semibold focus-visible:outline-none">
          {success.title}
        </h3>
        <p className="mt-3 max-w-md leading-relaxed">{success.description}</p>
        <Button variant="outline" className="mt-8" onClick={() => setSubmitted(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  const error = (field: ContactField) => errors[field]?.[0];

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} onChange={clearError} className="relative space-y-6">
      {formError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-danger/30 bg-danger-soft p-4 text-sm font-medium text-danger"
        >
          <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          {formError}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Full name" required error={error("name")}>
          {(props) => <Input {...props} type="text" autoComplete="name" placeholder="Jane Smith" />}
        </Field>
        <Field name="email" label="Email" required error={error("email")}>
          {(props) => <Input {...props} type="email" autoComplete="email" placeholder="jane@company.com" />}
        </Field>
        <Field name="phone" label="Phone" error={error("phone")}>
          {(props) => <Input {...props} type="tel" autoComplete="tel" placeholder="+1 555 123 4567" />}
        </Field>
        <Field name="company" label="Company" required error={error("company")}>
          {(props) => <Input {...props} type="text" autoComplete="organization" placeholder="Your business name" />}
        </Field>
        <Field name="service" label="Service needed" required error={error("service")}>
          {(props) => (
            <NativeSelect {...props} defaultValue="">
              <option value="">
                Choose a service
              </option>
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </NativeSelect>
          )}
        </Field>
        <Field name="budget" label="Budget range" required error={error("budget")}>
          {(props) => (
            <NativeSelect {...props} defaultValue="">
              <option value="">
                Choose a budget
              </option>
              {budgetOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </NativeSelect>
          )}
        </Field>
        <Field name="message" label="Project details" required error={error("message")} className="sm:col-span-2">
          {(props) => (
            <Textarea
              {...props}
              rows={6}
              placeholder="What do you want to build or improve? Any deadlines, links, or examples you like?"
            />
          )}
        </Field>
      </div>

      {/* Honeypot: hidden from people and screen readers. Bots that fill it are ignored. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          By sending this form, you agree to our{" "}
          <Link href="/privacy" className="font-medium text-accent underline-offset-4 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <Button type="submit" variant="gradient" size="lg" disabled={pending} className="shrink-0">
          {pending ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            <>
              Send message
              <Send aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
      <p aria-live="polite" className="sr-only">
        {pending ? "Sending your message..." : ""}
      </p>
    </form>
  );
}
