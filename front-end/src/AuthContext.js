import { createContext, useContext, useEffect, useState } from 'react';
 // Make sure to adjust the path based on your project structure
import { updateProfile,GoogleAuthProvider ,signInWithEmailAndPassword,createUserWithEmailAndPassword,signInWithPopup,getAuth} from "firebase/auth";
import {auth} from './firebase';
import axios from "axios";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(()=>{
     // Try to get user information from localStorage on initial load
  });
  const [loading,setLoading] = useState(true)
  const [logoutTimer, setLogoutTimer] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])
  // axios.interceptors.request.use(request => {
  //   console.log('Starting Request', JSON.stringify(request, null, 2))
  //   return request
  // })
  
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
      
    // If the signup is successful, you can access the user information from the result
   console.log(result.user.uid)
    const response = await axios.post('http://localhost:3001/add-user', {
      'UserID': result.user.uid,
      'Type': 'email'
    });
      return {error : null};
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
  const googleSignUp = async () =>{
    const provider = new GoogleAuthProvider();
    const authInstance = getAuth();
    try {
      const result = await signInWithPopup(authInstance, provider);
      console.log(result.user.uid)
      const response = await axios.post('http://localhost:3001/add-user', {
        'UserID': result.user.id,
        'Type':'google'
      });
      console.log(response)
      if(response.statusText != 'Ok')
      {
        return {'error':null}
      }else{
        console.error('Sign up with google failed',response.statusText);
        return {'error':'Sign up failed' +response.status + response.statusText}
       // alert('Sign up failed');
      }
    }  catch (error) {
      console.error('Google sign up failed:', error.message);
     // alert('Login failed');
    }
  }
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const authInstance = getAuth();
    try {
      const result = await signInWithPopup(authInstance, provider);
      const emailQueryParam = encodeURIComponent(result.user.uid);
      const response = await axios.get(`http://localhost:3001/get-user/${result.user.uid}`);
      console.log(response.statusText)
      if (response.statusText === 'OK') {
      setCurrentUser({
        userID: result.user.uid,
        displayName: (result.user.Username ? result.user.Username : 'meomeo') ,
      });
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
    let err = validEmailPassword(email, password);
    if(Object.keys(err).length){
      return err;
    }
    try {
      const result = await signInWithEmailAndPassword(authInstance, email, password);
      const response = await axios.get(`http://localhost:3001/get-user/${result.user.uid}`);
      console.log(response.data)
      setCurrentUser({
        userID: result.user.uid,
        displayName: response.data.user.Username,
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
    signup,
    googleSignUp
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export default function useAuth() {
  return useContext(AuthContext);
}
