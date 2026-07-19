/* =====================================================================
   AURORA — content source of truth for Athava Sri Pavan's portfolio.
   Real data only. Never fabricate.
   ===================================================================== */

export const profile = {
  name: "Athava Sri Pavan",
  firstName: "Pavan",
  role: "AI & Full-Stack Engineer",
  roles: [
    "AI Engineer",
    "Machine Learning Developer",
    "Full-Stack Developer",
    "Builder of Intelligent Systems",
  ],
  tagline: "I build intelligent systems and the products around them.",
  intro:
    "B.Tech CSE student turning ideas into shipped software — from ML-powered platforms to full-stack web and mobile apps.",
  location: "Hyderabad, India",
  email: "sripavan472006@gmail.com",
  github: "https://github.com/Pavan2coder",
  linkedin: "https://linkedin.com/in/a-sripavan-772b8b344",
  twitter: "https://x.com/",
  resume: "/resume.pdf",
  available: true,
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export const socials = [
  { label: "GitHub", href: profile.github, icon: "Github" },
  { label: "LinkedIn", href: profile.linkedin, icon: "Linkedin" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "Mail" },
];

// Headline stats — real, defensible numbers.
export const stats = [
  { value: "5+", label: "Projects shipped" },
  { value: "3", label: "Internship & roles" },
  { value: "5", label: "Hackathons" },
  { value: "4+", label: "Certifications" },
];

export const about = {
  heading: "Engineer at the intersection of AI and product.",
  paragraphs: [
    "I'm Athava Sri Pavan, a B.Tech Computer Science student at MLR Institute of Technology. I like the whole arc of building software — training a model, wrapping it in a fast API, and shaping a clean interface people actually enjoy using.",
    "My work spans machine-learning platforms, MERN-stack web apps, and cross-platform Flutter mobile apps. Whether it's predicting city traffic or digitising student counselling, I care about shipping things that solve a real problem.",
    "Outside of coursework I mentor juniors, jump into hackathons, and keep building — because the fastest way to learn is to make something that has to work.",
  ],
  facts: [
    { label: "Education", value: "B.Tech CSE — MLR Institute of Technology" },
    { label: "Focus", value: "AI / ML · Full-Stack · Mobile" },
    { label: "Stack", value: "MERN · Python · Flutter · Scikit-learn" },
    { label: "Location", value: "Hyderabad, India" },
  ],
};

// Skill domains for the bento grid.
export const skillDomains = [
  {
    title: "AI / Machine Learning",
    icon: "BrainCircuit",
    blurb: "Predictive modelling, data pipelines, and ML-powered products.",
    items: ["Python", "Scikit-learn", "Predictive Modelling", "FastAPI", "Streamlit"],
  },
  {
    title: "Frontend",
    icon: "LayoutDashboard",
    blurb: "Responsive, accessible interfaces with modern React.",
    items: ["React.js", "Next.js", "Tailwind CSS", "JavaScript", "HTML/CSS"],
  },
  {
    title: "Backend",
    icon: "Server",
    blurb: "APIs and services that stay fast under load.",
    items: ["Node.js", "Express.js", "FastAPI", "REST APIs", "MongoDB"],
  },
  {
    title: "Mobile",
    icon: "Smartphone",
    blurb: "Cross-platform apps with live data.",
    items: ["Flutter", "Dart", "Firebase"],
  },
];

// Continuous tech marquee.
export const techMarquee = [
  "Python",
  "JavaScript",
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "FastAPI",
  "Flutter",
  "Dart",
  "Firebase",
  "Scikit-learn",
  "Tailwind CSS",
  "Streamlit",
  "C/C++",
  "Java",
  "Git",
];

export const projects = [
  {
    id: "traffic-intelligence",
    title: "Urban Traffic Intelligence Platform",
    category: "AI / ML",
    year: "2025",
    featured: true,
    description:
      "An ML-powered platform that predicts traffic congestion and optimises routes using predictive modelling and Dijkstra's algorithm, with a live analytics dashboard.",
    tags: ["Python", "FastAPI", "Scikit-learn", "Streamlit"],
    link: profile.github,
  },
  {
    id: "mlrit-portal",
    title: "MLRIT Student Portal",
    category: "Full-Stack",
    year: "2025",
    featured: true,
    description:
      "A full-stack platform digitising student counselling and academic tracking at MLRIT, with role-based access and a counselor dashboard. Deployed on Vercel.",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js"],
    link: profile.github,
  },
  {
    id: "campus-companion",
    title: "Campus Companion",
    category: "Full-Stack",
    year: "2024",
    featured: false,
    description:
      "A campus management platform centralising student and faculty services. Contributed as Frontend Developer & API contributor across the MERN stack.",
    tags: ["MERN Stack", "REST APIs", "Responsive UI"],
    link: profile.github,
  },
  {
    id: "aerosense",
    title: "AeroSense — Air Quality Monitor",
    category: "Web App",
    year: "2024",
    featured: false,
    description:
      "A real-time AQI monitoring app pulling live pollution data into a clean, responsive interface for everyday environmental awareness.",
    tags: ["JavaScript", "REST APIs", "HTML/CSS"],
    link: profile.github,
  },
  {
    id: "catering-app",
    title: "Catering App",
    category: "Mobile",
    year: "2024",
    featured: false,
    description:
      "A cross-platform catering and bulk food-ordering app with a Firebase backend and live order updates.",
    tags: ["Flutter", "Dart", "Firebase"],
    link: profile.github,
  },
];

export const experience = [
  {
    company: "Centre for Innovation & Entrepreneurship — MLRIT",
    role: "Web Intern",
    period: "2024 — Present",
    summary:
      "Building and maintaining official institutional web modules and responsive UI systems.",
    bullets: [
      "Developed and maintained official college web modules with modern, accessible UI.",
      "Collaborated with the CIE team on innovation projects and technical initiatives.",
    ],
  },
  {
    company: "Centre for Innovation & Entrepreneurship (CIE)",
    role: "Technical Member",
    period: "2023 — Present",
    summary:
      "Contributing to innovation projects and representing the institution in hackathons.",
    bullets: [
      "Contributed to web development and AI-driven solution initiatives.",
      "Participated in hackathons and innovation challenges for the institution.",
    ],
  },
  {
    company: "MLR Institute of Technology",
    role: "Student Mentor",
    period: "2023 — Present",
    summary:
      "Mentoring juniors in programming, web, and project building.",
    bullets: [
      "Ran workshops on MERN stack, Flutter, and AI/ML fundamentals.",
      "Guided students through real-world project development and deployment.",
    ],
  },
];

export const achievements = [
  {
    title: "Google Gen AI Exchange",
    org: "Google",
    description: "Participant in the Google Gen AI Exchange program.",
    icon: "Sparkles",
  },
  {
    title: "Google Gen AI 2.0",
    org: "Google",
    description: "Participant in the Google Gen AI 2.0 program.",
    icon: "Rocket",
  },
  {
    title: "Innovation Challenge",
    org: "Hackathon",
    description: "Innovation Challenge hackathon certificate.",
    icon: "Trophy",
  },
  {
    title: "Fusion 360 Certified",
    org: "Autodesk",
    description: "Autodesk Fusion 360 certification.",
    icon: "Settings2",
  },
];
