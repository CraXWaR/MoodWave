import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";
import { ErrorService } from "../utils/service-error.js";

export class UserService {
  private generateToken(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });
  }

  async signup(email: string, password: string) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ErrorService("Email already in use", 409);
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed },
    });

    return { user, token: this.generateToken(user.id) };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new ErrorService("Invalid email or password", 401);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new ErrorService("Invalid email or password", 401);
    }

    return { user, token: this.generateToken(user.id) };
  }
}