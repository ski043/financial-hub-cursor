import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

/**
 * Returns the current session, or null. Memoized per request render pass.
 */
export const getSession = cache(async () => {
  return auth.api.getSession({ headers: await headers() });
});

/**
 * Authoritative auth check for protected Server Components / Actions.
 * Redirects to /login when there is no valid session.
 */
export const requireSession = cache(async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return session;
});
