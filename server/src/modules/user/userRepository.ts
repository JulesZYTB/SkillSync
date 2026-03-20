import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

import { User } from "../../types/user";

class UserRepository {
  async create(user: Omit<User, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into users (full_name, email, password_hash, role) values (?, ?, ?, ?)",
      [user.full_name, user.email, user.password_hash, user.role]
    );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select id, full_name, email, role from users where id = ?",
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "select id, full_name, email, role from users"
    );

    return rows;
  }

  async update(user: Partial<User> & { id: number }) {
    const fields = [];
    const values = [];

    if (user.full_name) {
      fields.push("full_name = ?");
      values.push(user.full_name);
    }
    if (user.email) {
      fields.push("email = ?");
      values.push(user.email);
    }
    if (user.role) {
      fields.push("role = ?");
      values.push(user.role);
    }

    if (fields.length === 0) return;

    values.push(user.id);
    await databaseClient.query<Result>(
      `update users set ${fields.join(", ")} where id = ?`,
      values
    );
  }

  async delete(id: number) {
    await databaseClient.query<Result>("delete from users where id = ?", [id]);
  }
  async getStats() {
    const [userStats] = await databaseClient.query<Rows>("select role, count(*) as count from users group by role");
    const [projectStats] = await databaseClient.query<Rows>("select status, count(*) as count from projects group by status");
    const [skillCount] = await databaseClient.query<Rows>("select count(*) as count from skills");
    const [taskStats] = await databaseClient.query<Rows>("select status, count(*) as count from tasks group by status");

    return {
      users: userStats,
      projects: projectStats,
      skills: skillCount[0].count,
      tasks: taskStats,
    };
  }
}

export default new UserRepository();

