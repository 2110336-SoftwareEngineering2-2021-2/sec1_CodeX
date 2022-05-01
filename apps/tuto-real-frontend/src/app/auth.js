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
    if (user && auth.currentUser) {
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
          if (data.isBan) {
            const date = new Date(data.unbanDate).toUTCString();
            logOut();
            alert(`Your account has been banned until ${date}.`);
          }
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
    console.log('first');
    client({
      method: 'POST',
      url: '/user/create',
      data: data,
    })
      .then(async ({ data }) => {
        console.log(data);
        // throw new Error(res.data.data);
        if (!data.success) throw new Error(data.data);
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
        console.log(err);
        let msg = 'Something went wrong';
        if (err.message.includes('email')) msg = 'Email already existed.';
        else if (err.message.includes('citizenID'))
          msg = 'CitizenID already existed.';
        alert(msg);
        if (onError) onError();
      });
  }

  const logIn = (email, password, onSuccess) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (!userCredential.user.emailVerified) {
          logOut();
          alert('Please verify your email.');
        } else {
          if (onSuccess) onSuccess();
        }
      })
      .catch((err) => {
        alert(err.message);
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
