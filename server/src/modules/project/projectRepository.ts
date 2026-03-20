import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

import { Project } from "../../types/project";

class ProjectRepository {
  async create(project: Omit<Project, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into projects (title, description, owner_id) values (?, ?, ?)",
      [project.title, project.description, project.owner_id]
    );
    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from projects where id = ?",
      [id]
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from projects");
    return rows;
  }

  async update(project: Partial<Project> & { id: number }) {
    const fields = [];
    const values = [];

    if (project.title) {
      fields.push("title = ?");
      values.push(project.title);
    }
    if (project.description) {
      fields.push("description = ?");
      values.push(project.description);
    }
    if (project.status) {
      fields.push("status = ?");
      values.push(project.status);
    }

    if (fields.length === 0) return;

    values.push(project.id);
    await databaseClient.query<Result>(
      `update projects set ${fields.join(", ")} where id = ?`,
      values
    );
  }

  async delete(id: number) {
    await databaseClient.query<Result>("delete from projects where id = ?", [id]);
  }
}

export default new ProjectRepository();
