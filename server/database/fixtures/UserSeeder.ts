import bcrypt from "bcryptjs";
import AbstractSeeder from "./AbstractSeeder";

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "users", truncate: true });
  }

  async run() {
    // 1. Mandatory AI Support User
    const hashedAiSupportPassword = await bcrypt.hash("@BloumeGenAI@!2006", 10);
    this.insert({
      full_name: "AI Support",
      email: "ai-support@bloumegen.vip",
      password_hash: hashedAiSupportPassword,
      role: "admin",
      refName: "user_admin_test",
    });

    // 2. Administrators
    for (let i = 0; i < 2; i += 1) {
      this.insert({
        full_name: this.faker.person.fullName(),
        email: this.faker.internet.email(),
        password_hash: await bcrypt.hash("admin123", 10),
        role: "admin",
        refName: `admin_${i}`,
      });
    }

    // 3. Managers
    for (let i = 0; i < 5; i += 1) {
      this.insert({
        full_name: this.faker.person.fullName(),
        email: this.faker.internet.email(),
        password_hash: await bcrypt.hash("manager123", 10),
        role: "manager",
        refName: `manager_${i}`,
      });
    }

    // 4. Collaborators
    for (let i = 0; i < 15; i += 1) {
      this.insert({
        full_name: this.faker.person.fullName(),
        email: this.faker.internet.email(),
        password_hash: await bcrypt.hash("collab123", 10),
        role: "collaborator",
        refName: `collaborator_${i}`,
      });
    }
  }
}

export default UserSeeder;
