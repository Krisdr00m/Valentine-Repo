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
const STAR_MAP_DATE = 'November 20, 2025';
const STAR_MAP_TIME = '9:00 PM';
const STAR_MAP_LOCATION = 'Our Sky';
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
    meaning: 'The Queen — symbolizes confidence and beauty',
    stars: [
      { x: 280, y: 80 },
      { x: 315, y: 50 },
      { x: 350, y: 75 },
      { x: 385, y: 45 },
      { x: 420, y: 80 },
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
  {
    name: 'Andromeda',
    meaning: 'The Princess — rescued by love, symbolizes being saved by love',
    stars: [
      { x: 440, y: 160 },
      { x: 395, y: 190 },
      { x: 345, y: 210 },
      { x: 380, y: 230 },
    ],
    connections: [[0, 1], [1, 2], [1, 3]],
  },
  {
    name: 'Perseus',
    meaning: 'The Hero — symbolizes courage, devotion, and fighting for love',
    stars: [
      { x: 240, y: 170 },
      { x: 220, y: 210 },
      { x: 255, y: 240 },
      { x: 200, y: 260 },
      { x: 265, y: 290 },
      { x: 230, y: 310 },
    ],
    connections: [[0, 1], [0, 2], [1, 3], [2, 4], [4, 5]],
  },
  {
    name: 'Taurus',
    meaning: 'The Bull — symbolizes passion and pursuit',
    stars: [
      { x: 130, y: 370 },
      { x: 155, y: 350 },
      { x: 170, y: 380 },
      { x: 110, y: 340 },
      { x: 190, y: 330 },
      { x: 145, y: 395 },
    ],
    connections: [[0, 1], [0, 2], [1, 4], [0, 5], [1, 3]],
  },
  {
    name: 'Pegasus',
    meaning: 'The Winged Horse — symbolizes freedom, inspiration, and soaring together',
    stars: [
      { x: 530, y: 220 },
      { x: 620, y: 210 },
      { x: 625, y: 310 },
      { x: 535, y: 320 },
      { x: 580, y: 370 },
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4]],
  },
  {
    name: 'Aries',
    meaning: 'The Ram — symbolizes new beginnings and boldness',
    stars: [
      { x: 340, y: 320 },
      { x: 370, y: 340 },
      { x: 395, y: 350 },
    ],
    connections: [[0, 1], [1, 2]],
  },
  {
    name: 'Ursa Major',
    meaning: 'The Great Bear — symbolizes guidance, steadiness, and always being there',
    stars: [
      { x: 600, y: 480 },
      { x: 640, y: 460 },
      { x: 675, y: 490 },
      { x: 665, y: 530 },
      { x: 620, y: 535 },
      { x: 580, y: 560 },
      { x: 550, y: 590 },
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [4, 5], [5, 6]],
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

        {/* Constellation Meanings */}
        <motion.div
          className="starmap-legend"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h3 className="legend-title">What the Stars Mean</h3>
          <div className="legend-grid">
            {constellations.map((c, i) => (
              <motion.div
                key={c.name}
                className="legend-item"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
              >
                <span className="legend-name">✦ {c.name}</span>
                <span className="legend-meaning">{c.meaning}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
