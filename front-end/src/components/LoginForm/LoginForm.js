import React from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from "../../AuthContext";
import { useState,useEffect } from 'react';
const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { currentUser, googleSignIn, login, logout } = useAuth();
  const [errors, setErrors] = useState({});
  const handleInputChange = (key, value) => {
    setErrors((prevErrors) => ({ ...prevErrors, [key]: null }));
    switch (key) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };
  const validateField = (field, errorMessage) => {
    if (!field) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (currentUser) {
      console.log("current user",currentUser)
    }
   
  }, [currentUser]);
  useEffect(()=>{
console.log(errors)
  },[errors])
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateField('email', 'Email cannot be empty') || !validateField('password', 'Password cannot be empty')) {
      return;
    }

    try {
      const response = await login(email, password);
      if (response) {
        console.log("meomeo",response)
        setPassword('');
        setErrors(response);
        return;
      }
      navigate('/Chat');
    } catch (error) {
      setPassword('');
      console.error('Login failed:', error.message);
    }
  };
  const handleLoginGoogle = async (e) => {
    try{
      e.preventDefault();
      await googleSignIn();
      navigate('/Chat')
    }catch(error){
      alert(error.message)
    }
  }
  const handleSignUp = (e) =>{
    e.preventDefault();
    navigate('/SignUp')
  }
  return (
    <div className="LoginForm">
      
      <div className="flex flex-col bg-light  shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Login To Eepow</div>
        <button className="But" onClick={handleLoginGoogle}>
          <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500">
            <i className="fab fa-facebook-f"></i>
          </span>
          <span>Login with Google</span>
        </button>
        <div className="relative mt-7 h-px bg-light">
          <div className="absolute left-0 top-0 my-4 flex justify-start w-full -mt-2">
            <span className="bg-light:0.8 px-4  text-xs text-gray-500 uppercase">Or Login With email</span>
          </div>
            <span className="text-red-700 text-xs">{errors.account}</span>
        </div>
        <div className="mt-8">
          <form action="#">
            {/* <div className="flex flex-col mb-6"> */}
            {['email', 'password'].map((field) => (
          <div key={field} className="flex flex-col mb-6">
            <label htmlFor={field} className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600 text-left">
              {field === 'email' ? 'Email:' : 'Password:'}
            </label>
            <div className="relative">
              <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <span>
                  <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    {field === 'email' ? (
                      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    ) : (
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                </span>
              </div>
              <input
                onChange={(e) => handleInputChange(field, e.target.value)}
                id={field}
                type={field === 'email' ? 'email' : 'password'}
                name={field}
                className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-beige w-full py-2 focus:outline-none focus:border-dark"
                placeholder={field === 'email' ? 'Email' : 'Password'}
              />
            </div>
              {errors && errors[field] && <span className="text-red-700 text-xs">{errors[field]}</span>}
          </div>
        ))}
            <div className="flex items-center mb-6 -mt-4">
              <div className="flex ml-auto">
                <button className="inline-flex text-xs sm:text-sm text-darker/80 hover:text-darker/60" type="button">
                  Forgot Your Password?
                </button>
              </div>
            </div>
            <div className="flex w-full">
              <button type="submit" onClick={handleSubmit} className="flex items-center justify-center text-white font-bold py-2 px-4 border-b-4 border-darker-700 hover:border-light-500 rounded bg-darker/60 hover:bg-darker/50 rounded py-2 w-full transition duration-150 ease-in">
                <span className="mr-2 uppercase">Login</span>
                <span>
                  <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center mt-6">
          <button onClick={handleSignUp} className="inline-flex items-center font-bold text-darker/80 hover:text-darker/60 text-xs text-center" type="button">
            <span>
              <svg className="h-6 w-6" fill="none" strokeLinecap  inecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>  
            </span>
            <span className="ml-2">You don't have an account?</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
