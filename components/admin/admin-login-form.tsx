"use client";

import { Loader2, LockKeyhole } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useState, useTransition, type FormEvent } from "react";

import { signInAsAdmin } from "@/app/admin/login/actions";
import { FormAlert } from "@/components/form-alert";
import { FormField } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminLoginForm({ nextPath }: { nextPath?: string }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = new FormData(event.currentTarget);

    startTransition(async () => {
      try {
        const result = await signInAsAdmin({
          username: String(form.get("username") ?? ""),
          password: String(form.get("password") ?? ""),
          next: nextPath,
        });
        if (result && !result.ok) setError(result.message);
      } catch (err) {
        if (isRedirectError(err)) throw err;
        setError("Something went wrong. Please try again.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {error && <FormAlert>{error}</FormAlert>}

      <FormField idPrefix="admin" name="username" label="Username" required>
        {(props) => (
          <Input
            {...props}
            type="text"
            autoComplete="username"
            autoFocus
            placeholder="admin"
            disabled={pending}
          />
        )}
      </FormField>

      <FormField idPrefix="admin" name="password" label="Password" required>
        {(props) => (
          <Input
            {...props}
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            disabled={pending}
          />
        )}
      </FormField>

      <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={pending}>
        {pending ? <Loader2 className="animate-spin" aria-hidden="true" /> : <LockKeyhole aria-hidden="true" />}
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
