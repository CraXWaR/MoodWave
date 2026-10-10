import prisma from "../db/prisma.js";
import { seedMoods } from "./moods.seed.js";
import { seedDemoData } from "./demo.seed.js";

async function main() {
  await seedMoods(prisma);
  console.log("Seeded 6 moods");

  const { email, password, entryCount } = await seedDemoData(prisma);
  console.log(`Seeded demo user ${email} / ${password} with ${entryCount} entries`);
}

main()
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    // the pg Pool passed to the adapter stays open after $disconnect, so exit explicitly
    process.exit();
  });
