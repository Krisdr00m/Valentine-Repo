import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// ⚠️  Replace with YOUR Firebase project config!
// 1. Go to https://console.firebase.google.com
// 2. Create a new project (disable Google Analytics if you want)
// 3. Go to Project Settings → General → Your apps → Add web app
// 4. Copy the firebaseConfig object and paste it below
// 5. Then go to Realtime Database → Create Database → Start in TEST mode

const firebaseConfig = {
  apiKey: "AIzaSyBXqhZ0c0nsWJv1SsHNUlYiHBsA6ZB-Qm0",
  authDomain: "valentine-day-proj.firebaseapp.com",
  databaseURL: "https://valentine-day-proj-default-rtdb.firebaseio.com/",
  projectId: "valentine-day-proj",
  storageBucket: "valentine-day-proj.firebasestorage.app",
  messagingSenderId: "323390051977",
  appId: "1:323390051977:web:b2c6de2c363016ed669858",
  measurementId: "G-KXRTMRCDR1"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
