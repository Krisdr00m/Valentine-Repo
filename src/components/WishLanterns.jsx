import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { ref, push, onValue, serverTimestamp } from 'firebase/database';
import './WishLanterns.css';

// Each lantern floats up and settles in the sky
function FloatingLantern({ wish, index, total }) {
  // Spread lanterns across the sky in a nice scattered pattern
  const randomX = useRef(15 + Math.random() * 70); // 15-85% from left
  const settleY = useRef(-(60 + Math.random() * 180)); // settle between -60px and -240px from bottom (stays in view)
  const randomSway = useRef((Math.random() - 0.5) * 50);
  const randomDelay = useRef(Math.min(index * 0.4, 3)); // stagger but cap at 3s

  return (
    <motion.div
      className="floating-lantern"
      style={{ left: `${randomX.current}%` }}
      initial={{ y: 60, opacity: 0, scale: 0.2 }}
      animate={{
        y: settleY.current,
        opacity: [0, 0.9, 1, 1],
        scale: [0.2, 1.05, 1],
        x: [0, randomSway.current * 0.5, randomSway.current],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        delay: randomDelay.current,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Gentle hover animation after settling */}
      <motion.div
        animate={{
          y: [0, -6, 0, -4, 0],
          x: [0, 3, -2, 4, 0],
        }}
        transition={{
          duration: 6 + Math.random() * 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: randomDelay.current + 4,
        }}
      >
        <div className="lantern-body">
          <div className="lantern-glow" />
          <div className="lantern-flame" />
          <div className="lantern-paper">
            <span className="lantern-wish-text">{wish.message}</span>
          </div>
          <div className="lantern-bottom" />
        </div>
        <div className="lantern-light-trail" />
      </motion.div>
    </motion.div>
  );
}

export default function WishLanterns() {
  const [wishes, setWishes] = useState([]);
  const [myWish, setMyWish] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isReleasing, setIsReleasing] = useState(false);
  const skyRef = useRef(null);

  // Listen for wishes in real-time
  useEffect(() => {
    const wishesRef = ref(db, 'wishes');
    const unsubscribe = onValue(wishesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const wishList = Object.entries(data).map(([id, val]) => ({
          id,
          ...val,
        }));
        // Sort by timestamp, newest last
        wishList.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
        setWishes(wishList);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleRelease = async () => {
    if (!myWish.trim()) return;

    setIsReleasing(true);

    // Push wish to Firebase
    const wishesRef = ref(db, 'wishes');
    await push(wishesRef, {
      message: myWish.trim(),
      timestamp: serverTimestamp(),
    });

    setMyWish('');
    setHasSubmitted(true);

    // Reset releasing animation
    setTimeout(() => setIsReleasing(false), 1500);
  };

  return (
    <section className="lanterns-section" id="lanterns">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-label">Together</span>
        <h2 className="section-title">Wish Lanterns</h2>
        <p className="section-desc">
          Write a wish or love note and release it into the sky — we'll both see them float up
          together ✨
        </p>
      </motion.div>

      {/* Sky area where lanterns float */}
      <div className="lantern-sky" ref={skyRef}>
        {/* Stars */}
        <div className="sky-stars">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Floating lanterns */}
        <AnimatePresence>
          {wishes.map((wish, i) => (
            <FloatingLantern key={wish.id} wish={wish} index={i} />
          ))}
        </AnimatePresence>

        {/* Mountain silhouette at bottom */}
        <div className="sky-horizon" />
      </div>

      {/* Input area */}
      <motion.div
        className="lantern-input-area"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="input-wrapper">
          <textarea
            className="wish-input"
            placeholder="Write your wish or love note..."
            value={myWish}
            onChange={(e) => setMyWish(e.target.value)}
            maxLength={120}
            rows={2}
          />
          <div className="wish-char-count">{myWish.length}/120</div>
        </div>

        <motion.button
          className={`release-btn ${isReleasing ? 'releasing' : ''}`}
          onClick={handleRelease}
          disabled={!myWish.trim() || isReleasing}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isReleasing ? (
            <span className="release-btn-text">Releasing... 🏮</span>
          ) : (
            <span className="release-btn-text">Release a Lantern 🏮</span>
          )}
        </motion.button>

        {hasSubmitted && (
          <motion.p
            className="wish-confirmation"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Your lantern is floating into the sky! Release another wish anytime 💫
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
