import type { RequestHandler } from "express";
import projectRepository from "./projectRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const projects = await projectRepository.readAll();
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const projectId = Number(req.params.id);
    const project = await projectRepository.read(projectId);
    if (project == null) {
      res.sendStatus(404);
    } else {
      res.json(project);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const owner_id = (req.user as any).id;
    const insertId = await projectRepository.create({ title, description, owner_id, status: "planned" });
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const projectId = Number(req.params.id);
    const { title, description, status } = req.body;
    await projectRepository.update({ id: projectId, title, description, status });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const projectId = Number(req.params.id);
    await projectRepository.delete(projectId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };
