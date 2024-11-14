import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaRegFolderOpen } from "react-icons/fa";
import { MdOutlineWindow } from "react-icons/md";
import './Sidebar.css';

const Sidebar_Data = [
  {
    title: "MyDashboard",
    link: "/dashboard",
    icon: <MdOutlineWindow />,
  },
  {
    title: "My Profile",
    link: "/profile",
    icon: <FaRegFolderOpen />,
  },
  {
    title: "My Projects",
    link: "/MyProjectPage",
    icon: <FaRegFolderOpen />,
  },
];

export default function Sidebar() {
  const location = useLocation(); // Get the current route

  return (
    <div className='Sidebar'>
      <ul className='SidebarList'>
        {Sidebar_Data.map((val, key) => {
          const isActive = location.pathname === val.link; // Check if the current route matches the link

          return (
            <Link to={val.link} className='text' key={key}>
              <li
                className={`row ${isActive ? 'active' : ''}`} // Apply 'active' class if it's the active route
              >
                <div>{val.icon} {val.title}</div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
