import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm, SignupFooter } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Create account — finance bro",
};

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your account"
      description="Start tracking your net worth, spending, and more."
      footer={<SignupFooter />}
    >
      <SignupForm />
    </AuthShell>
  );
}
