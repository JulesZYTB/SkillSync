import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import type { UserPayload } from "../types/auth";

const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.cookies?.auth_token;

  if (!token) {
    res.status(401).json({ message: "Non autorisé" }); // : Token manquant
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.APP_SECRET as string) as UserPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Non autorisé" }); // : Token invalide
  }
};

export { verifyToken };
