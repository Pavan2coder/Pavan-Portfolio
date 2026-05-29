# Pavan Portfolio - J.A.R.V.I.S Inspired

A futuristic, cinematic portfolio website inspired by Iron Man's J.A.R.V.I.S operating system. Features stunning 3D animations, HUD-style interface, and an immersive AI-themed experience.

## Features

- Cinematic J.A.R.V.I.S boot sequence
- Custom HUD-style design with glowing effects
- 3D AI Core visualization with Three.js
- Interactive AI Assistant chat panel
- Terminal-style command interface
- Fully responsive design
- Smooth animations and transitions
- Modern tech stack with Next.js 14

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **3D Graphics:** React Three Fiber, Three.js, drei
- **Fonts:** Orbitron, Rajdhani

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/pavan-portfolio.git

# Navigate to project directory
cd pavan-portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── providers.tsx       # Client-side providers
│   ├── page.tsx           # Main page orchestration
│   └── globals.css        # Global styles & utilities
│
├── components/
│   ├── boot/              # J.A.R.V.I.S boot sequence
│   ├── hud/               # HUD elements (grid, particles, radar)
│   ├── 3d/                # Three.js 3D components
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Navigation & layout components
│   ├── sections/          # Page sections (Hero, About, etc.)
│   ├── assistant/         # AI Assistant chat
│   ├── terminal/          # Terminal interface
│   └── animations/        # Animation components
│
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities & data
└── public/               # Static assets
```

## Customization

### Update Personal Information
Edit `lib/data.ts` to customize:
- Name and role
- Projects and experience
- Skills and technologies
- Social media links

### Change Colors
Modify color tokens in `tailwind.config.ts`:
- Background: `#050816`
- Primary glow: `#00ffff`
- Secondary glow: `#007cf0`
- Accent: `#7df9ff`
- Text: `#e6f1ff`

### Replace Favicon
Replace `/public/favicon.svg` with your own icon.

## Build for Production

```bash
npm run build
npm start
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Pavan**

Feel free to reach out for collaborations or questions!

---

Made with love and inspired by J.A.R.V.I.S
