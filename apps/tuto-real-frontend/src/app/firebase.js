import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
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

firebase.initializeApp(firebaseConfig);
export default firebase;
export const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
