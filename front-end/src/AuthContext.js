import { createContext, useContext, useEffect, useState } from 'react';
 // Make sure to adjust the path based on your project structure
import { updateProfile,GoogleAuthProvider ,signInWithEmailAndPassword,signInWithPopup,getAuth} from "firebase/auth";
import {auth} from './firebase';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(()=>{
     // Try to get user information from localStorage on initial load
     const storedUser = localStorage.getItem('currentUser');
     return storedUser ? JSON.parse(storedUser) : null;
  });
  const [logoutTimer, setLogoutTimer] = useState(null);
  useEffect(() => {
    console.log('Current User:', currentUser);
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [currentUser]);
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const authInstance = getAuth();
    try {
      const result = await signInWithPopup(authInstance, provider);
      const emailQueryParam = encodeURIComponent(result.user.email);
      const response = await fetch(`http://localhost:3001/verify-email?email=${emailQueryParam}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        // Update currentUser based on the API response
        console.log(data)
        setCurrentUser({
          userID: data.userID,
          displayName: result.user.displayName,
        });
        // Set a timer for logout
        const timer = setTimeout(logout, 30 * 60 * 1000);
        setLogoutTimer(timer);
      } else {
        console.error('Email verification failed:', response.statusText);
        alert('Login failed');
      }
    }  catch (error) {
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
      
      // Remove user information from localStorage on logout
      localStorage.removeItem('currentUser');
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
