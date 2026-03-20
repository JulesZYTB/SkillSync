export type User = {
  id: number;
  full_name: string;
  email: string;
  password_hash: string;
  role: "admin" | "manager" | "collaborator";
};
