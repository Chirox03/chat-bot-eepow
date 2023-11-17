import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import ChatPage from './components/ChatPage/ChatPage';
import ChangePass from './components/ChangePass/ChangePass';
import Home from './components/Home';
import SignUpForm from './components/SignUpForm/SignUpForm';
import './index.css';
import { useEffect } from 'react';
import { useAuth } from './AuthContext';

function App() {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        console.log('User is signed in:', user);
      } else {
        // User is signed out
        console.log('User is signed out');
      }
    });

    return () => {
      // Unsubscribe from the listener when the component unmounts
      unsubscribe();
    };
  }, []);
  return (
    <div>
      {/* <AuthProvsider> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Chat" element={<ChatPage />} />
        <Route path="/SignUp" element={<SignUpForm/>} />
        <Route path="/ChangePass" element={<ChangePass />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/Login" element={<LoginForm/>} />
      </Routes>
    </BrowserRouter>
      {/* </AuthProvsider> */}
    </div>
  );
}

export default App;
