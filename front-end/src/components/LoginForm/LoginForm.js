import React from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from "../../AuthContext";
import { useState,useEffect } from 'react';
const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const { currentUser, googleSignIn, login, logout } = useAuth();
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (currentUser) {
      console.log("current user",currentUser)
    }
   
  }, [currentUser]);
  const handleLogin = async (e) => {
    e.preventDefault();
    let tmp_error = {}
    try {
      e.preventDefault();
      console.log('Login....');
      tmp_error = await login(email, password);
      console.log(tmp_error)  
      if(tmp_error!=='Success'){
        setPassword('');
        setErrors(tmp_error)
      }
      navigate('/Chat')
    } catch (error) {
      setPassword('');
      console.error('Login failed:', error.message);
      // You can add additional handling, such as displaying an error message to the user.
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
        <div className="relative mt-10 h-px bg-light">
          <div className="absolute left-0 top-0 flex justify-start w-full -mt-2">
            <span className="bg-light:0.8 px-4 text-xs text-gray-500 uppercase">Or Login With email</span>
          </div>
        </div>
        <div className="mt-10">
          <form action="#">
            {/* <div className="flex flex-col mb-6"> */}
            {Object.keys(errors).length && errors.email ? (
              <div className="flex flex-col mb-6">
               <label for="esucess" htmlFor="username" className="mb-1 text-xs sm:text-sm tracking-wide text-red-600 text-left">Email:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">

                    <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input value={email} onChange={(e)=>setemail(e.target.value)} id="success" name="email" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-red-400 w-full py-2 focus:outline-none focus:border-red-500" placeholder="Email" />
              </div>
                <label className=" text-xs sm:text-sm tracking-wide text-red-600 text-left">{errors.email}</label>
              </div>) :(
                <div className="flex flex-col mb-6">
              <label for="esucess" htmlFor="username" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600 text-left">Email:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">

                    <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input value={email} onChange={(e)=>setemail(e.target.value)} id="success" name="email" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-dark" placeholder="Email" />
               
              </div>
              </div>)
              }

            {Object.keys(errors).length && errors.password ?(
                <div className="flex flex-col mb-6">
                <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600 text-left">Password: Must be at least 6 characters</label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                      <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                  </div>
                  <input value={password} onChange={(e)=> setPassword(e.target.value)} id="password" type="password" name="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-red-400 w-full py-2 focus:outline-none focus:border-dark" placeholder="Password" />
                </div>
                <label  className="mb-1 text-xs sm:text-sm tracking-wide text-red-600 text-left">Password is too short</label>
              </div>
            ):(
              
              <div className="flex flex-col mb-6">
              <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600 text-left">Password: Must be at least 6 characters</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <span>
                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                </div>
                <input value={password} onChange={(e)=> setPassword(e.target.value)} id="password" type="password" name="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-dark" placeholder="Password" />
              </div>
            </div>
              )}
              <label className='mb-1 text-xs sm:text-sm tracking-wide text-red-600 text-left'>{Object.keys(errors).length && errors.account ? (errors.account) : (null)}</label>
            <div className="flex items-center mb-6 -mt-4">
              <div className="flex ml-auto">
                <button className="inline-flex text-xs sm:text-sm text-dark/90 hover:text-dark" type="button">
                  Forgot Your Password?
                </button>
              </div>
            </div>
            <div className="flex w-full">
              <button type="submit" onClick={handleLogin} className="flex items-center justify-center text-white font-bold py-2 px-4 border-b-4 border-darker-700 hover:border-light-500 rounded bg-dark/90 hover:bg-dark rounded py-2 w-full transition duration-150 ease-in">
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
          <button onClick={handleSignUp} className="inline-flex items-center font-bold text-dark/80 hover:text-dark text-xs text-center" type="button">
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
