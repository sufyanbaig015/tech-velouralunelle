"use client";

import { LogOut } from "lucide-react";
import { useTransition } from "react";

import { signOutAsAdmin } from "@/app/admin/login/actions";
import { Button } from "@/components/ui/button";

export function AdminSignOutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={pending}
      onClick={() => startTransition(() => signOutAsAdmin())}
    >
      <LogOut aria-hidden="true" />
      {pending ? "Signing out…" : "Sign out"}
    </Button>
  );
}
