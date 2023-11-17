import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import ChatPage from './components/ChatPage/ChatPage';
import ChangePass from './components/ChangePass/ChangePass';
import Home from './components/Home';
import SignUpForm from './components/SignUpForm/SignUpForm';
import './index.css';
import User from './class/User';
function App() {
  const [user,updateUser] = useState();
  // const updateUser = (u)=>{
  //   setUser(u);
  // }
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Chat" element={<ChatPage user={user} updateUser={updateUser} />} />
        <Route path="/SignUp" element={<SignUpForm/>} />
        <Route path="/ChangePass" element={<ChangePass />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/Login" element={<LoginForm updateUser={updateUser}/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
