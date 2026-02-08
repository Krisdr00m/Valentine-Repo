import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PoemsSection.css';

const poems = [
  {
    title: 'You Are My Sun',
    lines: [
      'You are the sun that lights my day,',
      'The moon that guides me on my way,',
      'The stars that sparkle in the night,',
      'My every dream, my pure delight.',
      '',
      'With every breath, I feel you near,',
      'Your voice, the sweetest sound I hear.',
      'In every heartbeat, strong and true,',
      'I find my world begins with you.',
    ],
  },
  {
    title: 'Forever Yours',
    lines: [
      'I gave you all my yesterdays,',
      'And every bright tomorrow.',
      'I gave you joy in endless ways,',
      'Through happiness and sorrow.',
      '',
      'I gave you laughter, warm and free,',
      'And gentle words to hold.',
      'I gave you all that is in me—',
      'A love that won\'t grow old.',
      '',
      'So take my hand and walk with me,',
      'Through seasons yet untold.',
      'Forever yours I choose to be,',
      'More precious than pure gold.',
    ],
  },
  {
    title: 'My Heart Knows',
    lines: [
      'My heart knew before my mind,',
      'That you were one of a kind.',
      'A glance, a smile, a gentle touch,',
      'I never knew I could love this much.',
      '',
      'The way you laugh, the way you care,',
      'The quiet moments that we share.',
      'In a crowded room, you\'re all I see—',
      'You are my forever, my destiny.',
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 30,
    transition: { duration: 0.3 },
  },
};

export default function PoemsSection() {
  const [activePoem, setActivePoem] = useState(null);

  return (
    <section className="poems-section" id="poems">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-label">Words of Love</span>
        <h2 className="section-title">Poems for You</h2>
        <p className="section-desc">Click on a poem to read it</p>
      </motion.div>

      <motion.div
        className="poems-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        transition={{ staggerChildren: 0.15 }}
      >
        {poems.map((poem, i) => (
          <motion.button
            key={i}
            className="poem-card"
            variants={cardVariants}
            whileHover={{
              scale: 1.04,
              rotate: -1,
              boxShadow: '0 20px 60px rgba(232, 86, 143, 0.15)',
            }}
            onClick={() => setActivePoem(i)}
          >
            {/* Envelope flap */}
            <div className="envelope-flap" />
            {/* Wax seal */}
            <div className="wax-seal">💌</div>
            {/* Letter paper inside */}
            <div className="letter-paper">
              <div className="letter-line-deco" />
              <h3 className="poem-card-title">{poem.title}</h3>
              <div className="letter-rule" />
              <p className="poem-preview">
                {poem.lines[0]}
                <br />
                {poem.lines[1]}
              </p>
              <span className="poem-more">— open to read —</span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {activePoem !== null && (
          <motion.div
            className="poem-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setActivePoem(null)}
          >
            <motion.div
              className="poem-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="poem-close"
                onClick={() => setActivePoem(null)}
                aria-label="Close poem"
              >
                ✕
              </button>
              <div className="poem-modal-icon">💌</div>
              <h3 className="poem-modal-title">{poems[activePoem].title}</h3>
              <div className="poem-body">
                {poems[activePoem].lines.map((line, j) => (
                  <p key={j} className={`poem-line ${line === '' ? 'poem-break' : ''}`}>
                    {line || '\u00A0'}
                  </p>
                ))}
              </div>
              <div className="poem-modal-footer">— with all my love 💕</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
