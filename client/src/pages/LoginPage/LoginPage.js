import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import { AuthContext } from "../../contexts/AuthContext";
import "./LoginPage.css";


const LoginPage = () => {
  const [error, setError] = useState(null);
  const { login, setCurrentUser, role } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const loggedInUser = await login(email, password);
      setCurrentUser(loggedInUser);
      if (loggedInUser.role === "admin") {
        navigate("/admin-dashboard");
      } else if (loggedInUser.role === "coach") {
        navigate("/coach-dashboard");
      } else if (loggedInUser.role === "student") {
        navigate("/student-dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      {error && <div className="alert alert-danger">{error}</div>}
      <LoginForm login={handleLogin} />
    </div>
  );
};

export default LoginPage;
