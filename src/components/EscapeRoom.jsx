import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './EscapeRoom.css';

/*
  ╔══════════════════════════════════════════════════╗
  ║  CUSTOMISE THESE PUZZLES FOR YOUR RELATIONSHIP!  ║
  ╚══════════════════════════════════════════════════╝
  
  Each puzzle has:
  - title, description, hint
  - answer (lowercase, trimmed — that's what the input is compared to)
  - emoji for the lock icon
  
  Change the questions, answers, and hints to things
  only she would know about your relationship!
*/

const puzzles = [
  {
    emoji: '💭',
    title: 'The Beginning',
    description: 'What month and year did we first meet?',
    hint: 'Think back to when it all started... format: month year',
    answer: 'january 2024',
    successMessage: 'That was the day everything changed 💕',
  },
  {
    emoji: '🗺️',
    title: 'Our Special Place',
    description: 'Unscramble this word — it\'s the place of our first date:',
    scrambled: 'RAKP',
    hint: 'We spent the whole afternoon here, surrounded by nature 🌿',
    answer: 'park',
    successMessage: 'I knew right then you were special ✨',
  },
  {
    emoji: '🔢',
    title: 'Crack the Code',
    description: 'Solve this: Take the day of my birthday, multiply by 2, and subtract 5. What do you get?',
    hint: 'My birthday is on the 15th... do the math 🧮',
    answer: '25',
    successMessage: 'You really do know me 🥰',
  },
  {
    emoji: '💝',
    title: 'The Final Key',
    description: 'Complete this sentence: You are my ________',
    hint: 'It\'s something that shines in the sky at night... ⭐',
    answer: 'star',
    successMessage: 'You unlocked my heart 💖',
  },
];

// The secret message revealed after all puzzles are solved
const SECRET_MESSAGE = `My Dearest Love,

If you're reading this, it means you've unlocked every piece of my heart.

Every puzzle you just solved is a memory I hold close — the day we met, our favorite place, the little things only we know. You are the answer to every question my heart has ever asked.

I love you more than words on a screen could ever say. But I hope this made you smile, even just a little.

Forever & Always,
Yours 💕`;

const lockVariants = {
  locked: { scale: 1 },
  unlocked: {
    scale: [1, 1.2, 1],
    rotate: [0, -10, 10, 0],
    transition: { duration: 0.6 },
  },
};

export default function EscapeRoom() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [solvedPuzzles, setSolvedPuzzles] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [justSolved, setJustSolved] = useState(false);
  const [allSolved, setAllSolved] = useState(false);
  const inputRef = useRef(null);

  const puzzle = puzzles[currentPuzzle];

  const handleSubmit = () => {
    const trimmed = userInput.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === puzzle.answer) {
      // Correct!
      setJustSolved(true);
      setIsWrong(false);
      setShowHint(false);
      const newSolved = [...solvedPuzzles, currentPuzzle];
      setSolvedPuzzles(newSolved);

      setTimeout(() => {
        if (newSolved.length === puzzles.length) {
          // All puzzles solved!
          setAllSolved(true);
        } else {
          setCurrentPuzzle(currentPuzzle + 1);
          setJustSolved(false);
          setUserInput('');
        }
      }, 2000);
    } else {
      // Wrong answer — shake
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 600);
    }
  };

  return (
    <section className="escape-section" id="escape">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-label">A Challenge</span>
        <h2 className="section-title">Unlock My Heart</h2>
        <p className="section-desc">
          Solve each puzzle to unlock the next — a secret message awaits at the end 🔐
        </p>
      </motion.div>

      {/* Progress Locks */}
      <div className="escape-locks">
        {puzzles.map((p, i) => {
          const isSolved = solvedPuzzles.includes(i);
          const isCurrent = i === currentPuzzle && !allSolved;
          return (
            <motion.div
              key={i}
              className={`lock-item ${isSolved ? 'solved' : ''} ${isCurrent ? 'current' : ''}`}
              variants={lockVariants}
              animate={isSolved ? 'unlocked' : 'locked'}
            >
              <div className="lock-icon">
                {isSolved ? '🔓' : isCurrent ? p.emoji : '🔒'}
              </div>
              <div className="lock-line" />
            </motion.div>
          );
        })}
        <div className={`lock-item final ${allSolved ? 'solved' : ''}`}>
          <div className="lock-icon">{allSolved ? '💌' : '❓'}</div>
        </div>
      </div>

      {/* Puzzle Area */}
      <div className="escape-content">
        <AnimatePresence mode="wait">
          {!allSolved ? (
            <motion.div
              key={`puzzle-${currentPuzzle}`}
              className="puzzle-card"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="puzzle-number">
                Puzzle {currentPuzzle + 1} of {puzzles.length}
              </div>

              <div className="puzzle-emoji">{puzzle.emoji}</div>
              <h3 className="puzzle-title">{puzzle.title}</h3>
              <p className="puzzle-description">{puzzle.description}</p>

              {/* Show scrambled word if present */}
              {puzzle.scrambled && (
                <div className="puzzle-scrambled">
                  {puzzle.scrambled.split('').map((letter, i) => (
                    <motion.span
                      key={i}
                      className="scramble-letter"
                      initial={{ opacity: 0, y: -20, rotate: Math.random() * 30 - 15 }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              )}

              {/* Just solved state */}
              {justSolved ? (
                <motion.div
                  className="puzzle-success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="success-check">✓</span>
                  <p>{puzzle.successMessage}</p>
                </motion.div>
              ) : (
                <>
                  {/* Input */}
                  <motion.div
                    className={`puzzle-input-wrapper ${isWrong ? 'shake' : ''}`}
                    animate={isWrong ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      className="puzzle-input"
                      placeholder="Type your answer..."
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                    <motion.button
                      className="puzzle-submit"
                      onClick={handleSubmit}
                      disabled={!userInput.trim()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Check
                    </motion.button>
                  </motion.div>

                  {isWrong && (
                    <motion.p
                      className="wrong-answer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Not quite... try again! 💭
                    </motion.p>
                  )}

                  {/* Hint */}
                  <button
                    className="hint-toggle"
                    onClick={() => setShowHint(!showHint)}
                  >
                    {showHint ? 'Hide hint' : 'Need a hint? 👀'}
                  </button>

                  <AnimatePresence>
                    {showHint && (
                      <motion.p
                        className="hint-text"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        💡 {puzzle.hint}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </>
              )}
            </motion.div>
          ) : (
            /* ═══ SECRET MESSAGE REVEAL ═══ */
            <motion.div
              key="secret-reveal"
              className="secret-reveal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Confetti burst */}
              <div className="confetti-container">
                {Array.from({ length: 30 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="confetti-piece"
                    style={{
                      left: `${Math.random() * 100}%`,
                      background: ['#E8568F', '#D4A843', '#F4A3C8', '#C41E56', '#FDE4EF'][i % 5],
                      width: `${6 + Math.random() * 6}px`,
                      height: `${6 + Math.random() * 6}px`,
                    }}
                    initial={{ y: -20, opacity: 1, rotate: 0 }}
                    animate={{
                      y: 400 + Math.random() * 200,
                      opacity: [1, 1, 0],
                      rotate: Math.random() * 720 - 360,
                      x: (Math.random() - 0.5) * 200,
                    }}
                    transition={{
                      duration: 2.5 + Math.random(),
                      delay: Math.random() * 0.5,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </div>

              <motion.div
                className="secret-icon"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                💌
              </motion.div>
              <h3 className="secret-title">You Did It!</h3>
              <p className="secret-subtitle">You unlocked my heart — here is your secret message:</p>

              <motion.div
                className="secret-letter"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {SECRET_MESSAGE.split('\n').map((line, i) => (
                  <motion.p
                    key={i}
                    className={`secret-line ${line === '' ? 'secret-break' : ''}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                  >
                    {line || '\u00A0'}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
