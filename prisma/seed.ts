import "dotenv/config";

import { auth } from "../lib/auth";
import { prisma } from "../lib/db";

const DEMO_EMAIL = "demo@financebro.app";
const DEMO_PASSWORD = "demo-password-123";
const DEMO_NAME = "Demo User";

async function main() {
  const existing = await prisma.user.findUnique({
    where: { email: DEMO_EMAIL },
  });

  if (existing) {
    console.log(`Demo user already exists: ${DEMO_EMAIL}`);
    return;
  }

  await auth.api.signUpEmail({
    body: {
      name: DEMO_NAME,
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
    },
  });

  console.log(
    `Created demo user: ${DEMO_EMAIL} (password: ${DEMO_PASSWORD})`,
  );
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
