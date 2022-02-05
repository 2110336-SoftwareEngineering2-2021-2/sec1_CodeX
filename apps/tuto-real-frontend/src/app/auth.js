import React, { useState, useEffect, useContext } from 'react';
// import { auth } from './firebase';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  signInWithRedirect,
  sendPasswordResetEmail,
  multiFactor,
  RecaptchaVerifier,
  GoogleAuthProvider,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
} from 'firebase/auth';
import { app, auth } from './firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

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

  // const setUpRecaptcha = () => {
  // window.recaptchaVerifier = new RecaptchaVerifier(
  //   'recaptcha'
  //   {
  //     size: 'normal',
  //     callback: (res) => {
  //       console.log('captcha solved!');
  //       sendOTP();
  //     },
  //     defaultCountry: 'TH',
  //   }
  //   auth
  // );
  // };

  const signUp = async (email, password) => {
    console.log('Sign up');
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(userCredential.user);
      })
      .then(() => {
        alert('Email verification failed');
        logOut();
      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
      });
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    await signInWithRedirect(auth, new GoogleAuthProvider())
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
      });
    setLoading(false);
  };

  const logIn = async (email, password) => {
    console.log('Sign in');
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (!userCredential.user.emailVerified) {
          alert('Email verification failed');
          logOut();
        }
      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
      });
    setLoading(false);
  };

  const logOut = async () => {
    console.log('Sign out');
    setLoading(true);
    await signOut(auth);
    setLoading(false);
  };

  const updatePassword = (password, newPassword) => {
    if (!currentUser) return;
    console.log('Update password');
    setLoading(true);
    signInWithEmailAndPassword(auth, currentUser.email, password)
      .then((userCredential) => {
        updatePassword(userCredential.user, newPassword);
        console.log(`Change password from ${password} to ${newPassword}`);
      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
      });
    setLoading(false);
  };

  const sendOTP = async (phoneNumber) => {
    // setUpRecaptcha();
    auth.settings.appVerificationDisabledForTesting = true;
    const recaptchaVerifier = new RecaptchaVerifier('recaptcha');
    multiFactor(currentUser)
      .getSession()
      .then((session) => {
        const phoneOpts = {
          phoneNumber,
          session,
        };
        const phoneAuthProvider = new PhoneAuthProvider();
        return phoneAuthProvider.verifyPhoneNumber(
          phoneOpts,
          recaptchaVerifier
        );
      });
    alert('sms text sent!');
  };

  const verifyOTP = async (code) => {
    const cred = new PhoneAuthProvider.credential(window.verificationId, code);

    const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

    // const user = auth.currentUser;
    await multiFactor(currentUser).enroll(multiFactorAssertion, 'phone number');

    alert('enrolled in MFA');
  };

  const resetPassword = async (email) => {
    console.log('Reset password');
    setLoading(true);
    await sendPasswordResetEmail(auth, email);
    setLoading(false);
  };

  const value = {
    currentUser,
    signUp,
    signInWithGoogle,
    logIn,
    logOut,
    updatePassword,
    sendOTP,
    verifyOTP,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
