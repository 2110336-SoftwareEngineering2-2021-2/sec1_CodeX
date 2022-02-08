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
          setRole(data[0].role);
          setFirstName(data[0].firstName);
          setLastName(data[0].lastName);
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
      url: '/user/unique',
      data: {
        citizenID: data.citizenID,
      },
    })
      .then(async (result) => {
        if (!result.data) throw new Error('Duplicate citizenID');
        try {
          return await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
          );
        } catch (err) {
          throw new Error('Email already in use');
        }
      })
      .then((userCredential) => {
        sendEmailVerification(userCredential.user);
      })
      .then(() => {
        client({
          method: 'POST',
          url: '/user/create',
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            email: data.email,
            birthDate: data.birthDate,
            address: data.address,
            citizenID: data.citizenID,
          },
        });
      })
      .then(() => {
        alert('Next step. Please verify your email.');
        logOut();
      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
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
        alert('User not found');
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
