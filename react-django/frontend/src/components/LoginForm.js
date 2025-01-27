import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [statusMessage, setStatusMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) {
      navigate("/dashboard");
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
    e.preventDefault();

    axios
      .get(`http://127.0.0.1:8000/user-login?username=${formData.username}`)
      .then((response) => {
        const users = response.data;
        const { username, password } = formData;

        const user = users.find(
          (user) => user.username === username && user.password === password
        );

        if (user) {
          console.log("Login successful");
          setStatusMessage("Login successful!");

          window.localStorage.setItem(
            "user",
            JSON.stringify({ username: user.username })
          );

          navigate("/dashboard");
        } else {
          console.error("Incorrect username or password");
          setStatusMessage("Incorrect username or password. Please try again.");
        }
      })
      .catch((error) => {
        console.error("There was an error fetching user accounts!", error);
        setStatusMessage("Error fetching user accounts! Please try again.");
      });
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-header">
          <h2>Login Form</h2>
          <p>Login to your account</p>
          <p>
            Don't have an account? <Link to="/">signup</Link>
          </p>
        </div>

        <div className="login-form-container">
          <form onSubmit={handleSubmit} className="form-inputs">
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
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
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

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Login
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={handleLogout}
              >
                Cancel
              </button>
            </div>

            {statusMessage && <p>{statusMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;