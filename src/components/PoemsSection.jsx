import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PoemsSection.css';

const poems = [
  {
    title: 'Dearest Gentle Reader',
    lines: [
      'Dearest Gentle Reader,',
      '',
      'In this season where spring feels quiet and bare,',
      'There\'s a soul somewhere still keeping its promise alive.',
      'Like the sweet nectar of some forbidden fruit,',
      'You are so kind, so soft, so beautifully bright.',
      '',
      'While I search for answers and wrestle with doubt,',
      'You arrive with warmth, with laughter, with light.',
      'In a season where love sends me into a frenzy,',
      'You appear — a diamond, unexpected and plenty.',
      '',
      'My heart feels fuller whenever you\'re near,',
      'Almost more than it knows what to do with.',
      'So to the highlight of this season — thank you',
      'For helping spring remember how to bloom',
    ],
  },
  {
    title: 'A Quiet Pull',
    lines: [
      'Yearning was always a feeling that escaped me,',
      'Like a space in my heart I never noticed was there.',
      'But somehow, knowing you awakened it —',
      'A quiet pull I didn\'t know I could feel.',
      '',
      'Your energy lights something steady inside me,',
      'Your smile lingers long after it\'s gone.',
      'Hearing your voice, feeling your presence,',
      'Brings a calm that feels both new and familiar.',
      '',
      'Getting to know you feels like meeting',
      'A part of myself I hadn\'t found yet.',
      'Even with distance, you remain on my mind',
      'Like thunder rolling gently through a storm.',
      '',
      'Thank you for becoming a new kind of normal —',
      'One I didn\'t know I was hoping for',
    ],
  },
  {
    title: 'Where Time Stands Still',
    lines: [
      'They say life is a journey we\'re meant to follow,',
      'Always moving, always becoming something new.',
      'But some moments make time stand still —',
      'And those are the ones I find with you.',
      '',
      'Like a moth drawn softly toward its flame,',
      'I find myself returning, again and again.',
      'Time with you feels sweet and effortless,',
      'While time apart carries a quiet ache.',
      '',
      'Every moment we share, I hold with care,',
      'Grateful for the space you occupy in my life.',
      'For now, for what\'s ahead, and for all that\'s been —',
      'I\'m thankful our paths chose to come here',
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
              className="poem-modal-wrapper"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Burned edges — pinned to the non-scrolling wrapper */}
              <div className="burned-edge burned-edge-top" />
              <div className="burned-edge burned-edge-bottom" />
              <div className="burned-edge burned-edge-left" />
              <div className="burned-edge burned-edge-right" />
              {/* Corner burn marks */}
              <div className="burn-corner burn-tl" />
              <div className="burn-corner burn-tr" />
              <div className="burn-corner burn-bl" />
              <div className="burn-corner burn-br" />
              {/* Vignette overlay that stays on edges */}
              <div className="aged-vignette" />

              {/* Scrollable inner content */}
              <div className="poem-modal">
                <button
                  className="poem-close"
                  onClick={() => setActivePoem(null)}
                  aria-label="Close poem"
                >
                  ✕
                </button>
                <div className="poem-modal-icon">💌</div>
                <h3 className="poem-modal-title">{poems[activePoem].title}</h3>
                <div className="letter-divider" />
                <div className="poem-body">
                  {poems[activePoem].lines.map((line, j) => (
                    <p key={j} className={`poem-line ${line === '' ? 'poem-break' : ''}`}>
                      {line || '\u00A0'}
                    </p>
                  ))}
                </div>
                <div className="letter-divider" />
                <div className="poem-modal-footer">— with all my love 💕</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
