import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios'; // Ensure to import axios
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './SignupForm.css';

const SignupForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    project_manager: false,
  });

  const [statusMessage, setStatusMessage] = useState(null); // State for success/error message
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Axios POST request to send data to the Django backend
    axios
      .post('http://localhost:8000/user-accounts/', formData)
      .then((response) => {
        console.log('Data saved successfully:', response.data);
        setStatusMessage('Data saved successfully!'); // Set success message

        // Clear the form fields
        setFormData({
          username: '',
          password: '',
          first_name: '',
          last_name: '',
          email: '',
          project_manager: false,
        });
        setConfirmPassword(''); // Clear confirm password

        // Redirect to the Dashboard
        navigate('/dashboard'); // Navigate to the Dashboard
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          const errorData = error.response.data;
          if (errorData.username) {
            setStatusMessage('Username already exists. Please choose a different one.');
          } else if (errorData.email) {
            setStatusMessage('Email already exists. Please choose a different one.');
          } else {
            setStatusMessage('Error saving data! Please try again.');
          }
        } else {
          setStatusMessage('Error saving data! Please try again.');
        }
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="signup-header">
          <h2>Signup Form</h2>
<<<<<<< HEAD
          <p>Sign Up to Kaymani Management Group</p>
          <p>Already have an account? <Link to="/login">Login</Link></p>
=======
          <p>Sign Up to Kymani Management Group</p>
>>>>>>> eb7e8745b1fe734312a1e27d2f55db7a65d9708f
        </div>

        <div className="signup-form-container">
          <form onSubmit={handleSubmit} className="form-inputs">
            {/* Input fields grouped in one div */}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                placeholder="Enter your first name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                placeholder="Enter your last name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="demo@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Buttons grouped in another div */}
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Register now
              </button>
              <button type="button" className="cancel-btn">
                Cancel
              </button>
            </div>

            {statusMessage && <p>{statusMessage}</p>} {/* Display status message */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
