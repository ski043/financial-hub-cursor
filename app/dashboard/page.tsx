import type { Metadata } from "next";
import { PieChart } from "lucide-react";

import { requireSession } from "@/lib/auth-guard";
import { SignOutButton } from "@/components/auth/sign-out-button";

export const metadata: Metadata = {
  title: "Dashboard — Finance Hub",
};

export default async function DashboardPage() {
  const { user } = await requireSession();

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <PieChart className="size-4" />
            </span>
            Finance Hub
          </div>
          <SignOutButton />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back, {user.name}.
        </h1>
        <p className="mt-2 text-muted-foreground">
          You&apos;re signed in as {user.email}. Your dashboard is coming soon —
          authentication is now wired up end to end.
        </p>
      </main>
    </div>
  );
}
