import AbstractSeeder from "./AbstractSeeder";
import ProjectSeeder from "./ProjectSeeder";
import UserSeeder from "./UserSeeder";

class TaskSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "tasks",
      truncate: true,
      dependencies: [ProjectSeeder, UserSeeder],
    });
  }

  run() {
    for (let i = 0; i < 8; i += 1) {
      const project = this.getRef(`project_${i}`);

      // Create 3 to 7 tasks per project
      const taskCount = this.faker.number.int({ min: 3, max: 7 });

      for (let j = 0; j < taskCount; j += 1) {
        const collabIndex = this.faker.number.int({ min: 0, max: 14 });
        const collaborator = this.getRef(`collaborator_${collabIndex}`);

        this.insert({
          project_id: (project as any).insertId,
          assigned_to: (collaborator as any).insertId,
          title: this.faker.hacker.phrase().substring(0, 255),
          description: this.faker.lorem.sentence(),
          status: this.faker.helpers.arrayElement(["todo", "in_progress", "review", "done"]),
          priority: this.faker.helpers.arrayElement(["low", "medium", "high", "urgent"]),
          due_date: this.faker.date.future(),
        });
      }
    }
  }
}

export default TaskSeeder;
