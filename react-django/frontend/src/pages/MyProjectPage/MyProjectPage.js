import React, { useState } from 'react';
import Sidebar from '../../component/Sidebar/Sidebar';
import "./MyProjectPage.css";
import NavBar from '../../component/Navbar/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function MyProjectPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const totalEntries = 45; // Replace with actual data count
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(startEntry + entriesPerPage - 1, totalEntries);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={i === currentPage ? "active-page" : "remaining-page"}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  // File upload functionality
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File uploaded:", file.name);
      alert(`File "${file.name}" uploaded successfully!`);
    }
  };

  const triggerFileUpload = () => {
    document.getElementById('file-upload-input').click();
  };

  return (
    <div className="container1">
      <NavBar />
      <div className="container2">
        <div className="container21"><Sidebar /></div>
        <div className="container22">
          <div className="main-content">
          <div className="projects-header">
            <h2>My Projects</h2>
            <div className="controls-container">
              <div className="controls-left">
                <span className="entries-label">Show</span>
                <select className="entries-select" value={entriesPerPage} onChange={handleEntriesChange}>
                  {[10, 15, 20].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <span className="entries-label">entries</span>
              </div>
              <div className="controls-right">
                <button className="create-project">+ Create new project</button>
                <div className="search-input-div">
                  <FontAwesomeIcon icon={faSearch} className="search-icon" /> 
                  <input type="text" placeholder="Search..."   />
                </div>
                {/* <input type="text" placeholder="Search" className="search-input" /> */}
              </div>
            </div>
            
          </div>
            <section className="projects-section">
              

              <table className="projects-table">
                <thead>
                  <tr>
                    
                    <th>Project Name</th>
                    <th>Created On</th>
                    <th>Status</th>
                    <th>Upload a Doc.</th>
                    <th>Actions</th>
                    <th>Engagement data</th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    
                    <td>Project 01</td>
                    <td>2016-06-03</td>
                    <td>On hold</td>
                    <td>
                      <button className="upload-btn" onClick={triggerFileUpload}>Upload Doc</button>
                      <input
                        type="file"
                        id="file-upload-input"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                      />
                    </td>
                    <td><button className="view-btn">View</button></td>
                    <td><button className="view-btn">Present</button></td>
                    
                  </tr>
                  
                </tbody>
              </table>

              
            </section>
            <div className="pagination">
                <span>Showing result {startEntry} to {endEntry} of {totalEntries} entries</span>
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
