import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep these server-only packages out of the bundler. Better Auth lazily pulls
  // in optional DB dialects (e.g. kysely's bun-sqlite) that break static bundling
  // even though we only use the Prisma/pg adapter.
  serverExternalPackages: [
    "better-auth",
    "@better-auth/kysely-adapter",
    "@prisma/adapter-pg",
    "pg",
  ],
};

export default nextConfig;
