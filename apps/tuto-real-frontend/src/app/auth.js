import React, { useState, useEffect, useContext } from 'react';
import { app, auth } from './firebase';
import { client } from './axiosConfig';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  signInWithRedirect,
  updatePassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
} from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  // Personal Info
  const [role, setRole] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        user.getIdToken().then((token) => {
          console.log(token);
        });
      }
    });
  }, []);

  useEffect(() => {
    console.log('User status has been changed...');
    if (currentUser) {
      client({
        method: 'GET',
        url: `/user/${currentUser.email}`,
      })
        .then(({ data }) => {
          console.log(data);
          setRole(data.role);
          setFirstName(data.firstName);
          setLastName(data.lastName);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      setRole(null);
      setFirstName('');
      setLastName('');
    }
  }, [currentUser]);

  const signUp = (data) => {
    client({
      method: 'POST',
      url: '/user/create',
      data: data,
    })
      .then(async (res) => {
        console.log(res.data);
        return await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
      })
      .then((userCredential) => {
        sendEmailVerification(userCredential.user);
      })
      .then(() => {
        alert('Next step. Please verify your email.');
        logOut();
      })
      .catch((err) => {
        alert('Email and/or citizenID already exists.');
      });
  };

  const signInWithGoogle = () => {
    signInWithRedirect(auth, new GoogleAuthProvider())
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
      });
  };

  const logIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (!userCredential.user.emailVerified) {
          alert('Email verification failed');
          logOut();
        }
      })
      .catch((err) => {
        alert('User not found.');
      });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setFirstName('');
        setLastName('');
        setRole(null);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const updateUserPassword = (password, newPassword) => {
    signInWithEmailAndPassword(auth, currentUser.email, password)
      .then((userCredential) => {
        console.log(userCredential);
        updatePassword(userCredential.user, newPassword);
      })
      .then(() => {
        console.log(`Change password from ${password} to ${newPassword}`);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email).catch((err) => {
      alert(err.message);
    });
  };

  const value = {
    currentUser,
    signUp,
    signInWithGoogle,
    logIn,
    logOut,
    updateUserPassword,
    resetPassword,
    role,
    firstName,
    lastName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
