import React, { useState, useEffect, useRef   }  from 'react'
import '../styles/Navbar.css'
import { MdPermIdentity } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { HiDotsVertical } from "react-icons/hi";
import KymaniLogo from './KymaniLogo.jpg';
import { Link } from 'react-router-dom';
import { GoBell } from "react-icons/go";
import { FaSearch } from "react-icons/fa";

function Avatar() {
  return (
    <div className='Avatar square'>
      <MdPermIdentity />
    </div>
  )
}

function BackArrow() {
  const history = useNavigate ();
  return (
    <div className='BackArrow square' onClick = {() => history(-1)}>
      <IoMdArrowRoundBack />
    </div>
  )
}


const DottedMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  return (
    <div className="dropdown square" ref = {dropdownRef}>
      <div className="dropdown-toggle" onClick={toggleMenu}>
        <HiDotsVertical/>
      </div >
      {isOpen && (
        <div className="dropdown-menu">
          <a href="#" className="dropdown-item">Profile</a>
          <a href="#" className="dropdown-item">Settings</a>
          <a href="#" className="dropdown-item">Logout</a>
        </div>
      )}
    </div>
  );
};

function Logo() {
  return (
    <div className='logo'>
      <Link to = "/">
      <img src= {KymaniLogo} height={90} width={330}/>
      </Link>
    </div>
  )
}

function Notification(){
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  return (
    <div className="dropdown square" ref = {dropdownRef}>
      <button className="dropdown-toggle" onClick={toggleMenu}>
      <GoBell />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <a href="#" className="dropdown-item">Profile</a>
          <a href="#" className="dropdown-item">Settings</a>
          <a href="#" className="dropdown-item">Logout</a>
        </div>
      )}
    </div>
  );
};

function SearchBar() {
  return (
    <div className="Searchbar">
        <FaSearch id="search-icon" />
        <input className= "Search-input" placeholder="Search anything..."/>
    </div>
  )
}

export default function NavBar() {
  return (
    <div className='NavBar'>
      <div>
      <Logo/>
      </div>
      <div className='Nav'>
      <BackArrow />
      <SearchBar/>
      <DottedMenu/>
      <Notification/>
      <Avatar/>
      </div>
    </div>
  )
}








