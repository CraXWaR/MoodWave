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
      const { user, token } = await this.userService.signup(email, password);
      res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
      res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
      if (err instanceof ErrorService) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      console.log(parsed)
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
      res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
      res.json({ id: user.id, email: user.email });
    } catch (err) {
      if (err instanceof ErrorService) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      res.status(500).json({ error: "Something went wrong" });
    }
  };
}