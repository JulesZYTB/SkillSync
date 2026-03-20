import AbstractSeeder from "./AbstractSeeder";
import UserSeeder from "./UserSeeder";
import SkillSeeder from "./SkillSeeder";

class UserSkillSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "user_skills",
      truncate: true,
      dependencies: [UserSeeder, SkillSeeder],
    });
  }

  run() {
    // Assign 3 to 5 skills to each collaborator
    for (let i = 0; i < 15; i += 1) {
      const userRef = `collaborator_${i}`;
      const user = this.getRef(userRef);

      const skillCount = this.faker.number.int({ min: 3, max: 6 });
      const usedSkillIndexes = new Set<number>();

      while (usedSkillIndexes.size < skillCount) {
        const skillIndex = this.faker.number.int({ min: 0, max: 14 });

        if (!usedSkillIndexes.has(skillIndex)) {
            usedSkillIndexes.add(skillIndex);
            
            const skill = this.getRef(`skill_${skillIndex}`);

            this.insert({
                user_id: (user as any).insertId,
                skill_id: (skill as any).insertId,
                level: this.faker.number.int({ min: 1, max: 10 }),
            });
        }
      }
    }
  }
}

export default UserSkillSeeder;
