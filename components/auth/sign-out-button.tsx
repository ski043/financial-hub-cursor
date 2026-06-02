"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onSignOut() {
    setPending(true);
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <Button variant="outline" size="sm" onClick={onSignOut} disabled={pending}>
      {pending ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : (
        <LogOut className="size-3.5" />
      )}
      Sign out
    </Button>
  );
}
