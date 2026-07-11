import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ErrorService } from "../utils/service-error.js";

interface JwtPayload {
  id: string;
}

export default function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ErrorService("Unauthorized", 401);
    }

    const token = authHeader.slice(7);
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new ErrorService("Server configuration error", 500);
    }

    const payload = jwt.verify(token, secret) as JwtPayload;
    req.user = { id: payload.id };
    next();
  } catch (error) {
    next(error instanceof ErrorService ? error : new ErrorService("Invalid token", 401));
  }
}