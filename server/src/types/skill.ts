export type Skill = {
  id: number;
  label: string;
};

export type UserSkill = {
  user_id: number;
  skill_id: number;
  level: number;
};
