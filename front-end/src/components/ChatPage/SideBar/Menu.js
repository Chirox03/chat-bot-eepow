import React, { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";

// const auth = getAuth();
const handleSignOut = () =>{

//   signOut(auth).then(() => {
//     // Sign-out successful.
//     Navigate("/Home");
//   }).catch((error) => {
//     // An error happened.
//   });
}
const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

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
        Username
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
