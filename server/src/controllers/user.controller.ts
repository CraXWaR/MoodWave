import { Request, Response } from "express";
import { UserService } from "../services/user.service.js";
import { ErrorService } from "../utils/service-error.js";
import { signupSchema, loginSchema } from "../validators/user.validator.js";

export class UserController {
  private userService = new UserService();

  signup = async (req: Request, res: Response) => {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
    }

    try {
      const { email, password } = parsed.data;
      await this.userService.signup(email, password);
      res.status(201).json({ message: "Registration successful. Please log in." });
    } catch (err) {
      if (err instanceof ErrorService) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      res.status(500).json({ error: "Something went wrong" });
    }
  };

  login = async (req: Request, res: Response) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
    }

    try {
      const { email, password } = parsed.data;
      const { user, token } = await this.userService.login(email, password);
      res.json({
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        hashedPassword: user.password !== null,
        token,
      });
    } catch (err) {
      if (err instanceof ErrorService) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      res.status(500).json({ error: "Something went wrong" });
    }
  };

  getMe = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.getById(req.user!.id);
      res.json(user);
    } catch (err) {
      if (err instanceof ErrorService) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      res.status(500).json({ error: "Something went wrong" });
    }
  };
}
