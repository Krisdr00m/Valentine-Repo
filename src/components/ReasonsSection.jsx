import { motion } from 'framer-motion';
import './ReasonsSection.css';

const reasons = [
  { emoji: '😊', reason: 'Your smile lights up any room' },
  { emoji: '🤗', reason: 'The way you make everyone feel welcome' },
  { emoji: '💪', reason: 'Your strength through every challenge' },
  { emoji: '😂', reason: 'Your laugh is absolutely contagious' },
  { emoji: '🧡', reason: 'Your kindness knows no bounds' },
  { emoji: '🌟', reason: 'You make ordinary moments extraordinary' },
  { emoji: '🎵', reason: 'The way you hum your favorite songs' },
  { emoji: '🫶', reason: 'You love with your whole heart' },
  { emoji: '✨', reason: 'You inspire me to be better every day' },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ReasonsSection() {
  return (
    <section className="reasons-section" id="reasons">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-label">Why You</span>
        <h2 className="section-title">Reasons I Love You</h2>
        <p className="section-desc">Just a few of the infinite reasons</p>
      </motion.div>

      <motion.div
        className="reasons-grid"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            className="reason-card"
            variants={item}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 60px rgba(232, 86, 143, 0.15)',
            }}
          >
            <div className="reason-emoji">{r.emoji}</div>
            <p className="reason-text">{r.reason}</p>
            <div className="reason-number">#{i + 1}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
