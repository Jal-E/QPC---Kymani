import React, { useState, useEffect } from 'react';
import Sidebar from '../../component/Sidebar/Sidebar';
import "./MyProjectPage.css";
import NavBar from '../../component/Navbar/NavBar';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MyProjectPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [statusMessage, setStatusMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/Project/")
      .then((response) => {
        setProjects(response.data);
        setFilteredProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setStatusMessage('Error fetching projects. Please try again.');
      });
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = projects.filter(project =>
      project.project_name.toLowerCase().includes(query)
    );
    setFilteredProjects(filtered);
    setCurrentPage(1);
  };

  const totalEntries = filteredProjects.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startEntry = (currentPage - 1) * entriesPerPage;
  const endEntry = Math.min(startEntry + entriesPerPage, totalEntries);
  const currentProjects = filteredProjects.slice(startEntry, endEntry);

  const handlePageChange = (page) => setCurrentPage(page);

  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => (
      <a
        key={i + 1}
        href="#"
        className={i + 1 === currentPage ? "active-page" : ""}
        onClick={(e) => {
          e.preventDefault();
          handlePageChange(i + 1);
        }}
      >
        {i + 1}
      </a>
    ));
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
            <div className="header">
              <h2>My Projects</h2>
              <div className="header-actions">
                <input
                  type="text"
                  placeholder="Search by project name"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="search-bar"
                />
                <button
                  className="create-project"
                  onClick={() => window.location.href = 'http://localhost:3000/createproject'}
                >
                  + Create new project
                </button>
              </div>
            </div>

            {statusMessage && (
              <div className={`status-message ${statusMessage.includes('Error') ? 'error' : 'success'}`}>
                {statusMessage}
              </div>
            )}

            <table className="projects-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Project Name</th>
                  <th>Created On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProjects.map((project, index) => (
                  <tr key={project.id}>
                    <td>{startEntry + index + 1}</td>
                    <td>{project.project_name}</td>
                    <td>{project.planned_start_date}</td>
                    <td>
                      <Link to={`/edit-project/${project.id}`} className="view-button">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <span>Showing results {startEntry + 1} to {endEntry} of {totalEntries}</span>
              <div className="page-numbers">
                {renderPageNumbers()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProjectPage;
