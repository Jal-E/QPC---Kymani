import React, { useState, useEffect } from "react";
import Sidebar from '../../component/Sidebar/Sidebar';
import './ProjectList.css'; // Create this CSS file or use the existing one
import NavBar from '../../component/Navbar/NavBar';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    // Fetch all projects when the component mounts
    axios.get("http://localhost:8000/Project/")
      .then((response) => {
        console.log("Projects Data: ", response.data);
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setStatusMessage('Error fetching projects. Please try again.');
      });
  }, []);

const handleDelete = (projectId) => {
  axios.delete(`http://localhost:8000/Project/${projectId}/`)
    .then(() => {
      setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId)); // Filter out deleted project
      setStatusMessage('Project deleted successfully!'); // Success message
    })
    .catch((error) => {
      console.error('There was an error deleting the project!', error);
      setStatusMessage('Error deleting project. Please try again.'); // Error message
    });
};

  return (
    <div className="container1">
      <NavBar />
      <div className="container2">
        <div className="container21">
          <Sidebar />
        </div>
        <div className="container22">
          <div className="main-content">
            <div className="projects-list-container">
              <h2>Available Projects</h2>

              {statusMessage && (
                <div className={`status-message ${statusMessage.includes('Error') ? 'error' : 'success'}`}>
                  {statusMessage}
                </div>
              )}

              <table className="projects-table">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Planned Start Date</th>
                    <th>Planned End Date</th>
                    <th>Planned Budget</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(project => (
                    <tr key={project.id}>
                      <td>{project.project_name}</td>
                      <td>{project.planned_start_date}</td>
                      <td>{project.planned_end_date}</td>
                      <td>{project.planned_budget}</td>
                      <td>
                        <Link to={`/edit-project/${project.id}`} className="edit-button">Edit</Link>
                        <button onClick={() => handleDelete(project.id)} className="delete-button">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsList;
