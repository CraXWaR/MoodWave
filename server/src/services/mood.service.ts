import prisma from "../db/prisma.js";
``;
export class MoodService {
  async listAllMoods() {
    return await prisma.mood.findMany({
      orderBy: { value: "asc" },
    });
  }

  async getMoodByValue(value: number) {
    return prisma.mood.findFirst({ where: { value } });
  }
}
