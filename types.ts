
export enum RoleType {
  BA = 'Business Analyst',
  PDM = 'Product Data Manager',
  PO = 'Product Owner'
}

export interface DayTask {
  id: number;
  title: string;
  focus: string;
  activities: string[];
  deliverable?: string;
  resources: { name: string; url: string }[];
  category: 'Learning' | 'Portfolio' | 'Career';
}

export interface SkillMap {
  supportSkill: string;
  targetRole: RoleType;
  pivotAngle: string;
}
