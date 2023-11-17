import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import ChatPage from './components/ChatPage/ChatPage';
import ChangePass from './components/ChangePass/ChangePass';
import Home from './components/Home';
import SignUpForm from './components/SignUpForm/SignUpForm';
import './index.css';
// Required for side-effects
import "firebase/firestore";
import { Firestore, collection, getDocs } from "firebase/firestore"; 
import { db } from './firebase';

const querySnapshot = await getDocs(collection(db , "Users"));
querySnapshot.forEach((doc) => {
  if(doc.exists() && doc.data()){
    console.log("Document data:", doc.data());  
  }else{
    console.log("No such document!");
  }
 
});

function App() {
  
  return (
    <div>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Chat" element={<ChatPage />} />
        <Route path="/SignUp" element={<SignUpForm />} />
        <Route path="/ChangePass" element={<ChangePass />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/Login" element={<LoginForm/>} />
      </Routes>
    </BrowserRouter>
    <script src="https://www.gstatic.com/firebasejs/10.5.2/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore-compat.js"></script>
    </div>
  );
}

export default App;
