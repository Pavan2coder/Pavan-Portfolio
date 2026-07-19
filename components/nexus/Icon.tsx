"use client";

import {
  Cpu,
  Boxes,
  BrainCircuit,
  FlaskConical,
  GitBranch,
  Award,
  FileText,
  Radio,
  Github,
  Linkedin,
  Waypoints,
  GraduationCap,
  Wind,
  MemoryStick,
  Zap,
  Layers,
  GitCommitHorizontal,
  FolderGit2,
  Trophy,
  Clock,
  MapPin,
  Wifi,
  Activity,
  Sun,
  Moon,
  Menu,
  X,
  ArrowUpRight,
  ArrowRight,
  Mail,
  Send,
  CircleDot,
  type LucideIcon,
} from "lucide-react";

const registry: Record<string, LucideIcon> = {
  Cpu,
  Boxes,
  BrainCircuit,
  FlaskConical,
  GitBranch,
  Award,
  FileText,
  Radio,
  Github,
  Linkedin,
  Waypoints,
  GraduationCap,
  Wind,
  MemoryStick,
  Zap,
  Layers,
  GitCommitHorizontal,
  FolderGit2,
  Trophy,
  Clock,
  MapPin,
  Wifi,
  Activity,
  Sun,
  Moon,
  Menu,
  X,
  ArrowUpRight,
  ArrowRight,
  Mail,
  Send,
  CircleDot,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.5,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = registry[name] ?? CircleDot;
  return <Cmp className={className} strokeWidth={strokeWidth} />;
}
