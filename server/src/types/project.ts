export type Project = {
  id: number;
  title: string;
  description: string;
  owner_id: number;
  status: "planned" | "active" | "completed" | "on_hold";
};
