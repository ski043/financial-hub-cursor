import { createAuthClient } from "better-auth/react";

// baseURL defaults to the current origin in the browser, which is what we want
// for this single-origin app.
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession } = authClient;
