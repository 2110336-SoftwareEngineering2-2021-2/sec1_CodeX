import React, { useState, useEffect, useContext } from 'react';
import { auth } from './firebase';
import * as authentication from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    authentication.onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        user.getIdToken().then((token) => {
          console.log(token);
        });
      }
    });
    return;
  }, []);

  const signUp = async (email, password) => {
    console.log('Sign up');
    setLoading(true);
    await authentication
      .createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user.getIdToken);
      })
      .then(() => {
        authentication.sendEmailVerification(auth.currentUser);
      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
      });
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    await authentication
      .signInWithRedirect(auth, new authentication.GoogleAuthProvider())
      .then((result) => {
        const credential =
          authentication.GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(token);
      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
      });
    setLoading(false);
  };

  const signIn = async (email, password) => {
    console.log('Sign in');
    setLoading(true);
    await authentication
      .signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (!userCredential.user.emailVerified) {
          alert('Email verification failed');
          signOut();
        }
      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
      });
    setLoading(false);
  };

  const signOut = async () => {
    console.log('Sign out');
    setLoading(true);
    await authentication.signOut(auth);
    setLoading(false);
  };

  const updatePassword = async (password, newPassword) => {
    if (!currentUser) return;
    console.log('Update password');
    setLoading(true);
    await authentication
      .signInWithEmailAndPassword(auth, currentUser.email, password)
      .then((userCredential) => {
        authentication.updatePassword(userCredential.user, newPassword);
        console.log(`Change password from ${password} to ${newPassword}`);
      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
      });
    setLoading(false);
  };

  const resetPassword = async (email) => {
    console.log('Reset password');
    setLoading(true);
    await authentication.sendPasswordResetEmail(auth, email);
    setLoading(false);
  };

  const value = {
    currentUser,
    signUp,
    signInWithGoogle,
    signIn,
    signOut,
    updatePassword,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
