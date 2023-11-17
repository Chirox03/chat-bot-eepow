import { createContext, useContext, useEffect, useState } from 'react';
 // Make sure to adjust the path based on your project structure
import { updateProfile,GoogleAuthProvider ,signInWithEmailAndPassword,signInWithPopup,getAuth} from "firebase/auth";
import {auth} from './firebase';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [logoutTimer, setLogoutTimer] = useState(null);
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const authInstance = getAuth();
    try {
      const result = await signInWithPopup(authInstance, provider);
      setCurrentUser({'userID':'3123124',
      'displayName':result.user.displayName});
      console.log(currentUser);
      const timer = setTimeout(logout, 30 * 60 * 1000);
      setLogoutTimer(timer);
    } catch (error) {
      console.error('Google login failed:', error.message);
      alert('Login failed');
    }
  };
  const login = async (username,password)=>{
    try{
      setCurrentUser({'userID':'3123124',
      'displayName':'sdsd'});
      alert("loged in ")
      console.log(currentUser.displayName);
      const timer = setTimeout(logout, 30 * 60 * 1000);
      setLogoutTimer(timer);
    }catch(error){
      console.error('Username login failed:', error.message);
      alert('Login failed');
    }
  }
  const logout = async () => {
    try {
      clearTimeout(logoutTimer);
      setLogoutTimer(null);
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout failed:', error.message);
      
    }
  };

  const value = {
    currentUser,
    googleSignIn,
    logout,
    login
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default function useAuth() {
  return useContext(AuthContext);
}
