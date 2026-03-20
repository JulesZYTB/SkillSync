import AbstractSeeder from "./AbstractSeeder";
import UserSeeder from "./UserSeeder";

class ProjectSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "projects",
      truncate: true,
      dependencies: [UserSeeder],
    });
  }

  run() {
    for (let i = 0; i < 8; i += 1) {
      const managerIndex = this.faker.number.int({ min: 0, max: 4 });
      const manager = this.getRef(`manager_${managerIndex}`);

      const status = this.faker.helpers.arrayElement(["planned", "active", "completed", "on_hold"]);

      this.insert({
        title: this.faker.commerce.productName() + " Project",
        description: this.faker.lorem.paragraph(),
        owner_id: (manager as any).insertId,
        start_date: this.faker.date.past(),
        end_date: this.faker.date.future(),
        status,
        refName: `project_${i}`,
      });
    }
  }
}

export default ProjectSeeder;
