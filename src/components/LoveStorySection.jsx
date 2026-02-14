import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './LoveStorySection.css';

const milestones = [
  {
    emoji: '👀',
    title: 'First Glance',
    description: 'The moment our eyes met, time stood still. A glance that spoke a thousand words.',
  },
  {
    emoji: '📱',
    title: 'Reconnecting Call',
    description: 'You called me n the cruise and from then a spark rekindled.',
  },
  {
    emoji: '💑',
    title: 'Falling for each other',
    description: 'Every day brought us closer. We started talking more often and havent stopped since.',
  },
  {
    emoji: '🏠',
    title: 'Building Together',
    description: 'Creating a world of our own, one memory at a time.',
  },
];

export default function LoveStorySection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section ref={containerRef} className="love-story-section" id="story">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-label">Our Journey</span>
        <h2 className="section-title">A Love Story</h2>
        <p className="section-desc">Every love story is beautiful, but ours is my favorite</p>
      </motion.div>

      <div className="timeline">
        <div className="timeline-line">
          <motion.div className="timeline-line-fill" style={{ height: lineHeight }} />
        </div>
        {milestones.map((milestone, i) => (
          <motion.div
            key={i}
            className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="timeline-dot">
              <span>{milestone.emoji}</span>
            </div>
            <div className="timeline-card">
              <h3>{milestone.title}</h3>
              <p>{milestone.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
