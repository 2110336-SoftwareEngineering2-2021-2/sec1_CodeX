import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA39GIZIsJlPbM61vFOFEVJU5k_PsaH8XY',
  authDomain: 'codex-41a45.firebaseapp.com',
  projectId: 'codex-41a45',
  storageBucket: 'codex-41a45.appspot.com',
  messagingSenderId: '139793828403',
  appId: '1:139793828403:web:1d4a6adb754eb2fce13146',
  measurementId: 'G-DDXXEQZ2QR',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
