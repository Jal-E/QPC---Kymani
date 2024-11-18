import React, { useState, useEffect } from "react";
import Sidebar from '../../component/Sidebar/Sidebar';
import './CreateProject.css';
import NavBar from '../../component/Navbar/NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateProject() {
  const navigate = useNavigate();
  const [managers, setManagers] = useState([]);
  const [statusMessage, setStatusMessage] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/user-accounts/")
      .then((response) => {
        const managers = response.data.filter(user => user.project_manager);
        setManagers(managers);
      })
      .catch((error) => {
        console.error("Error fetching project managers:", error);
      });
  }, []);

  const [formData, setFormData] = useState({
    project_name: "",
    planned_start_date: "",
    planned_end_date: "",
    planned_budget: "",
    description: "",
    spent_budget: 0,
    project_manager: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle file upload
    const data = new FormData();
    data.append('project_name', formData.project_name);
    data.append('planned_start_date', formData.planned_start_date);
    data.append('planned_end_date', formData.planned_end_date);
    data.append('planned_budget', formData.planned_budget);
    data.append('description', formData.description);
    data.append('spent_budget', formData.spent_budget);
    data.append('project_manager', formData.project_manager);
    if (file) {
      data.append('file_upload', file);
    }

    try {
      const response = await axios.post('http://localhost:8000/Project/', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Data saved successfully:', response.data);
      setStatusMessage('Data saved successfully!');

      setFormData({
        project_name: '',
        planned_start_date: '',
        planned_end_date: '',
        planned_budget: '',
        description: '',
        spent_budget: 0,
        project_manager: ''
      });
      setFile(null);
      navigate('/myprojectpage');
    } catch (error) {
      console.error('There was an error!', error);
      setStatusMessage('Error saving data! Please try again.');
    }
  };

  const handleAddScope = () => {
    // Logic to add a new scope (like Scope 01, 02, etc.)
  };

  const handleAddMilestone = () => {
    // Logic to add a new milestone
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
            <div className="create-project-container">
              <h2>Create New Project</h2>
              <form onSubmit={handleSubmit} encType="multipart/form-data">

                <div className="form-group">
                  <label>Project Name</label>
                  <input
                      type="text"
                      name="project_name"
                      value={formData.project_name}
                      onChange={handleInputChange}
                      placeholder="Project Name Here"
                      required
                  />
                </div>

                <div className="form-group">
                  <label>Planned Start Date</label>
                  <input
                      type="date"
                      name="planned_start_date"
                      value={formData.planned_start_date}
                      onChange={handleInputChange}
                      required
                  />
                </div>

                <div className="form-group">
                  <label>Planned End Date</label>
                  <input
                      type="date"
                      name="planned_end_date"
                      value={formData.planned_end_date}
                      onChange={handleInputChange}
                      required
                  />
                </div>

                <div className="form-group">
                  <label>Planned Budget</label>
                  <input
                      type="number"
                      name="planned_budget"
                      value={formData.planned_budget}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      required
                  />
                </div>

                <div className="form-group">
                  <label>Scope of Work</label>
                  <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Scope of work"
                      required
                  />
                </div>

                <div className="form-group">
                  <label>Project Manager</label>
                  <select
                      name="project_manager"
                      value={formData.project_manager}
                      onChange={handleInputChange}
                      required
                  >
                    <option value="">Select Project Manager</option>
                    {managers.map(manager => (
                        <option key={manager.username} value={manager.username}>
                          {manager.first_name} {manager.last_name} {/* Displaying full name */}
                        </option>
                    ))}
                  </select>
                </div>

                {/* File Upload Input */}
                <div className="form-group">
                  <label>Upload File (Optional)</label>
                  <input
                      type="file"
                      onChange={handleFileChange}
                  />
                </div>

                <button type="submit" className="submit-button">Submit</button>
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

export default CreateProject;
