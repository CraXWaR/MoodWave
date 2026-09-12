import bcrypt from "bcrypt";
import prisma from "../db/prisma.js";
import { ErrorService } from "../utils/service-error.js";
import { generateAuthToken } from "../utils/token.js";

export class UserService {
  async signup(email: string, password: string) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ErrorService("Email already in use", 409);
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed },
    });

    return { user, token: generateAuthToken(user.id) };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new ErrorService("Invalid email or password", 401);
    }

    if (!user.password) {
      throw new ErrorService("This account uses Spotify login. Please log in with Spotify.", 400);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new ErrorService("Invalid email or password", 401);
    }

    return { user, token: generateAuthToken(user.id) };
  }

  async getById(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new ErrorService("User not found", 404);
    return user;
  }
}
