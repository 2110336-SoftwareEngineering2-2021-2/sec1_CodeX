import React, { useState, useEffect, useContext } from 'react';
import { auth } from './firebase';
import { client } from './axiosConfig';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  updatePassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [reset, setReset] = useState(false);
  // Personal Info
  const [_id, setId] = useState('');
  const [role, setRole] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    console.log('User status has been changed...');
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    setUserData(currentUser);
    setReset(false);
  }, [currentUser, reset]);

  const setUserData = async (user) => {
    if (user) {
      const token = await user.getIdToken(true);
      console.log(token);
      localStorage.setItem('token', token);
      client({
        method: 'GET',
        url: `/user?email=${user.email}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(({ data: { data } }) => {
          setId(data._id);
          setRole(data.role);
          setFirstName(data.firstName);
          setLastName(data.lastName);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      setId('');
      setRole(null);
      setFirstName('');
      setLastName('');
      localStorage.setItem('token', '');
    }
  };

  const signUp = (data, onSuccess, onError) => {
    client({
      method: 'POST',
      url: '/user/create',
      data: data,
    })
      .then(async (res) => {
        if (!res.data.success) throw new Error(res.data.data);
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
        if (onSuccess) logOut(onSuccess);
        else logOut();
      })
      .catch((err) => {
        console.log(err.message);
        let msg = 'Please complete the information.';
        if (err.message.includes('email')) msg = 'Email already existed.';
        else if (err.message.includes('citizenID'))
          msg = 'CitizenID already existed.';
        alert(msg);
        if (onError) onError();
      });
  };

  const logIn = (email, password, onSuccess) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (!userCredential.user.emailVerified) {
          alert('Email verification failed');
          logOut();
        } else {
          if (onSuccess) onSuccess();
        }
      })
      .catch((err) => {
        alert('User not found.');
      });
  };

  const logOut = (onSuccess) => {
    signOut(auth)
      .then(() => {
        setId('');
        setFirstName('');
        setLastName('');
        setRole(null);
        if (onSuccess) onSuccess();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const updateUserPassword = async (password, newPassword, onSuccess) => {
    await signInWithEmailAndPassword(auth, currentUser.email, password)
      .then((userCredential) => {
        updatePassword(userCredential.user, newPassword);
      })
      .then(() => {
        console.log(`Change password from ${password} to ${newPassword}`);
        if (onSuccess) onSuccess();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const resetPassword = (email, onSuccess) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        if (onSuccess) onSuccess();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const value = {
    currentUser,
    signUp,
    logIn,
    logOut,
    updateUserPassword,
    resetPassword,
    _id,
    role,
    firstName,
    lastName,
    setReset,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
