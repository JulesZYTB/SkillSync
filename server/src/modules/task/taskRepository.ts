import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

import { Task } from "../../types/task";

class TaskRepository {
  async create(task: Omit<Task, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into tasks (project_id, assigned_to, title, description, priority) values (?, ?, ?, ?, ?)",
      [task.project_id, task.assigned_to, task.title, task.description, task.priority]
    );
    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from tasks where id = ?",
      [id]
    );
    return rows[0];
  }

  async readByProjectId(projectId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from tasks where project_id = ?",
      [projectId]
    );
    return rows;
  }

  async readByUserId(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from tasks where assigned_to = ?",
      [userId]
    );
    return rows;
  }

  async update(task: Partial<Task> & { id: number }) {
    const fields = [];
    const values = [];

    if (task.title) {
      fields.push("title = ?");
      values.push(task.title);
    }
    if (task.description) {
      fields.push("description = ?");
      values.push(task.description);
    }
    if (task.status) {
      fields.push("status = ?");
      values.push(task.status);
    }
    if (task.priority) {
      fields.push("priority = ?");
      values.push(task.priority);
    }
    if (task.assigned_to) {
      fields.push("assigned_to = ?");
      values.push(task.assigned_to);
    }

    if (fields.length === 0) return;

    values.push(task.id);
    await databaseClient.query<Result>(
      `update tasks set ${fields.join(", ")} where id = ?`,
      values
    );
  }

  async delete(id: number) {
    await databaseClient.query<Result>("delete from tasks where id = ?", [id]);
  }
}

export default new TaskRepository();
