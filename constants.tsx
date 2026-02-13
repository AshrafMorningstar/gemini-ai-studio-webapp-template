
import { DayTask, RoleType, SkillMap } from './types';

export const SKILL_MAP: SkillMap[] = [
  {
    supportSkill: "Root Cause Analysis",
    targetRole: RoleType.BA,
    pivotAngle: "Requirement Gathering & Gap Analysis"
  },
  {
    supportSkill: "Customer Empathy / Ticket Feedback",
    targetRole: RoleType.PO,
    pivotAngle: "User Persona Development & Feature Prioritization"
  },
  {
    supportSkill: "Technical Troubleshooting",
    targetRole: RoleType.PDM,
    pivotAngle: "Data Quality Auditing & Error Pattern Recognition"
  },
  {
    supportSkill: "Documentation (KB Articles)",
    targetRole: RoleType.BA,
    pivotAngle: "Business Requirements Documents (BRD) & User Stories"
  }
];

export const FIFTEEN_DAY_PLAN: DayTask[] = [
  {
    id: 1,
    title: "The Pivot Audit",
    focus: "Self-assessment and Skill Mapping",
    activities: [
      "Catalog 4 years of support achievements.",
      "Identify 'Data-Heavy' support scenarios vs 'Stakeholder-Heavy' ones.",
      "Set up LinkedIn and GitHub to showcase 'Product Thinking' (Reference: AshrafMorningstar style)."
    ],
    deliverable: "Personal Skills Pivot Matrix",
    resources: [{ name: "Mapping Tech Skills", url: "https://www.atlassian.com/agile/product-management/product-owner" }],
    category: "Career"
  },
  {
    id: 2,
    title: "BA Foundation",
    focus: "Business Analysis Body of Knowledge (BABOK)",
    activities: [
      "Learn BRD vs FRD structures.",
      "Master Process Mapping (BPMN) basics.",
      "Analyze a 'ticket flow' as a business process."
    ],
    deliverable: "Process Map of a Support Escalation Workflow",
    resources: [{ name: "IIBA BA Fundamentals", url: "https://www.iiba.org/learning-development/business-analysis-standard/" }],
    category: "Learning"
  },
  {
    id: 3,
    title: "The Data Manager Mindset",
    focus: "Data Lifecycle & PDM Responsibilities",
    activities: [
      "Understand Master Data Management (MDM).",
      "Learn basics of SQL for data extraction (if not known).",
      "Identify common data integrity issues in support databases."
    ],
    deliverable: "Draft Data Quality Checklist",
    resources: [{ name: "Data Management Basics", url: "https://www.dama.org/cpages/home" }],
    category: "Learning"
  },
  {
    id: 4,
    title: "PO & Agile Mastery",
    focus: "Scrum, Backlogs, and Value",
    activities: [
      "Master the 'Definition of Ready' and 'Definition of Done'.",
      "Learn User Story mapping techniques.",
      "Role-play prioritization (MoSCoW method)."
    ],
    deliverable: "Draft Product Vision Statement",
    resources: [{ name: "Scrum Guide", url: "https://scrumguides.org/" }],
    category: "Learning"
  },
  {
    id: 5,
    title: "Portfolio Strategy & Project Selection",
    focus: "Defining the 'Capstone' Project",
    activities: [
      "Select a real-world support problem (e.g., high churn, slow response).",
      "Identify the 'Product solution' to this support problem.",
      "Scope out the 5 deliverables for next week."
    ],
    deliverable: "Project Proposal (One-Pager)",
    resources: [{ name: "Portfolio Best Practices", url: "https://www.productplan.com/glossary/product-portfolio/" }],
    category: "Portfolio"
  },
  {
    id: 6,
    title: "Portfolio Build: Discovery",
    focus: "User Research & Gap Analysis",
    activities: [
      "Simulate user interviews (or use real support feedback).",
      "Create 2 detailed User Personas (User vs Admin).",
      "Perform a Gap Analysis of current support tools."
    ],
    deliverable: "User Research Summary & Personas",
    category: "Portfolio",
    resources: []
  },
  {
    id: 7,
    title: "Portfolio Build: Requirements",
    focus: "BRD & User Stories (BA Focus)",
    activities: [
      "Write 10 detailed User Stories with Acceptance Criteria.",
      "Create a functional requirement hierarchy.",
      "Map out the data flow for the solution."
    ],
    deliverable: "Product Requirements Document (PRD) Draft",
    category: "Portfolio",
    resources: []
  },
  {
    id: 8,
    title: "Portfolio Build: Data Architecture",
    focus: "PDM Focus",
    activities: [
      "Design an Entity-Relationship Diagram (ERD) for the feature.",
      "Define data governance rules for the new feature.",
      "Mock up a dashboard showing success metrics."
    ],
    deliverable: "Data Flow Diagram & Success Metrics KPI Dashboard",
    category: "Portfolio",
    resources: []
  },
  {
    id: 9,
    title: "Portfolio Build: Roadmapping",
    focus: "PO Focus",
    activities: [
      "Create a 3-month Roadmap (MVP to V2).",
      "Prioritize the backlog using Value vs Effort matrix.",
      "Draft a release plan."
    ],
    deliverable: "Interactive Product Roadmap (using tools like Notion/Miro)",
    category: "Portfolio",
    resources: []
  },
  {
    id: 10,
    title: "Portfolio Build: Visual Assets",
    focus: "Wireframing & Flow",
    activities: [
      "Design low-fidelity wireframes in Figma/Balsamiq.",
      "Create a 'State Transition Diagram' for the solution.",
      "Review the end-to-end logic for consistency."
    ],
    deliverable: "Set of Wireframes & Logic Flows",
    category: "Portfolio",
    resources: []
  },
  {
    id: 11,
    title: "Documentation Refining",
    focus: "Clarity and Professionalism",
    activities: [
      "Clean up all deliverables into a cohesive case study.",
      "Use 'Business Speak' instead of 'Tech Support Jargon'.",
      "Prepare a GitHub README for the project (like AshrafMorningstar)."
    ],
    deliverable: "Polished Project Case Study",
    category: "Portfolio",
    resources: []
  },
  {
    id: 12,
    title: "Resume Overhaul",
    focus: "Outcome-Oriented Language",
    activities: [
      "Rewrite 4-year support tenure with keywords like 'Stakeholder management', 'Lifecycle', and 'Metrics'.",
      "Highlight the Portfolio Project at the top.",
      "Quantify achievements (e.g., 'Reduced ticket volume by 20% through...')."
    ],
    deliverable: "Draft Resume V1",
    category: "Career",
    resources: []
  },
  {
    id: 13,
    title: "LinkedIn & Networking",
    focus: "Personal Branding",
    activities: [
      "Update Headline and 'About' section.",
      "Publish a post about 'What 4 Years in Support Taught Me About Product'.",
      "Connect with 5 recruiters/leaders in BA/PO roles."
    ],
    deliverable: "Optimized LinkedIn Profile",
    category: "Career",
    resources: []
  },
  {
    id: 14,
    title: "Interview Prep: Storytelling",
    focus: "The STAR Method for PDM/PO/BA",
    activities: [
      "Prepare 3 stories about 'Conflict with Stakeholders'.",
      "Prepare 3 stories about 'Data-Driven Decision Making'.",
      "Practice the 'Why I'm switching roles' pitch."
    ],
    deliverable: "Interview Cheat Sheet",
    category: "Career",
    resources: []
  },
  {
    id: 15,
    title: "Review & Launch",
    focus: "Final Polishing",
    activities: [
      "Final review of the portfolio site/repo.",
      "Simulate a 30-min case study presentation.",
      "Apply to first 3 roles."
    ],
    deliverable: "Completed Transition Portfolio",
    category: "Career",
    resources: []
  }
];
