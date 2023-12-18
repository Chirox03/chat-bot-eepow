import { createContext, useContext, useEffect, useState } from 'react';
 // Make sure to adjust the path based on your project structure
import {onAuthStateChanged,updateProfile,setPersistence,GoogleAuthProvider ,browserSessionPersistence,signInWithEmailAndPassword,createUserWithEmailAndPassword,signInWithPopup,getAuth} from "firebase/auth";
import {auth} from './firebase';
import { SignOutUser, userStateListener } from "./firebase";
import axios from "axios";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [loading,setLoading] = useState(true)
  const [logoutTimer, setLogoutTimer] = useState(null);
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      alert("Updated")
      setLoading(false)
    });
    return unsubscribe;
  }, [setCurrentUser])
  useEffect(()=>{
    console.log(loading)
    if(loading==true){
      alert('Loading')
    }
  },[loading])
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
      'Username': result.user.email,
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
        'Username': result.user.displayName,
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
      await setPersistence(authInstance,browserSessionPersistence);
      const result = await signInWithPopup(authInstance, provider);
      // const response = await axios.get(`http://localhost:3001/get-user/${result.user.uid}`);
      // setTimeout(() => {
      //   console.log('currentUser after delay:', authInstance.currentUser);
      // }, 500);
      // console.log(response.statusText)
      console.log('res',{result})
      
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
      await setPersistence(authInstance,browserSessionPersistence);
      const result = await signInWithEmailAndPassword(authInstance, email, password);
      const response = await axios.get(`http://localhost:3001/get-user/${result.user.uid}`);
      console.log(response.data)
      alert("Logged in successfully!");
      return "Success";
    } catch (error) {
      console.error('Email login failed:', error.message);
      return error.message;
    }
  };
  
  const logout = async () => {
    try {
      SignOutUser();
      setCurrentUser({});
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
