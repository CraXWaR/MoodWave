import prisma from "../db/prisma.js";
``;
export class MoodService {
  async listAllMoods() {
    return await prisma.mood.findMany({
      orderBy: { value: "asc" },
    });
  }
}
