import { Suspense } from "react";
import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm, LoginFooter } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in — Finance Hub",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to see your complete financial picture."
      footer={<LoginFooter />}
    >
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
