import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "../types/auth";

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

const isAdmin: RequestHandler = (req, res, next) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ message: "Accès refusé" }); // : Administrateur requis
    return;
  }
  next();
};

const isManager: RequestHandler = (req, res, next) => {
  if (req.user?.role !== "admin" && req.user?.role !== "manager") {
    res.status(403).json({ message: "Accès refusé" }); // : Manager requis
    return;
  }
  next();
};

export { verifyToken, isAdmin, isManager };
