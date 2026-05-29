"use client";
import dynamic from "next/dynamic";
import { SectionHeader } from "@/components/ui/SectionHeader";

const InfiniteMenu = dynamic(() => import("@/components/3d/InfiniteMenu"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

const items = [
  {
    image: "https://picsum.photos/seed/jarvis-01/600/600?grayscale",
    link: "https://github.com/",
    title: "NEURAL CORE",
    description: "Real-time LLM agent orchestration",
  },
  {
    image: "https://picsum.photos/seed/jarvis-02/600/600?grayscale",
    link: "https://github.com/",
    title: "RAG PIPELINE",
    description: "Vector retrieval over pgvector",
  },
  {
    image: "https://picsum.photos/seed/jarvis-03/600/600?grayscale",
    link: "https://github.com/",
    title: "VISION OPS",
    description: "OpenCV + YOLO production stack",
  },
  {
    image: "https://picsum.photos/seed/jarvis-04/600/600?grayscale",
    link: "https://github.com/",
    title: "VOICE LAYER",
    description: "Whisper streaming transcripts",
  },
  {
    image: "https://picsum.photos/seed/jarvis-05/600/600?grayscale",
    link: "https://github.com/",
    title: "EDGE INFER",
    description: "ONNX runtime on the edge",
  },
  {
    image: "https://picsum.photos/seed/jarvis-06/600/600?grayscale",
    link: "https://github.com/",
    title: "AGENT MESH",
    description: "Multi-agent task router",
  },
  {
    image: "https://picsum.photos/seed/jarvis-07/600/600?grayscale",
    link: "https://github.com/",
    title: "DATA FORGE",
    description: "Synthetic data generation",
  },
  {
    image: "https://picsum.photos/seed/jarvis-08/600/600?grayscale",
    link: "https://github.com/",
    title: "OBSERVABILITY",
    description: "Trace, log, and replay any run",
  },
];

export function Showcase() {
  return (
    <section id="showcase" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <SectionHeader
          code="04"
          title="Showcase / Holo Index"
          kicker="ROTATE THE SPHERE"
        />

        <div className="relative h-[560px] sm:h-[640px] lg:h-[720px] rounded-md overflow-hidden">
          <InfiniteMenu items={items} />
        </div>
      </div>
    </section>
  );
}
