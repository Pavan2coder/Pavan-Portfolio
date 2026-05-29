export const profile = {
  name: "Pavan",
  role: "AI Engineer • ML Developer",
  tagline: "Building Intelligent Systems",
  location: "India",
  email: "pavan@example.com",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/in/",
  twitter: "https://x.com/",
  resume: "/resume.pdf",
};

export const navItems = [
  { id: "home", label: "Home", code: "00" },
  { id: "about", label: "About", code: "01" },
  { id: "skills", label: "Skills", code: "02" },
  { id: "projects", label: "Projects", code: "03" },
  { id: "experience", label: "Experience", code: "04" },
  { id: "assistant", label: "J.A.R.V.I.S", code: "05" },
  { id: "terminal", label: "Terminal", code: "06" },
  { id: "contact", label: "Contact", code: "07" },
];

export const aboutFacts = [
  { label: "ROLE", value: "AI Engineer" },
  { label: "FOCUS", value: "LLMs, Agents, ML Systems" },
  { label: "STACK", value: "Python • PyTorch • LangChain" },
  { label: "STATUS", value: "Available for Collaboration" },
];

export const skillGroups = [
  {
    title: "AI / ML",
    items: [
      { name: "Python", level: 95 },
      { name: "PyTorch", level: 88 },
      { name: "TensorFlow", level: 82 },
      { name: "LangChain", level: 90 },
      { name: "Hugging Face", level: 86 },
    ],
  },
  {
    title: "Engineering",
    items: [
      { name: "FastAPI", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "TypeScript", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Docker", level: 78 },
    ],
  },
  {
    title: "Mobile / Data",
    items: [
      { name: "Flutter", level: 84 },
      { name: "Pandas", level: 92 },
      { name: "NumPy", level: 90 },
      { name: "Vector DBs", level: 80 },
      { name: "AWS", level: 75 },
    ],
  },
];

export const projects = [
  {
    id: "neural-vault",
    title: "Neural Vault",
    description:
      "A retrieval-augmented document intelligence platform with multi-agent reasoning, semantic search, and source-cited answers.",
    tags: ["LangChain", "FastAPI", "Postgres", "pgvector"],
    status: "DEPLOYED",
    link: "#",
  },
  {
    id: "synapse-studio",
    title: "Synapse Studio",
    description:
      "Visual orchestration studio for chaining LLM agents, tools, and evaluators with real-time tracing.",
    tags: ["Next.js", "Python", "WebSockets"],
    status: "ACTIVE",
    link: "#",
  },
  {
    id: "vision-iq",
    title: "Vision IQ",
    description:
      "Real-time computer vision pipeline for object detection, scene understanding, and edge inference.",
    tags: ["PyTorch", "ONNX", "OpenCV"],
    status: "RESEARCH",
    link: "#",
  },
  {
    id: "auto-ops",
    title: "AutoOps Agent",
    description:
      "Autonomous DevOps assistant that diagnoses incidents, drafts runbooks, and proposes safe remediations.",
    tags: ["Agents", "Kubernetes", "GitOps"],
    status: "BETA",
    link: "#",
  },
  {
    id: "echo-mind",
    title: "EchoMind",
    description:
      "Conversational mobile companion with on-device speech recognition and personalized memory.",
    tags: ["Flutter", "Whisper", "Llama"],
    status: "DEPLOYED",
    link: "#",
  },
  {
    id: "quantum-flow",
    title: "QuantumFlow",
    description:
      "Streaming ML feature pipeline with sub-second latency and adaptive drift detection.",
    tags: ["Kafka", "Flink", "MLOps"],
    status: "ACTIVE",
    link: "#",
  },
];

export const experience = [
  {
    company: "Stark Industries (Concept)",
    role: "AI Engineer",
    period: "2024 — Present",
    bullets: [
      "Architected multi-agent LLM systems serving 50k+ requests/day with sub-200ms p95.",
      "Built RAG pipelines with hybrid search reducing hallucinations by 38%.",
      "Productionized fine-tuned models with cost-aware routing across providers.",
    ],
  },
  {
    company: "Independent Research",
    role: "ML Developer",
    period: "2023 — 2024",
    bullets: [
      "Published open-source vision-language tooling adopted by 1.2k+ projects.",
      "Designed evaluation frameworks for agentic systems benchmarked on 12 tasks.",
    ],
  },
  {
    company: "MLR Institute of Technology",
    role: "Researcher / Student",
    period: "2021 — 2024",
    bullets: [
      "Led campus AI club; ran workshops on transformers, embeddings, and agents.",
      "Best Project Award for an end-to-end conversational diagnosis assistant.",
    ],
  },
];

export const systemBootLines = [
  "INITIALIZING AI SYSTEM...",
  "CONNECTING NEURAL MODULES...",
  "LOADING PORTFOLIO DATABASE...",
  "AUTHENTICATION SUCCESSFUL...",
  "WELCOME BACK, PAVAN.",
];
