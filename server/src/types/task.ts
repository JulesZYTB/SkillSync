export type Task = {
  id: number;
  project_id: number;
  assigned_to: number;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "review" | "done";
  priority: "low" | "medium" | "high" | "urgent";
};
