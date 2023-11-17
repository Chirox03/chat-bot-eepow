import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../AuthContext";
// const auth = getAuth();
const Menu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const { currentUser, login, logout } = useAuth();
  const handleSignOut = async(e) => {
    e.preventDefault();
    await logout();
    setIsOpen(false);
    navigate('/Login');
  }
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={menuRef} className="w-full relative block text-left border border-green">
      <button
        onClick={toggleDropdown}
        className={`w-full bg-${!isOpen ? "dark" : "darker"} text-white font-bold py-2 px-4 rounded`}
      >
        {currentUser.displayName}
      </button>
      {isOpen && (
        <div className="absolute bottom-12 left-0 border shadow-lg z-10 w-full border-green">
          <a href="/" className="block px-4 py-2 text-sm text-black bg-white hover:bg-light" onClick={handleSignOut}>
            Log out
          </a>
          <a href="ChangePass" className="block px-4 py-2 text-sm text-black bg-white hover:bg-light">
            Đổi mật khẩu
          </a>
        </div>
      )}
    </div>
  );
};

export default Menu;
