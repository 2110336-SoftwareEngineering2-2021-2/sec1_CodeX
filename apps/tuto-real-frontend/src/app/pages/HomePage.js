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

  return (<div></div>)
  
  
};

export default HomePage;
