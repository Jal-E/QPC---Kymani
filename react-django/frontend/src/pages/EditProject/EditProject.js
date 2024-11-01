import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from '../../component/Navbar/NavBar';
import Sidebar from '../../component/Sidebar/Sidebar';
import './EditProject.css';

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/Project/${id}/`)
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => {
        console.error("Error fetching project details:", error);
        setStatusMessage('Error fetching project details. Please try again.');
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();

  // Append all project fields to FormData
  for (const key in project) {
    formData.append(key, project[key]);
  }

  // Append the file only if a file was selected
  if (selectedFile) {
    formData.append('file_upload', selectedFile);
  } else {
    formData.delete('file_upload');
  }

  // Update the project using the ID
  axios.put(`http://localhost:8000/Project/${id}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(() => {
      setStatusMessage('Project updated successfully!');
      navigate('/projectlist');
    })
    .catch((error) => {
      console.error('There was an error updating the project!', error);
      setStatusMessage('Error updating project. Please try again.');
    });
};

  if (!project) return <div>Loading...</div>;

  return (
    <div className="container1">
      <NavBar />
      <div className="container2">
        <div className="container21">
          <Sidebar />
        </div>
        <div className="container22">
          <div className="main-content">
            <div className="edit-project-container">
              <h2>Edit Project</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Project Name</label>
                  <input
                      type="text"
                      name="project_name"
                      value={project.project_name}
                      onChange={handleInputChange}
                      required
                  />
                </div>

                <div className="form-group">
                  <label>Scope of Work</label>
                  <input
                      type="text"
                      name="description"
                      value={project.description}
                      onChange={handleInputChange}
                      placeholder="Scope of work"
                      required
                  />
                </div>

                <div className="form-group">
                  <label>Upload File</label>
                  <input
                      type="file"
                      name="file_upload"
                      onChange={handleFileChange}
                  />
                </div>

                <button type="submit">Update Project</button>
              </form>

              {statusMessage && (
                  <div className={`status-message ${statusMessage.includes('Error') ? 'error' : 'success'}`}>
                  {statusMessage}
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProject;
