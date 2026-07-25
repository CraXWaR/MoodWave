import type { NextFunction, Request, Response } from "express";
import { ErrorService } from "../utils/service-error.js";

export default function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ErrorService) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  console.error(err); // unexpected errors — worth logging
  res.status(500).json({ error: "Something went wrong. Try again." });
}
