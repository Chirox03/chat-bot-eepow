import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import ChatPage from './components/ChatPage/ChatPage';
import ChangePass from './components/ChangePass/ChangePass';
import Home from './components/Home';
import SignUpForm from './components/SignUpForm/SignUpForm';
import './index.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Chat" element={<ChatPage />} />
        <Route path="/SignUp" element={<SignUpForm />} />
        <Route path="/ChangePass" element={<ChangePass />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/Login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
