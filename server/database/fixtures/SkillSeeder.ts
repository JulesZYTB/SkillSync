import AbstractSeeder from "./AbstractSeeder";

class SkillSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "skills", truncate: true });
  }

  run() {
    const skills = [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "SQL",
      "NoSQL",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Unit Testing",
      "UI/UX Design",
      "Project Management",
      "Agile Methodology",
      "French",
      "English",
    ];

    skills.forEach((label, index) => {
      this.insert({
        label,
        refName: `skill_${index}`,
      });
    });
  }
}

export default SkillSeeder;
