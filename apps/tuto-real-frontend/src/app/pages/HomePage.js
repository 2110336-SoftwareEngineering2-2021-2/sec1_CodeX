import React from 'react';
import { useAuth } from '../auth';
const HomePage = () => {
  const {
    currentUser,
    signUp,
    signInWithGoogle,
    logIn,
    logOut,
    updatePassword,
    sendOTP,
    verifyOTP,
    resetPassword,
  } = useAuth();
  const email = 'venel94370@mannawo.com';
  const password = '000000';
  const phoneNumber = '+10958612142';
  const code = '123456';
  return (
    <>
      <h5>User: {currentUser?.email}</h5>
      <div id="recaptcha"></div>
      {currentUser ? (
        <span>
          <button onClick={() => updatePassword(password, '000000')}>
            Update Password
          </button>
          <button onClick={() => sendOTP(phoneNumber)}>Send OTP</button>
          <button onClick={() => verifyOTP(code)}>Verify OTP</button>
          <button onClick={() => logOut()}>Sign Out</button>
        </span>
      ) : (
        <span>
          <button onClick={() => signUp(email, password)}>Sign Up</button>
          <button onClick={() => signInWithGoogle()}>
            Sign In with Google
          </button>

          <button onClick={() => logIn(email, password)}>Sign In</button>
          <button onClick={() => resetPassword(email)}>Reset Password</button>
        </span>
      )}

      <p>This is USER Home page</p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut,
        repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit
        eaque?
      </p>
    </>
  );
};

export default HomePage;
