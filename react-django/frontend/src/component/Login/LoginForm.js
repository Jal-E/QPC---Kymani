import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios'; // Ensure to import axios
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginForm.css'; // Assuming you're using a CSS file for styling

const LoginForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [statusMessage, setStatusMessage] = useState(null); // State for success/error message
  const [showPassword, setShowPassword] = useState(false);

  // Check if user is already logged in when component mounts
  useEffect(() => {
    const storedUser = window.localStorage.getItem('user');
    if (storedUser) {
      navigate('/dashboard'); // Redirect to dashboard if user is already logged in
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
  
    // Fetch user accounts to check the login credentials
    axios
      .get(`http://127.0.0.1:8000/user-login?username=${formData.username}`)
      .then((response) => {
        const users = response.data; // Get the list of users from the response
        const { username, password } = formData; // Get the username and password from the form input
  
        // Find a matching user with the entered username and password
        const user = users.find(
          (user) => user.username === username && user.password === password
        );
  
        if (user) {
          console.log('Login successful');
          setStatusMessage('Login successful!');
  
          // Store user information in local storage
          window.localStorage.setItem('user', JSON.stringify({ username: user.username }));

          // Redirect to the Dashboard
          navigate('/dashboard');
        } else {
          console.error('Incorrect username or password');
          setStatusMessage('Incorrect username or password. Please try again.');
        }
      })
      .catch((error) => {
        console.error('There was an error fetching user accounts!', error);
        setStatusMessage('Error fetching user accounts! Please try again.');
      });
  };

  const handleLogout = () => {
    window.localStorage.removeItem('user'); // Clear user information from local storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-header">
          <h2>Login Form</h2>
          <p>Login to your account</p>
          <p>Don't have an account? <Link to="/">signup</Link></p>
        </div>

        <div className="login-form-container">
          <form onSubmit={handleSubmit} className="form-inputs">
            {/* Username Input */}
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

            {/* Password Input */}
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

            {/* Submit Button */}
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Login
              </button>
              <button type="button" className="cancel-btn" onClick={handleLogout}>
                Cancel
              </button>
            </div>

            {/* Status Message */}
            {statusMessage && <p>{statusMessage}</p>} {/* Display status message */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
