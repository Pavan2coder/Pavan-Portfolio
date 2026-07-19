"use client";

import {
  Github,
  Linkedin,
  Mail,
  BrainCircuit,
  LayoutDashboard,
  Server,
  Smartphone,
  Sparkles,
  Rocket,
  Trophy,
  Settings2,
  ArrowUpRight,
  ArrowRight,
  Download,
  MapPin,
  Sun,
  Moon,
  Menu,
  X,
  Code2,
  Cpu,
  GraduationCap,
  Briefcase,
  Send,
  Copy,
  Check,
  type LucideIcon,
} from "lucide-react";

const registry: Record<string, LucideIcon> = {
  Github,
  Linkedin,
  Mail,
  BrainCircuit,
  LayoutDashboard,
  Server,
  Smartphone,
  Sparkles,
  Rocket,
  Trophy,
  Settings2,
  ArrowUpRight,
  ArrowRight,
  Download,
  MapPin,
  Sun,
  Moon,
  Menu,
  X,
  Code2,
  Cpu,
  GraduationCap,
  Briefcase,
  Send,
  Copy,
  Check,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = registry[name] ?? Code2;
  return <Cmp className={className} strokeWidth={strokeWidth} />;
}
