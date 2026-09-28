import { Code, LifeBuoy, PenTool, Rocket, Search, type LucideIcon } from "lucide-react";

export type ProcessStageId = "discover" | "design" | "build" | "launch" | "support";

export type ProcessStep = {
  id: ProcessStageId;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    title: "Discover",
    description: "We learn your goals, users, and budget. You get a clear scope and a fixed quote.",
    icon: Search,
  },
  {
    id: "design",
    title: "Design",
    description: "We plan the structure and design the screens. You review and approve before we code.",
    icon: PenTool,
  },
  {
    id: "build",
    title: "Build",
    description: "We build in short sprints and show you working progress every week.",
    icon: Code,
  },
  {
    id: "launch",
    title: "Launch",
    description: "We test everything, go live, and make sure your team knows how to use it.",
    icon: Rocket,
  },
  {
    id: "support",
    title: "Support",
    description: "We stay on to fix issues, ship updates, and help you grow what we built.",
    icon: LifeBuoy,
  },
];
