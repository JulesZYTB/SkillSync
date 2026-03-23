import type { RequestHandler } from "express";
import taskRepository from "./taskRepository";
import type { UserPayload } from "../../types/auth";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tasks = await taskRepository.readByProjectId(Number(req.query.project_id));
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const taskId = Number(req.params.id);
    const task = await taskRepository.read(taskId);
    if (task == null) {
      res.sendStatus(404);
    } else {
      res.json(task);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { project_id, assigned_to, title, description, priority } = req.body;
    const insertId = await taskRepository.create({
      project_id,
      assigned_to,
      title,
      description,
      priority,
      status: "todo",
    });
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const taskId = Number(req.params.id);
    const { title, description, status, priority, assigned_to } = req.body;

    // Un collaborateur peut uniquement mettre à jour le statut d'une tâche
    if (req.user?.role === "collaborator") {
      await taskRepository.update({ id: taskId, status });
    } else {
      await taskRepository.update({ id: taskId, title, description, status, priority, assigned_to });
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const taskId = Number(req.params.id);
    await taskRepository.delete(taskId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const readMyTasks: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req.user as UserPayload).id;
    const tasks = await taskRepository.readByUserId(userId);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy, readMyTasks };
