import prisma from "./db/prisma.js";
import { seedMoods } from "./seed/moods.seed.js";

import app from "./app";

const PORT = process.env.PORT ?? 3000;

async function start() {
  await seedMoods(prisma);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
