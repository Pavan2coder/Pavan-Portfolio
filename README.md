# Pavan Portfolio

A bento-style portfolio built with Next.js and Framer Motion, in a **midnight + violet** palette. Every section is laid out as rounded tiles with big condensed type. It opens with a "live build": three AI agents type the site's code in a fake editor, then a swarm of cursors assembles the page in front of you. After that you get a real typeable terminal, cursor-reactive effects and scroll-driven reveals.

## Design

- **Bento tiles**: Hero, About, Skills, Projects, Experience and Contact are all built from rounded tiles on a 12-column grid (`Tile` + `SectionLayout` in `SectionHeading.tsx`)
- **Midnight + Violet palette**: page `#0d0d14`, tiles in lavender `#ece9ff`, deep violet `#2a1b5c`, electric blue `#3b5bff`, ink `#08080d`, with a lime `#c6ff3d` accent
- **Tile tones re-scope theme vars**: `.tile-{tone}` classes override `--text`, `--brand`, `--border`... so the same utilities retint inside each tile
- **Typography**: Barlow Condensed (display), Plus Jakarta Sans (body), JetBrains Mono (labels)

## Features

- **Code Intro**: a full-screen editor where 3 agents type `Hero.tsx`, `theme.css` and `data.ts` while a live preview builds itself. Skip with the button or `Esc`
- **Cursor Swarm**: 18 coloured agent cursors draw a frame for each section and fill it in as the page tours itself. You can replay it from the footer ("↻ Replay build intro")
- **Interactive Terminal**: a real shell in the hero (`help`, `whoami`, `projects`, `sudo hire-me`, and more) that pulls live data from the site
- **Tech Universe**: a drag-to-rotate 3D wireframe sphere (canvas) ringed by orbiting tech logos, with a live HUD readout
- **Text Pressure**: a variable-font "PAVAN" band whose letters deform toward your cursor
- **Scramble, Decrypt & Split Text**: headings decode from dots near the cursor, and the role rotator decrypts
- **Spotlight & Tilt Cards**: cards that light up and tilt toward the cursor
- **Custom Cursor & Click Spark**: a mix-blend cursor ring with bursts on click
- **Theme Toggle**: black by default, with an optional light theme and no flash on load
- **Accessible motion**: `prefers-reduced-motion` skips the intro and swarm
- **Responsive**: works on desktop, tablet and mobile

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
├── app/                        # Next.js app directory
│   ├── globals.css            # Global styles + Aurora design tokens
│   ├── layout.tsx             # Root layout, fonts, theme init
│   └── page.tsx               # Page composition + scroll progress bar
├── components/
│   └── aurora/                 # Current design system
│       ├── bits/               # Effects: CodeIntro, CursorSwarm, terminal,
│       │                       #   tech universe, tilt, cursor, text FX...
│       └── sections/           # Hero, About, Skills, Projects, Experience, Contact
├── hooks/                      # Custom React hooks
├── lib/                        # Content (data.ts) and utilities
└── public/                     # Static assets
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

Aurora's design tokens (colors, glow, borders) live as CSS variables in `app/globals.css` under `data-theme`, with matching values wired into `tailwind.config.ts`.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Feel free to use this project for your own portfolio.

## Credits

Built by [Athava Sri Pavan](https://github.com/Pavan2coder)

## Contact

- Email: sripavan472006@gmail.com
- GitHub: [@Pavan2coder](https://github.com/Pavan2coder)
- LinkedIn: [a-sripavan-772b8b344](https://linkedin.com/in/a-sripavan-772b8b344)

---

Made with Next.js and Framer Motion
