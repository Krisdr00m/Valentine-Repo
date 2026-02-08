import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PhotoSlideshow.css';

// Replace these with your actual photos — drop images into src/assets/photos/
// and import them, or use URLs.
const photos = [
  {
    src: '/photos/photo1.jpg',
    caption: 'Our first adventure together',
  },
  {
    src: '/photos/photo2.jpg',
    caption: "That sunset we'll never forget",
  },
  {
    src: '/photos/photo3.jpg',
    caption: 'Laughing until it hurt',
  },
  {
    src: '/photos/photo4.jpg',
    caption: 'You & me, always',
  },
  {
    src: '/photos/photo5.jpg',
    caption: 'My favorite place is next to you',
  },
];

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 400 : -400, opacity: 0, scale: 0.9 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? -400 : 400, opacity: 0, scale: 0.9 }),
};

export default function PhotoSlideshow() {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const paginate = useCallback(
    (dir) => {
      setCurrent(([prev]) => {
        const next = (prev + dir + photos.length) % photos.length;
        return [next, dir];
      });
    },
    []
  );

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => paginate(1), 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, paginate]);

  return (
    <section className="slideshow-section" id="photos">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-label">Memories</span>
        <h2 className="section-title">Our Moments</h2>
        <p className="section-desc">A glimpse into the best days of my life</p>
      </motion.div>

      <div
        className="slideshow-container"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Prev / Next Buttons */}
        <button className="slide-btn prev" onClick={() => paginate(-1)} aria-label="Previous photo">
          ‹
        </button>
        <button className="slide-btn next" onClick={() => paginate(1)} aria-label="Next photo">
          ›
        </button>

        {/* Slide */}
        <div className="slide-wrapper">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              className="slide"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="slide-image-wrapper">
                <img
                  src={photos[current].src}
                  alt={photos[current].caption}
                  className="slide-image"
                />
              </div>
              <p className="slide-caption">{photos[current].caption}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="slide-dots">
          {photos.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent([i, i > current ? 1 : -1])}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
