import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

import { Skill, UserSkill } from "../../types/skill";

class SkillRepository {
  // Catalogue des compétences (Admin)
  async create(skill: Omit<Skill, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into skills (label) values (?)",
      [skill.label]
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from skills");
    return rows as Skill[];
  }

  async delete(id: number) {
    await databaseClient.query<Result>("delete from skills where id = ?", [id]);
  }

  // Compétences de l'utilisateur (Collaborateur)
  async updateOrInsertUserSkill(userSkill: UserSkill) {
    const [result] = await databaseClient.query<Result>(
      "insert into user_skills (user_id, skill_id, level) values (?, ?, ?) on duplicate key update level = ?",
      [userSkill.user_id, userSkill.skill_id, userSkill.level, userSkill.level]
    );
    return result.affectedRows;
  }

  async findByUserId(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select s.label, us.level from user_skills us join skills s on us.skill_id = s.id where us.user_id = ?",
      [userId]
    );
    return rows;
  }
}

export default new SkillRepository();
