import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ParallaxQuote.css';

export default function ParallaxQuote({ quote, author }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const heartScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.5, 1.2, 0.5]);
  const heartRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={ref} className="parallax-quote">
      <motion.div className="quote-bg-heart" style={{ scale: heartScale, rotate: heartRotate }}>
        ♥
      </motion.div>
      <motion.div className="quote-content" style={{ y, opacity }}>
        <div className="quote-mark">"</div>
        <blockquote className="quote-text">{quote}</blockquote>
        <cite className="quote-author">— {author}</cite>
      </motion.div>
    </section>
  );
}
