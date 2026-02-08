# 💕 Valentine's Day Website

A beautiful, animated Valentine's Day website built with React + Vite.

## Features

- **Horizontal Intro Animation** — A cinematic slide-based intro with floating hearts that plays when the site first loads
- **Apple-style Vertical Scroll** — Smooth parallax scroll effects with fade-in/out animations powered by Framer Motion
- **Love Story Timeline** — An animated timeline section with scroll-triggered reveals
- **Parallax Quotes** — Floating quote sections with scroll-linked parallax effects
- **Reasons Grid** — Staggered card animations listing reasons for love
- **Love Letter** — A beautifully styled letter section
- **Responsive Design** — Works on desktop & mobile

## Tech Stack

- **React** (via Vite)
- **Framer Motion** — scroll animations, parallax, transitions
- **GSAP** — available for additional animation needs
- **CSS** — custom properties, gradients, glassmorphism

## Getting Started

```bash
npm install
npm run dev
```

The site runs at `http://localhost:5173`.

## Customization

- Edit text content in each component under `src/components/`
- Adjust colors via CSS variables in `src/index.css`
- Modify timeline milestones in `LoveStorySection.jsx`
- Update love reasons in `ReasonsSection.jsx`
- Personalize the letter in `LetterSection.jsx`
