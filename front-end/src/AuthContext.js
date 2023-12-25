import { createContext, useContext, useEffect, useState } from 'react';
 // Make sure to adjust the path based on your project structure
import {onAuthStateChanged,fetchSignInMethodsForEmail, sendPasswordResetEmail, reauthenticateWithCredential, EmailAuthProvider,updateProfile,setPersistence,GoogleAuthProvider ,browserSessionPersistence,signInWithEmailAndPassword,createUserWithEmailAndPassword,signInWithPopup,getAuth} from "firebase/auth";
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
      // alert("Updated")
      setLoading(false)
    });
    return unsubscribe;
  }, [setCurrentUser])
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
      await setPersistence(authInstance,browserSessionPersistence);
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
      await setPersistence(authInstance,browserSessionPersistence);
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
      console.log('res',{result})
      
    }  catch (error) {
      console.error('Google login failed:', error.message);
      // alert('Login failed');
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
      if(response.status==200)
      {
        return null;
      }else console.log(response.data)
    } catch (error) {
      console.log(error)
      console.error('Email login failed:', error.message);
      if(error.message=== 'Firebase: Error (auth/invalid-login-credentials).')
       return {account: 'Inccorect email or password'};
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
  const resetPassword = async (email) =>{
    const authInstance = getAuth();
    try{
      try{
        const signInMethods = await fetchSignInMethodsForEmail(authInstance, email);
  
        console.log(email)
        console.log(signInMethods)
        if (signInMethods.length === 0) {
          console.log('Email does not exist');
          return false;
        } else {
          const ans = await sendPasswordResetEmail(authInstance, email);
          console.log('Email exists');
          return true;
        }
      }catch(error){
        console.log(error)
        return false;
      }
     
    }catch(err){
      console.log(err)
      return false;
    }
  }
  const changePassword = async (oldPassword, newPassword) =>{
    const authInstance = getAuth();
    // Re-authenticate the user with their current password
    console.log(oldPassword)
    const  credentials = EmailAuthProvider.credential(currentUser.email, oldPassword);
    try {
      const res = await reauthenticateWithCredential(authInstance.currentUser, credentials);
      console.log(res)
      return {ok:true}
    } catch (error) {
      console.error('Reauthentication failed:', error.message);
      return { error: 'Reauthentication failed. Please check your old password.' };
    }
  };
  const value = {
    currentUser,
    googleSignIn,
    logout,
    login,
    signup,
    googleSignUp,
    changePassword,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export default function useAuth() {
  return useContext(AuthContext);
}
