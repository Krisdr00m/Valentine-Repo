import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ScrollSection.css';

export default function ScrollSection({
  children,
  className = '',
  bgColor,
  sticky = false,
  height = '100vh',
  id,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [80, 0, 0, -80]);

  return (
    <section
      ref={ref}
      className={`scroll-section ${className}`}
      id={id}
      style={{
        minHeight: height,
        backgroundColor: bgColor,
        position: sticky ? 'sticky' : 'relative',
        top: sticky ? 0 : 'auto',
      }}
    >
      <motion.div className="scroll-section-inner" style={{ opacity, scale, y }}>
        {children}
      </motion.div>
    </section>
  );
}
