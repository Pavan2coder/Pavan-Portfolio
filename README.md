# JARVIS AI Portfolio

A futuristic AI-powered portfolio website built with Next.js, Three.js, and Framer Motion. Features an interactive 3D AI Core visualization, cinematic animations, and a JARVIS-inspired interface.

## Features

- **Interactive 3D AI Core** - Fully draggable and zoomable neural reactor with real technology logos
- **Cinematic Boot Sequence** - JARVIS-style system initialization with sound effects
- **Smooth Animations** - GSAP and Framer Motion powered transitions
- **Futuristic UI** - Holographic effects, scanlines, and particle systems
- **Terminal Interface** - Interactive command-line experience
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Sound System** - Immersive audio feedback for interactions
- **Production Ready** - Optimized build with Next.js 14

## Tech Stack

- **Framework:** Next.js 14 (React 18)
- **3D Graphics:** Three.js, React Three Fiber, React Three Drei
- **Animations:** Framer Motion, GSAP
- **Styling:** Tailwind CSS
- **Icons:** React Icons, Lucide React
- **Smooth Scroll:** Lenis
- **TypeScript:** Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd pavan-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build & Deployment

### Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel

The easiest way to deploy is using Vercel:

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── providers.tsx      # Context providers
├── components/
│   ├── 3d/                # Three.js 3D components
│   │   └── CinematicAICore.tsx
│   ├── animations/        # Animation components
│   ├── boot/              # Boot sequence
│   ├── hud/               # HUD overlays
│   ├── layout/            # Layout components
│   ├── sections/          # Page sections
│   ├── terminal/          # Terminal interface
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and data
└── public/                # Static assets
```

## Customization

### Personal Information

Update your personal details in `lib/data.ts`:

```typescript
export const profile = {
  name: "YOUR NAME",
  role: "YOUR ROLE",
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  // ... more fields
};
```

### Projects, Skills, Experience

All content is managed in `lib/data.ts`. Update the exported objects:
- `projects` - Your project portfolio
- `skillGroups` - Technical skills
- `experience` - Work experience
- `achievements` - Certifications and awards

### Colors & Theme

Customize the color scheme in `tailwind.config.ts`:

```typescript
colors: {
  primary: "#00ffff",  // Cyan
  bg: "#0a0e27",       // Dark blue
  // ... more colors
}
```

## Performance

- **Bundle Size:** ~190 kB (optimized)
- **Lighthouse Score:** 90+ (Performance, Accessibility, Best Practices)
- **Build Time:** ~30 seconds
- **First Load JS:** 87.6 kB shared

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 
- feel free to use this project for your own portfolio.

## Credits

Built by [Athava Sri Pavan](https://github.com/Pavan2coder)

Inspired by JARVIS from Iron Man.

## Contact

- Email: sripavan472006@gmail.com
- GitHub: [@Pavan2coder](https://github.com/Pavan2coder)
- LinkedIn: [a-sripavan-772b8b344](https://linkedin.com/in/a-sripavan-772b8b344)

---

Made with  using Next.js and Three.js
