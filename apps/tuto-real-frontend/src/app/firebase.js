import { initializeApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  browserSessionPersistence,
  browserPopupRedirectResolver,
} from 'firebase/auth';
import config from './firebase.config.json';

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const auth = initializeAuth(app, {
//   persistence: browserSessionPersistence,
//   popupRedirectResolver: browserPopupRedirectResolver,
// });
// export const auth =  firebase.auth();
