export type User = {
  id: number;
  full_name: string;
  email: string;
  role: "admin" | "manager" | "collaborator";
};

export type Skill = {
  id: number;
  label: string;
};

export type UserSkill = {
  label: string;
  level: number;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  owner_id: number;
  status: "planned" | "active" | "completed" | "on_hold";
};

export type Task = {
  id: number;
  project_id: number;
  assigned_to: number;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "review" | "done";
  priority: "low" | "medium" | "high" | "urgent";
};
