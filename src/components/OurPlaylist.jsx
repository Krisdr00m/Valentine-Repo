import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { ref, push, onValue, serverTimestamp } from 'firebase/database';
import './OurPlaylist.css';

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function OurPlaylist() {
  const [songs, setSongs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [songName, setSongName] = useState('');
  const [artist, setArtist] = useState('');
  const [note, setNote] = useState('');
  const [addedBy, setAddedBy] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Listen for songs in real-time
  useEffect(() => {
    const songsRef = ref(db, 'playlist');
    const unsubscribe = onValue(songsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const songList = Object.entries(data).map(([id, val]) => ({
          id,
          ...val,
        }));
        songList.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
        setSongs(songList);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAddSong = async () => {
    if (!songName.trim() || !artist.trim()) return;

    setIsAdding(true);

    const songsRef = ref(db, 'playlist');
    await push(songsRef, {
      songName: songName.trim(),
      artist: artist.trim(),
      note: note.trim(),
      addedBy: addedBy.trim() || '💕',
      timestamp: serverTimestamp(),
    });

    setSongName('');
    setArtist('');
    setNote('');
    setAddedBy('');
    setIsAdding(false);
    setShowForm(false);
  };

  // Assign a color accent to each song for variety
  const accents = [
    { bg: 'rgba(232, 86, 143, 0.08)', border: 'rgba(232, 86, 143, 0.25)', vinyl: '#E8568F' },
    { bg: 'rgba(212, 168, 67, 0.08)', border: 'rgba(212, 168, 67, 0.25)', vinyl: '#D4A843' },
    { bg: 'rgba(160, 100, 220, 0.08)', border: 'rgba(160, 100, 220, 0.25)', vinyl: '#A064DC' },
    { bg: 'rgba(100, 200, 180, 0.08)', border: 'rgba(100, 200, 180, 0.25)', vinyl: '#64C8B4' },
    { bg: 'rgba(240, 140, 100, 0.08)', border: 'rgba(240, 140, 100, 0.25)', vinyl: '#F08C64' },
  ];

  return (
    <section className="playlist-section" id="playlist">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-label">Our Songs</span>
        <h2 className="section-title">Our Playlist</h2>
        <p className="section-desc">
          The songs that tell our story — add yours and build our playlist together 🎵
        </p>
      </motion.div>

      {/* Song Cards */}
      {songs.length > 0 && (
        <motion.div
          className="playlist-grid"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {songs.map((song, i) => {
            const accent = accents[i % accents.length];
            return (
              <motion.div
                key={song.id}
                className="song-card"
                variants={cardItem}
                style={{
                  background: accent.bg,
                  borderColor: accent.border,
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: `0 15px 40px ${accent.border}`,
                }}
              >
                {/* Vinyl record icon */}
                <div className="vinyl-record" style={{ '--vinyl-color': accent.vinyl }}>
                  <div className="vinyl-grooves" />
                  <div className="vinyl-label">
                    <span>♪</span>
                  </div>
                  <motion.div
                    className="vinyl-spin"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  />
                </div>

                <div className="song-info">
                  <h3 className="song-name">{song.songName}</h3>
                  <p className="song-artist">{song.artist}</p>
                  {song.note && <p className="song-note">"{song.note}"</p>}
                  <span className="song-added-by">added by {song.addedBy}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Empty state */}
      {songs.length === 0 && (
        <motion.div
          className="playlist-empty"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="empty-icon">🎶</span>
          <p>No songs yet — be the first to add one!</p>
        </motion.div>
      )}

      {/* Add Song Button / Form */}
      <div className="playlist-add-area">
        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.button
              key="add-btn"
              className="add-song-btn"
              onClick={() => setShowForm(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              + Add a Song
            </motion.button>
          ) : (
            <motion.div
              key="form"
              className="add-song-form"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <input
                type="text"
                className="form-input"
                placeholder="Song name *"
                value={songName}
                onChange={(e) => setSongName(e.target.value)}
                maxLength={80}
              />
              <input
                type="text"
                className="form-input"
                placeholder="Artist *"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                maxLength={60}
              />
              <input
                type="text"
                className="form-input"
                placeholder="Why is this song special? (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={100}
              />
              <input
                type="text"
                className="form-input"
                placeholder="Your name"
                value={addedBy}
                onChange={(e) => setAddedBy(e.target.value)}
                maxLength={20}
              />

              <div className="form-buttons">
                <motion.button
                  className="form-submit"
                  onClick={handleAddSong}
                  disabled={!songName.trim() || !artist.trim() || isAdding}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isAdding ? 'Adding...' : '🎵 Add to Playlist'}
                </motion.button>
                <button
                  className="form-cancel"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
