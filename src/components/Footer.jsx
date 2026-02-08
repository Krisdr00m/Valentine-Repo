import { motion } from 'framer-motion';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="forever">
      <motion.div
        className="footer-content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="footer-hearts"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          💕
        </motion.div>
        <h2 className="footer-title">Forever Yours</h2>
        <p className="footer-subtitle">Happy Valentine's Day 2026</p>
        <div className="footer-divider" />
        <p className="footer-made">Made with ❤️</p>
      </motion.div>
    </footer>
  );
}
