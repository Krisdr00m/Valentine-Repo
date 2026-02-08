import { motion } from 'framer-motion';
import './LetterSection.css';

export default function LetterSection() {
  return (
    <section className="letter-section" id="letter">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-label">From My Heart</span>
        <h2 className="section-title">A Love Letter</h2>
      </motion.div>

      <motion.div
        className="letter-container"
        initial={{ opacity: 0, y: 60, rotateX: 10 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="letter-seal">💌</div>
        <div className="letter-content">
          <p className="letter-greeting">My Dearest,</p>
          <p>
            Words could never fully capture what you mean to me, but I'll try.
            From the very first moment, you've been the melody in my silence
            and the light in my darkest days.
          </p>
          <p>
            Every day with you is a gift I never take for granted. Your love
            has shown me what it means to truly live — to laugh until it hurts,
            to dream without limits, and to love without conditions.
          </p>
          <p>
            You are my best friend, my greatest adventure, and my forever
            Valentine. I promise to cherish every moment, hold you through
            every storm, and love you more with each passing day.
          </p>
          <p className="letter-closing">
            Forever & Always,<br />
            <span className="letter-signature">With All My Love ❤️</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
