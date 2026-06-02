"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import * as z from "zod";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  email: z.email({ error: "Please enter a valid email." }),
  password: z.string().min(1, { error: "Please enter your password." }),
});

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setFieldErrors({});

    const formData = new FormData(event.currentTarget);
    const parsed = schema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!parsed.success) {
      const flat = z.flattenError(parsed.error);
      setFieldErrors({
        email: flat.fieldErrors.email?.[0],
        password: flat.fieldErrors.password?.[0],
      });
      return;
    }

    setPending(true);
    const { error } = await authClient.signIn.email({
      email: parsed.data.email,
      password: parsed.data.password,
    });
    setPending(false);

    if (error) {
      setFormError(error.message ?? "Invalid email or password.");
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={Boolean(fieldErrors.email)}
              disabled={pending}
            />
            {fieldErrors.email && (
              <p className="text-xs text-destructive">{fieldErrors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              aria-invalid={Boolean(fieldErrors.password)}
              disabled={pending}
            />
            {fieldErrors.password && (
              <p className="text-xs text-destructive">{fieldErrors.password}</p>
            )}
          </div>

          {formError && (
            <div
              role="alert"
              className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive"
            >
              {formError}
            </div>
          )}

          <Button type="submit" disabled={pending} className="mt-1 h-10 w-full">
            {pending && <Loader2 className="size-4 animate-spin" />}
            {pending ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function LoginFooter() {
  return (
    <>
      Don&apos;t have an account?{" "}
      <Link
        href="/signup"
        className="font-medium text-foreground underline-offset-4 hover:underline"
      >
        Create one
      </Link>
    </>
  );
}
