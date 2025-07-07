import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../Firebase_Config";



const ContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false); 

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photoURL, setPhotoURL] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const signUpByEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    return signOut(auth)
      
  };
  const signInByGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  const updateUser = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setPhotoURL(user.photoURL);
        setDisplayName(user.displayName);
      } else {
        setUser(null);
        setPhotoURL(null);
        setDisplayName(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authContextValue = {
    signUpByEmail,
    signInUser,
    signInByGoogle,
    updateUser,
    logOut,
    setDisplayName,
    setPhotoURL,toggleTheme, isDark,
    displayName,
    photoURL,
    loading,
    user,
  };

  return (
    <>
      <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
    </>
  );
};

export default ContextProvider;
