import { createContext, useContext, useEffect, useState } from 'react';
 // Make sure to adjust the path based on your project structure
import { updateProfile,GoogleAuthProvider ,signInWithEmailAndPassword,createUserWithEmailAndPassword,signInWithPopup,getAuth} from "firebase/auth";
import {auth} from './firebase';
import axios from "axios";
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
  const validEmailPassword = (email,password) =>{
    let err = {}
    if(email.includes('@') != true){
      err.email = 'Invalid email';
    }
    if(password <7){
      err.password = 'Password is too short'
    }
    return err;
  }
  const signup = async(email,password) =>{
    const authInstance = getAuth();
    let err = validEmailPassword(email,password);
    if(Object.keys(err).length!=0){
      return err;
    }
    try{
      const result = await createUserWithEmailAndPassword(authInstance, email, password);
      console.log('res',result);
    // If the signup is successful, you can access the user information from the result
      const response = await axios.post('http://localhost:3001/add-user', {
        UserID: result.user.id,
        // Include any additional user data you want to send to the server
        // For example: email, username, etc.
      });
      return null;
    // Additional steps, such as setting the user's display name or sending a verification email, can be added here.
    } catch (error) {
    // Handle errors that might occur during signup
    if(error.code === 'auth/email-already-in-use'){
      error.account = 'Email is already axist';
      return error;
    }
    return error;
    }
  }
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
          displayName: data.user.displayName ,
        });
        // Set a timer for logout
        const timer = setTimeout(logout, 30 * 60 * 100000);
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
  const login = async (email, password) => {
    const authInstance = getAuth();
    let err = validEmailPassword(email,password);
    if(Object.keys(err).length){
      return err;
    }
    try {
      alert(email)
     
      const result = await signInWithEmailAndPassword(authInstance, email, password);
      
      setCurrentUser({
        userID: result.user.uid,
        displayName: email,
      });
  
      // Set a timer for logout
      const timer = setTimeout(logout, 30 * 60 * 1);
      setLogoutTimer(timer);
      return "Sucess";
      alert("Logged in successfully!");
    } catch (error) {
      console.error('Email login failed:', error.message);
      return error.message;
    }
  };
  
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
    login,
    signup
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default function useAuth() {
  return useContext(AuthContext);
}
