import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import { AuthContext } from "../../contexts/AuthContext";
import "./LoginPage.css";

const LoginPage = () => {
  const [error, setError] = useState(null);
  const { login, setCurrentUser, role } = useContext(AuthContext);

  const navigate = useNavigate();
  // useEffect(() => {
  //   // Redirect the user to the appropriate dashboard based on their role
  //   console.log("Current role:", role);
  //   if (role === "admin") {
  //     navigate("/admin-dashboard");
  //   } else if (role === "coach") {
  //     navigate("/coach-dashboard");
  //   } else if (role === "student") {
  //     navigate("/student-dashboard");
  //   }
  // }, [role, navigate]);
  // const handleLogin = async (email, password) => {
  //   try {
  //     const loggedInUser = await login(email, password);
  //     setCurrentUser(loggedInUser);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };
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
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <LoginForm login={handleLogin} />
    </div>
  );
};

export default LoginPage;
