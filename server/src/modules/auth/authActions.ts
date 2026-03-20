import type { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authRepository from "./authRepository";

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await authRepository.findByEmail(email);

    if (!user) {
      res.status(401).json({ message: "Identifiants invalides" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Identifiants invalides" });
      return;
    }



    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.APP_SECRET as string,
      { expiresIn: "1h" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 heurs
    });

    res.json({
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
};

const logout: RequestHandler = (req, res) => {
  res.clearCookie("auth_token");
  res.sendStatus(204);
};

const me: RequestHandler = (req, res) => {
  res.json(req.user);
};

export default { login, logout, me };
