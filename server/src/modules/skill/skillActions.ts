import type { RequestHandler } from "express";
import skillRepository from "./skillRepository";
import { UserPayload } from "../../types/auth";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const skills = await skillRepository.readAll();
    res.json(skills);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { label } = req.body;
    const insertId = await skillRepository.create({ label });
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const skillId = Number(req.params.id);
    await skillRepository.delete(skillId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const updateUserSkill: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req.user as UserPayload).id;
    const { skill_id, level } = req.body;

    await skillRepository.updateOrInsertUserSkill({
      user_id: userId,
      skill_id,
      level,
    });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const readUserSkills: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req.user as UserPayload).id;
    const userSkills = await skillRepository.findByUserId(userId);
    res.json(userSkills);
  } catch (err) {
    next(err);
  }
};

export default { browse, add, destroy, updateUserSkill, readUserSkills };
