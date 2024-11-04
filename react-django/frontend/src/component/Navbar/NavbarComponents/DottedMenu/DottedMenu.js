import React, { useState, useEffect, useRef } from 'react';
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const DottedMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('user'); // Clear user information from local storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown-toggle" onClick={toggleMenu}>
        <HiDotsVertical />
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <a href="#" className="dropdown-item">Profile</a>
          <a href="#" className="dropdown-item">Settings</a>
          <a href="#" className="dropdown-item" onClick={handleLogout}>Logout</a> {/* Add onClick to logout */}
        </div>
      )}
    </div>
  );
};

export default DottedMenu;
