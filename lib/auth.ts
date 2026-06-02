import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

import { prisma } from "./db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  // Better Auth stores credentials in an `account` table. The domain language
  // (CONTEXT.md) reserves "Account" for a cash-holding place, never the login,
  // so the auth table is mapped to `AuthAccount`.
  account: {
    modelName: "authAccount",
  },
  user: {
    additionalFields: {
      baseCurrency: {
        type: "string",
        required: false,
        defaultValue: "USD",
        input: false,
      },
      expectedMonthlyIncomeCents: {
        type: "number",
        required: false,
        input: false,
      },
      savingsTargetCents: {
        type: "number",
        required: false,
        input: false,
      },
    },
  },
  plugins: [nextCookies()],
});
