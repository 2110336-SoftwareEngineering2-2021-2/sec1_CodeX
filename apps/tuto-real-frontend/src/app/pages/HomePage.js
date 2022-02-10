import React from 'react';
import { useAuth } from '../auth';
const HomePage = () => {
  const {
    currentUser,
    signUp,
    signInWithGoogle,
    logIn,
    logOut,
    updateUserPassword,
    resetPassword,
  } = useAuth();

  const data1 = {
    firstName: 'A',
    lastName: 'B',
    phoneNumber: '0123456789',
    email: 'kadac52845@goonby.com',
    birthDate: '01/01/2001',
    address: 'TH',
    citizenID: '123456789',
    password: 888888,
  };

  const data2 = {
    firstName: 'X',
    lastName: 'Y',
    phoneNumber: '0123456789',
    email: 'miuluqidf@sinaite.net',
    password: 123456,
    birthDate: '01/01/2001',
    address: 'TH',
    citizenID: '9876543210',
  };

  return (
    <>
      <h5>User: {currentUser?.email}</h5>
      <div id="recaptcha"></div>
      {currentUser ? (
        <span>
          <button onClick={() => updateUserPassword(data1.password, 555555)}>
            Update Password
          </button>
          <button onClick={() => resetPassword(data1.email)}>
            Reset Password
          </button>
          <button onClick={() => logOut()}>Sign Out</button>
        </span>
      ) : (
        <span>
          <button onClick={() => signUp(data1)}>Sign Up</button>
          <button onClick={() => signInWithGoogle()}>
            Sign In with Google
          </button>
          <button onClick={() => logIn(data1.email, data1.password)}>
            Sign In
          </button>
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
