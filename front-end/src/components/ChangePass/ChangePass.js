import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from "../../AuthContext";

const ChangePass = () => {
  const navigate = useNavigate();
  const { changePassword } = useAuth();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleInputChange = (key, value) => {
    setErrors((prevErrors) => ({ ...prevErrors, [key]: null }));
    switch (key) {
      case 'oldPassword':
        setOldPassword(value);
        break;
      case 'newPassword':
        setNewPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validateField = (field, errorMessage) => {
      if (!field) {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));
        return false;
      }
      return true;
    };

    if (!validateField('oldPassword', 'This field cannot be empty') ||
        !validateField('newPassword', 'This field cannot be empty') ||
        !validateField('confirmPassword', 'This field cannot be empty')) {
      setConfirmPassword('')
      setOldPassword('')
      setNewPassword('')
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: 'Password does not match' }));
      setConfirmPassword('');
      return;
    }
    console.log(oldPassword)
    const res = await changePassword(oldPassword, newPassword);

    if (!res.error) {
      setErrors((prevErrors) => ({ ...prevErrors, ReAuth: 'Password is not correct' }));
      setOldPassword('');
      setConfirmPassword('');
      setNewPassword('');
      navigate("/Chat");
    }else{
      alert(res.error)
      return
    }
  };

  return (
    <div className="LoginForm">
      <div className="flex flex-col bg-light shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Change password</div>

        <div className="mt-10">
          <form>
            {['oldPassword', 'newPassword', 'confirmPassword'].map((field) => (
              <div key={field} className="flex flex-col mb-6">
                <label htmlFor={field} className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600 text-left">
                  {field === 'oldPassword' ? 'Password:' : field === 'newPassword' ? 'New password:' : 'Confirm new password:'}
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                      <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                  </div>
                  <input
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    id={field}
                    type="password"
                    name={field}
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-beige w-full py-2 focus:outline-none focus:border-dark"
                    placeholder={field === 'oldPassword' ? 'Password' : field === 'newPassword' ? 'New password' : 'Confirm new password'}
                  />
                  {errors && errors[field] && <span className="text-red-700 text-xs">{errors[field]}</span>}
                </div>
              </div>
            ))}
            <div className="flex w-full">
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-dark/90 hover:bg-dark rounded py-2 w-full transition duration-150 ease-in"
              >
                <span className="mr-2 uppercase">Change password</span>
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

export default ChangePass;
