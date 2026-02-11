import { useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import './StarMap.css';

/*
  ╔══════════════════════════════════════════════════╗
  ║        CUSTOMISE YOUR STAR MAP HERE!             ║
  ╚══════════════════════════════════════════════════╝

  Change the date, location, and message below
  to match the night you first met (or any
  special night you want to commemorate).
*/
const STAR_MAP_DATE = 'January 15, 2024';
const STAR_MAP_TIME = '8:42 PM';
const STAR_MAP_LOCATION = 'New York, NY';
const STAR_MAP_COORDS = '40.7128° N, 74.0060° W';
const STAR_MAP_MESSAGE = 'The night the stars aligned for us';

/*
  Constellation data — these are simplified real patterns
  scaled to fit a viewBox of 800×800.
  Each constellation has: name, stars (x,y pairs), and
  connections (indices of stars to draw lines between).
*/
const constellations = [
  {
    name: 'Cassiopeia',
    stars: [
      { x: 140, y: 120 },
      { x: 175, y: 85 },
      { x: 210, y: 110 },
      { x: 245, y: 80 },
      { x: 275, y: 115 },
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
  {
    name: 'Orion',
    stars: [
      { x: 500, y: 200 }, // Betelgeuse
      { x: 580, y: 210 }, // Bellatrix
      { x: 520, y: 290 }, // belt 1
      { x: 545, y: 295 }, // belt 2
      { x: 570, y: 300 }, // belt 3
      { x: 510, y: 380 }, // Saiph
      { x: 590, y: 370 }, // Rigel
    ],
    connections: [[0, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6]],
  },
  {
    name: 'Ursa Major',
    stars: [
      { x: 350, y: 460 },
      { x: 400, y: 440 },
      { x: 440, y: 470 },
      { x: 430, y: 510 },
      { x: 380, y: 520 },
      { x: 340, y: 550 },
      { x: 310, y: 580 },
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [4, 5], [5, 6]],
  },
  {
    name: 'Leo',
    stars: [
      { x: 620, y: 500 },
      { x: 660, y: 470 },
      { x: 700, y: 490 },
      { x: 720, y: 530 },
      { x: 680, y: 560 },
      { x: 640, y: 545 },
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]],
  },
  {
    name: 'Lyra',
    stars: [
      { x: 160, y: 350 }, // Vega
      { x: 140, y: 390 },
      { x: 180, y: 390 },
      { x: 135, y: 430 },
      { x: 185, y: 430 },
    ],
    connections: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 4]],
  },
  {
    name: 'Gemini',
    stars: [
      { x: 680, y: 130 }, // Castor
      { x: 720, y: 160 }, // Pollux
      { x: 670, y: 190 },
      { x: 710, y: 220 },
      { x: 690, y: 260 },
    ],
    connections: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 4]],
  },
];

// Generate random background stars
function generateStars(count) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * 800,
      y: Math.random() * 800,
      r: 0.3 + Math.random() * 1.2,
      opacity: 0.2 + Math.random() * 0.6,
      twinkle: 2 + Math.random() * 4,
      delay: Math.random() * 5,
    });
  }
  return stars;
}

// Shooting star paths
function generateShootingStars(count) {
  const shooting = [];
  for (let i = 0; i < count; i++) {
    const startX = 100 + Math.random() * 500;
    const startY = Math.random() * 300;
    shooting.push({
      x1: startX,
      y1: startY,
      x2: startX + 80 + Math.random() * 120,
      y2: startY + 40 + Math.random() * 80,
      delay: 3 + Math.random() * 12,
      duration: 8 + Math.random() * 6,
    });
  }
  return shooting;
}

export default function StarMap() {
  const bgStars = useMemo(() => generateStars(260), []);
  const shootingStars = useMemo(() => generateShootingStars(3), []);

  return (
    <section className="starmap-section" id="starmap">
      <motion.div
        className="starmap-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="starmap-label">Our Night Sky</span>
        <h2 className="starmap-title">The Stars That Night</h2>
        <p className="starmap-subtitle">
          A map of the sky on the night everything began
        </p>
      </motion.div>

      <motion.div
        className="starmap-container"
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Circular frame */}
        <div className="starmap-frame">
          <svg
            className="starmap-svg"
            viewBox="0 0 800 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Circular clip */}
              <clipPath id="circleClip">
                <circle cx="400" cy="400" r="385" />
              </clipPath>

              {/* Star glow filter */}
              <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
              </filter>

              {/* Bright star glow */}
              <filter id="brightGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" />
              </filter>

              {/* Radial gradient for depth */}
              <radialGradient id="skyGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0a0a2e" />
                <stop offset="60%" stopColor="#060618" />
                <stop offset="100%" stopColor="#020210" />
              </radialGradient>

              {/* Milky Way gradient */}
              <linearGradient id="milkyWay" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(180,160,255,0)" />
                <stop offset="30%" stopColor="rgba(180,160,255,0.03)" />
                <stop offset="50%" stopColor="rgba(200,180,255,0.06)" />
                <stop offset="70%" stopColor="rgba(180,160,255,0.03)" />
                <stop offset="100%" stopColor="rgba(180,160,255,0)" />
              </linearGradient>
            </defs>

            <g clipPath="url(#circleClip)">
              {/* Night sky background */}
              <rect width="800" height="800" fill="url(#skyGradient)" />

              {/* Milky Way band */}
              <ellipse
                cx="400" cy="400"
                rx="500" ry="120"
                fill="url(#milkyWay)"
                transform="rotate(-30 400 400)"
              />

              {/* Background stars */}
              {bgStars.map((star, i) => (
                <circle
                  key={`bg-${i}`}
                  cx={star.x}
                  cy={star.y}
                  r={star.r}
                  fill="white"
                  opacity={star.opacity}
                  className="twinkle-star"
                  style={{
                    animationDuration: `${star.twinkle}s`,
                    animationDelay: `${star.delay}s`,
                  }}
                />
              ))}

              {/* Constellation lines */}
              {constellations.map((c) =>
                c.connections.map(([a, b], i) => (
                  <line
                    key={`${c.name}-line-${i}`}
                    x1={c.stars[a].x}
                    y1={c.stars[a].y}
                    x2={c.stars[b].x}
                    y2={c.stars[b].y}
                    stroke="rgba(180,200,255,0.15)"
                    strokeWidth="0.8"
                    strokeDasharray="4 3"
                    className="constellation-line"
                  />
                ))
              )}

              {/* Constellation stars (bright) */}
              {constellations.map((c) =>
                c.stars.map((star, i) => (
                  <g key={`${c.name}-star-${i}`}>
                    {/* Glow */}
                    <circle
                      cx={star.x}
                      cy={star.y}
                      r={3.5}
                      fill="rgba(200,210,255,0.5)"
                      filter="url(#brightGlow)"
                    />
                    {/* Core */}
                    <circle
                      cx={star.x}
                      cy={star.y}
                      r={1.8}
                      fill="white"
                      className="twinkle-star"
                      style={{
                        animationDuration: `${2 + Math.random() * 3}s`,
                        animationDelay: `${Math.random() * 3}s`,
                      }}
                    />
                  </g>
                ))
              )}

              {/* Constellation labels */}
              {constellations.map((c) => {
                const avgX = c.stars.reduce((s, st) => s + st.x, 0) / c.stars.length;
                const minY = Math.min(...c.stars.map((st) => st.y));
                return (
                  <text
                    key={`${c.name}-label`}
                    x={avgX}
                    y={minY - 16}
                    textAnchor="middle"
                    fill="rgba(180,200,255,0.35)"
                    fontSize="10"
                    fontFamily="'Lato', sans-serif"
                    letterSpacing="2"
                    className="constellation-label"
                  >
                    {c.name.toUpperCase()}
                  </text>
                );
              })}

              {/* Shooting stars */}
              {shootingStars.map((s, i) => (
                <line
                  key={`shoot-${i}`}
                  x1={s.x1}
                  y1={s.y1}
                  x2={s.x2}
                  y2={s.y2}
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0"
                  className="shooting-star"
                  style={{
                    animationDelay: `${s.delay}s`,
                    animationDuration: `${s.duration}s`,
                  }}
                />
              ))}

              {/* Circular border inside */}
              <circle
                cx="400" cy="400" r="384"
                fill="none"
                stroke="rgba(180,200,255,0.08)"
                strokeWidth="1"
              />
            </g>

            {/* Outer decorative ring */}
            <circle
              cx="400" cy="400" r="390"
              fill="none"
              stroke="rgba(212,168,67,0.2)"
              strokeWidth="1.5"
            />
            <circle
              cx="400" cy="400" r="395"
              fill="none"
              stroke="rgba(212,168,67,0.08)"
              strokeWidth="0.5"
            />

            {/* Compass ticks */}
            {['N', 'E', 'S', 'W'].map((dir, i) => {
              const angle = i * 90 - 90; // N at top
              const rad = (angle * Math.PI) / 180;
              const r = 395;
              const x = 400 + r * Math.cos(rad);
              const y = 400 + r * Math.sin(rad);
              return (
                <text
                  key={dir}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="rgba(212,168,67,0.5)"
                  fontSize="13"
                  fontFamily="'Lato', sans-serif"
                  fontWeight="600"
                  letterSpacing="1"
                  dy={dir === 'N' ? -14 : dir === 'S' ? 14 : 0}
                  dx={dir === 'E' ? 14 : dir === 'W' ? -14 : 0}
                >
                  {dir}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Info plaque beneath the map */}
        <motion.div
          className="starmap-plaque"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <p className="plaque-message">{STAR_MAP_MESSAGE}</p>
          <div className="plaque-details">
            <div className="plaque-item">
              <span className="plaque-icon">📅</span>
              <span>{STAR_MAP_DATE}</span>
            </div>
            <div className="plaque-divider" />
            <div className="plaque-item">
              <span className="plaque-icon">🕐</span>
              <span>{STAR_MAP_TIME}</span>
            </div>
            <div className="plaque-divider" />
            <div className="plaque-item">
              <span className="plaque-icon">📍</span>
              <span>{STAR_MAP_LOCATION}</span>
            </div>
          </div>
          <p className="plaque-coords">{STAR_MAP_COORDS}</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
