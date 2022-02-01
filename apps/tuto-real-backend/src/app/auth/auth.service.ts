import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import * as auth from 'firebase/auth';

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
const authentication = auth.getAuth(app);

@Injectable()
export class AuthService {
  getAll() {
    return 'Test';
  }

  async signUp(email: string, password: string) {
    auth
      .createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(`Signed Up as ${user.email} with ID: ${user.uid}`);
        return user.getIdToken().then((token) => {
          console.log(`Token: ${token}`);
          return token;
        });
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  }

  async signIn(email: string, password: string) {
    auth
      .signInWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(`Logged in as ${user.email} with ID: ${user.uid}`);
        return user.getIdToken().then((token) => {
          console.log(`Token: ${token}`);
          return token;
        });
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  }

  signOut() {
    auth.signOut(authentication).catch((error) => {
      console.log(error.code, error.message);
    });
    return true;
  }
}
