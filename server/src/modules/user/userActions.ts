import type { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import userRepository from "./userRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const user = await userRepository.read(userId);

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { full_name, email, password, role } = req.body;
    const password_hash = await bcrypt.hash(password, 10);

    const insertId = await userRepository.create({
      full_name,
      email,
      password_hash,
      role,
    });

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const { full_name, email, role } = req.body;

    await userRepository.update({ id: userId, full_name, email, role });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    await userRepository.delete(userId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const getStats: RequestHandler = async (req, res, next) => {
  try {
    const stats = await userRepository.getStats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy, getStats };

