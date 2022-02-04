import React from 'react';
import { useAuth } from '../auth';
const HomePage = () => {
  const {
    currentUser,
    signUp,
    signInWithGoogle,
    signIn,
    signOut,
    updatePassword,
    resetPassword,
  } = useAuth();
  const email = 'venel94370@mannawo.com';
  const password = '000000';
  return (
    <>
      <h5>User: {currentUser?.email}</h5>
      {currentUser ? (
        <span>
          <button onClick={() => updatePassword(password, '000000')}>
            Update Password
          </button>
          <button onClick={() => signOut()}>Sign Out</button>
        </span>
      ) : (
        <span>
          <button onClick={() => signUp(email, password)}>Sign Up</button>
          <button onClick={() => signInWithGoogle()}>
            Sign In with Google
          </button>
          <button onClick={() => signIn(email, password)}>Sign In</button>
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
