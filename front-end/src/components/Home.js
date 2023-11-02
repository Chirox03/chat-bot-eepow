import React from 'react';
import { useNavigate } from "react-router-dom";
const Home = () => {
  const dynamicText = "Do you have an account?";
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/Login");
  };
  const handleSignUp = () => {
    navigate("/SignUp");
  };
  return (
    <div className="flex h-screen">
      <div class="flex min-h-screen items-center justify-center bg-gradient-to-tr to-darker from-light p-10">
        <div class="w-max">
          <h1 class="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl text-white font-bold">Welcome to Eepow chat bot!</h1>
        </div>
      </div>
      <div className="w-1/2 flex flex-col bg-beigh items-center justify-center">
        <h1 className="text-3xl text-dark mb-8">{dynamicText}</h1>
        <div className="flex space-x-4">
          <button onClick={handleSignIn} className="bg-dark hover:bg-darker text-white font-bold py-2 px-4 rounded">
            Sign In
          </button>
          <button onClick={handleSignUp} className="bg-dark hover:bg-darker text-white font-bold py-2 px-4 rounded">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;