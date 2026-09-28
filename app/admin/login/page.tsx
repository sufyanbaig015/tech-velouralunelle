import type { Metadata } from "next";
import Link from "next/link";

import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { Logo } from "@/components/layout/logo";
import { isAdminPasswordConfigured } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const { next } = await searchParams;
  const nextPath = typeof next === "string" && next.startsWith("/admin") ? next : undefined;
  const configured = isAdminPasswordConfigured();

  return (
    <div className="relative flex min-h-[calc(100vh-8rem)] items-center justify-center overflow-hidden px-4 py-16 sm:py-24">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 size-[28rem] rounded-full bg-primary/25 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 size-[24rem] rounded-full bg-accent/20 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.primary.DEFAULT)_0%,transparent_55%)] opacity-[0.12]"
      />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="glass relative overflow-hidden rounded-3xl border-accent/25 p-7 shadow-glow sm:p-9">
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-brand-gradient" />

          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Private access</p>
            <h1 className="mt-3 font-heading text-3xl font-semibold text-heading sm:text-[2rem]">Admin sign in</h1>
            <p className="mt-2 text-sm leading-relaxed text-body">
              Manage bookings and calendar settings for Veloura Lunelle.
            </p>
          </div>

          <div className="mt-8">
            {configured ? (
              <AdminLoginForm nextPath={nextPath} />
            ) : (
              <div className="rounded-2xl border border-danger/40 bg-danger-soft px-4 py-5 text-sm text-heading">
                Admin access is locked until <code className="font-mono text-accent">ADMIN_PASSWORD</code> is set in
                the environment.
              </div>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-body">
          <Link href="/" className="text-accent underline-offset-4 hover:underline">
            Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}
