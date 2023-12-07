import React, { useState } from 'react';
import useAuth from "../../AuthContext";
const SignUpForm = () => {
  const { currentUser, googleSignIn, signup, logout } = useAuth();
  const [errors, setErrors] = useState({});
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [repassword,setRepassword] = useState('');
  const handleSignUp = async (e)=>{
    console.log(email,password,repassword)
    e.preventDefault();
    let err = {}
    
    if(password != repassword){
      e.preventDefault();
      err.repassword = 'Password does not match';
      console.log(err);
      setErrors(err);
      setPassword('')
      setRepassword('')
      return;
    }
    err = await signup(email,password);
    if(Object.keys(err).length != 0)
    {
      e.preventDefault();
      console.log(err)
      setErrors(err);
      setPassword('')
      setRepassword('')
      return;
    }
    alert('Sign up successfull');
  }
  return (
    <div className="LoginForm">
      <div className="flex flex-col bg-light shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Sign up to Eepow</div>
        <button className="But">
          <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500">
            <i className="fab fa-facebook-f"></i>
          </span>
          <span>Sign up with Google</span>
        </button>
        <div className="relative mt-10 h-px bg-gray-300">
          <div className="absolute left-0 top-0 flex justify-start w-full -mt-2">
            <span className="bg-light px-4 text-xs text-gray-500 uppercase">Or Sign up With Username</span>
          </div>
        </div>
        <div className="mt-10">
          <form action="#">
            <div className="flex flex-col mb-6">
              <label htmlFor="username" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600 text-left">Username:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                {Object.keys(errors).length && errors.email ? (
                  <input value={email} onChange={(e) => setEmail(e.target.value)} id="username" name="username" className="Input border border-red-400" placeholder="Username" />
                  ):(
                    <input value={email} onChange={(e) => setEmail(e.target.value)} id="username" name="username" className="Input " placeholder="Username" />
                    )
                  }
                  </div>
                {Object.keys(errors).length && errors.email ? (
                  <label className="mb-1 text-xs sm:text-sm tracking-wide text-red-400 text-left">Invalid email!</label>):(null)}
            </div>

            <div className="flex flex-col mb-6">
              <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600 text-left">Password:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <span>
                    <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                </div>
                {Object.keys(errors).length && errors.password ? (
                <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" name="password" className="Input border border-red-400" placeholder="Password" />
                ):(
                <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" name="password" className="Input" placeholder="Password" />  
                )}
               </div>
               {Object.keys(errors).length && errors.password ? (
                  <label className="mb-1 text-xs sm:text-sm tracking-wide text-red-400 text-left">Password is too short</label>):(null)}
            </div>

            <div className="flex flex-col mb-6">
              <label htmlFor="confirm-password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600 text-left">Confirm Password:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <span>
                    <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                </div>
                {Object.keys(errors).length && errors.repassword ? (
                <input value={repassword} onChange={(e) => setRepassword(e.target.value)} id="confirm-password" type="password" name="confirm-password" className="Input border border-red-400" placeholder="Confirm Password" />
                ):(
                  <input value={repassword}  onChange={(e) => setRepassword(e.target.value)} id="confirm-password" type="password" name="confirm-password" className="Input" placeholder="Confirm Password" />
                )}
              </div>
              {Object.keys(errors).length && errors.repassword ? (
                  <label className="mb-1 text-xs sm:text-sm tracking-wide text-red-400 text-left">Password does not match!</label>):(null)}
            </div>
            {Object.keys(errors).length && errors.account ? (
                  <label className="mb-1 text-xs sm:text-sm tracking-wide text-red-400 text-left">{errors.account}</label>):(null)}
            <div className="flex w-full">
              <button onClick={handleSignUp} type="submit" className="flex items-center justify-center focus:outline-none text-beige text-sm sm:text-base bg-dark/80 hover:bg-dark rounded py-2 w-full transition duration-150 ease-in">
                <span className="mr-2 uppercase">Sign up</span>
                <span>
                  <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default SignUpForm;
