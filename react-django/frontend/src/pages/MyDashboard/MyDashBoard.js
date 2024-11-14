import React from 'react'
import Sidebar from '../../component/Sidebar/Sidebar'
import "./MyDashBoard.css"
import NavBar from '../../component/Navbar/NavBar.js'
import ProjectSection from '../../component/DashboardComponents/tiles/Tiles.js'
import { FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom'

export default function MyDashBoard() {
  return (
    <div className="container1">
    <NavBar/>
    <div className="container2">
        <div className="container21"><Sidebar/></div>
          <div className="container22">
          <div className="main-content">
            <div className='heading'> 
            <h1>Welcome John Doe</h1>
            <Link to = "/createproject" className="create-btn-link">
            <button type="submit" className="create-btn">
                <FaPlus />  Create new project
            </button> 
            </Link>
              </div>
              <ProjectSection heading = "My Pending Projects"/>
              <ProjectSection heading = "Recently Updated Projects"/>
              <ProjectSection heading = "Off-Track Projects"/>
          </div>
          </div>
        </div>
    </div>
  )
}


