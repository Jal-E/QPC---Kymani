// src/pages/MyDashBoard.js

import React, { useEffect, useState } from 'react';
import Sidebar from '../../component/Sidebar/Sidebar';
import "./MyDashBoard.css";
import NavBar from '../../component/Navbar/NavBar';
import { FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function MyDashBoard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/Project/")
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  // Filtering projects based on status
  const pendingProjects = projects.filter(project => project.status === 'pending');
  const updatedProjects = projects.filter(project => project.status === 'updated');
  const offTrackProjects = projects.filter(project => project.status === 'off-track');

  // Function to render project sections
  const renderProjectSection = (heading, projects) => (
    <div className="project-section">
      <h2>{heading}</h2>
      {projects.length > 0 ? (
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project.id} className="project-item">
              <h3>{project.project_name}</h3>
              <p>Start Date: {project.planned_start_date}</p>
              <p>End Date: {project.planned_end_date}</p>
              <p>Budget: ${project.planned_budget}</p>
              <Link to={`/projects/${project.id}`} className="view-details-link">View Details</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects available in this section.</p>
      )}
    </div>
  );

  return (
    <div className="container1">
      <NavBar />
      <div className="container2">
        <div className="container21"><Sidebar /></div>
        <div className="container22">
          <div className="main-content">
            <div className='heading'>
              <h1>Welcome John Doe</h1>
              <Link to="http://localhost:3000/createproject" className="create-btn-link">
                <button type="submit" className="create-btn">
                  <FaPlus />  Create new project
                </button>
              </Link>
            </div>
            {renderProjectSection("My Pending Projects", pendingProjects)}
            {renderProjectSection("Recently Updated Projects", updatedProjects)}
            {renderProjectSection("Off-Track Projects", offTrackProjects)}
          </div>
        </div>
      </div>
    </div>
  );
}
