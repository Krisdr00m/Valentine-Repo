import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HorizontalIntro.css';

const slides = [
  {
    id: 1,
    emoji: '💌',
    title: 'A Letter',
    subtitle: 'Written in the stars',
  },
  {
    id: 2,
    emoji: '🌹',
    title: 'A Rose',
    subtitle: 'For someone special',
  },
  {
    id: 3,
    emoji: '💕',
    title: 'Two Hearts',
    subtitle: 'Beating as one',
  },
  {
    id: 4,
    emoji: '✨',
    title: 'A Spark',
    subtitle: 'That became a flame',
  },
  {
    id: 5,
    emoji: '💝',
    title: 'Happy',
    subtitle: "Valentine's Day",
  },
];

const FloatingHeart = ({ delay, left, size, duration }) => (
  <motion.div
    className="floating-heart"
    initial={{ y: '110vh', opacity: 0, rotate: 0 }}
    animate={{ y: '-10vh', opacity: [0, 1, 1, 0], rotate: 360 }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: 'linear',
    }}
    style={{ left: `${left}%`, fontSize: `${size}rem` }}
  >
    ♥
  </motion.div>
);

export default function HorizontalIntro({ onComplete }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentSlide < slides.length - 1) {
      const timer = setTimeout(() => {
        setCurrentSlide((prev) => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsComplete(true);
        setTimeout(onComplete, 800);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, onComplete]);

  // Generate random hearts
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    delay: Math.random() * 5,
    left: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    duration: Math.random() * 4 + 4,
  }));

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="horizontal-intro"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Floating hearts background */}
          <div className="hearts-bg">
            {hearts.map((heart, i) => (
              <FloatingHeart key={i} {...heart} />
            ))}
          </div>

          {/* Progress bar */}
          <div className="intro-progress">
            <motion.div
              className="intro-progress-bar"
              initial={{ width: '0%' }}
              animate={{
                width: `${((currentSlide + 1) / slides.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          {/* Slide content */}
          <div className="slide-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[currentSlide].id}
                className="slide"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div
                  className="slide-emoji"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2,
                  }}
                >
                  {slides[currentSlide].emoji}
                </motion.div>
                <motion.h1
                  className="slide-title"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {slides[currentSlide].title}
                </motion.h1>
                <motion.p
                  className="slide-subtitle"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          <div className="slide-dots">
            {slides.map((_, i) => (
              <motion.div
                key={i}
                className={`dot ${i === currentSlide ? 'active' : ''}`}
                animate={{
                  scale: i === currentSlide ? 1.3 : 1,
                  backgroundColor:
                    i === currentSlide ? '#E8568F' : 'rgba(255,255,255,0.3)',
                }}
              />
            ))}
          </div>

          {/* Skip button */}
          <motion.button
            className="skip-btn"
            onClick={() => {
              setIsComplete(true);
              setTimeout(onComplete, 100);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Skip →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
