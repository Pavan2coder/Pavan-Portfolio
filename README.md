# Aurora Portfolio

A modern, premium dark portfolio built with Next.js and Framer Motion. Features a living aurora backdrop, a real typeable terminal, cursor-reactive spotlight cards, and scroll-driven reveals — all tuned for a clean, recruiter-friendly first impression.

## Features

- **Interactive Terminal** - A real shell in the hero section (`help`, `whoami`, `projects`, `sudo hire-me`, and more) that pulls live data from the site
- **Aurora Background** - Drifting gradient blobs, a luminous flow-field of trailing particles, grid, grain, and scanlines
- **Tech Universe** - A drag-to-rotate 3D wireframe sphere (canvas-based) ringed by orbiting tech logos with a live HUD readout
- **Spotlight & Tilt Cards** - Cards that light up and tilt toward the cursor
- **Scramble & Split Text** - Decrypt-style and letter-reveal text effects on headings and taglines
- **Custom Cursor & Click Spark** - Mix-blend cursor ring with burst effects on click
- **Theme Toggle** - Dark/light theme with no flash-of-unstyled-content on load
- **Responsive Design** - Optimized for desktop, tablet, and mobile

## Tech Stack

- **Framework:** Next.js 14 (React 18)
- **Animations:** Framer Motion, GSAP
- **Styling:** Tailwind CSS
- **Icons:** Lucide React, React Icons
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
