import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './HeroSection.css';

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section ref={ref} className="hero-section" id="hero">
      {/* Animated background particles */}
      <div className="hero-particles">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              y: [null, Math.random() * -200 - 100],
              x: [null, (Math.random() - 0.5) * 100],
              opacity: [null, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <motion.div className="hero-content" style={{ y: textY, opacity, scale }}>
        <motion.div
          className="hero-heart"
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ❤️
        </motion.div>
        <h1 className="hero-title">
          <span className="hero-title-line">Happy</span>
          <span className="hero-title-line accent">Valentine's</span>
          <span className="hero-title-line">Day</span>
        </h1>
        <p className="hero-subtitle">February 14, 2026</p>
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span>Scroll Down</span>
          <div className="scroll-arrow">↓</div>
        </motion.div>
      </motion.div>
    </section>
  );
}
