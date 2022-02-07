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
  sendPasswordResetEmail,
  multiFactor,
  RecaptchaVerifier,
  GoogleAuthProvider,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
} from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  // Personal Info
  const [role, setRole] = useState(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

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
    console.log("User status has been changed...")
    if(currentUser) {
      client({
        method: "GET",
        url: `/user/${currentUser.email}`
      })
      .then(({data}) => {
        console.log(data)
        setRole(data[0].role)
        setFirstName(data[0].firstName)
        setLastName(data[0].lastName)
      })
      .catch((err) => {
        // alert(err.message);
        console.log(err);
      });
    } else {
      setRole(null)
      setFirstName("")
      setLastName("")
    }
  },[currentUser])

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

  const signUp = async (data) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
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
        alert('Email verification failed');
        logOut();
      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
      });
  };

  const signInWithGoogle = async () => {
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
  };

  const logIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (!userCredential.user.emailVerified) {
          alert('Email verification failed');
          logOut();
        }
      })
      .then(() => {
        console.log("Logged in...")
        // return client({
        //   method: 'GET',
        //   url: `/user/${email}`,
        // });
      })
      // .then((data) => {
      //   const res = data.data[0];
      //   return res;
      //   // return {
      //   //   firstName: res.firstName,
      //   //   lastName: res.lastName,
      //   //   role: res.role,
      //   // };
      // })
      .catch((err) => {
        // alert(err.message);
        console.log(err);
      });
  };

  const logOut = () => {
    signOut(auth);
  };

  const updatePassword = (password, newPassword) => {
    signInWithEmailAndPassword(auth, currentUser.email, password)
      .then((userCredential) => {
        updatePassword(userCredential.user, newPassword);
        console.log(`Change password from ${password} to ${newPassword}`);
      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
      });
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
    await sendPasswordResetEmail(auth, email);
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
    role,
    firstName,
    lastName
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
