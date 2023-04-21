import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import LoginForm from "../../components/LoginForm/LoginForm";
import { AuthContext } from "../../contexts/AuthContext";
import "./LoginPage.css";

// Add PrimeReact styles
import "primereact/resources/themes/saga-orange/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const LoginPage = () => {
  const [error, setError] = useState(null);
  const { login, setCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const loggedInUser = await login(email, password);
      setCurrentUser(loggedInUser);
      if (loggedInUser.role === "administrator") {
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
      <div className="login-container">
        <Card
          // title="Login"
          className="p-shadow-4 login-card"
          style={{ backgroundColor: "white" }}
        >
          {error && (
            <div className="p-mb-3 p-text-danger">
              <i className="pi pi-times p-mr-2" />
              {error}
            </div>
          )}
          <LoginForm login={handleLogin} />
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
