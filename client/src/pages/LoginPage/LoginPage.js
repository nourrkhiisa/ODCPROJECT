/*import React, { useState, useContext, useEffect } from "react";
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

export default LoginPage;*/

/*import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import { AuthContext } from "../../contexts/AuthContext";
import "./LoginPage.css"; // Import the custom CSS

const LoginPage = () => {
  // ... Rest of the code

  return (
    <div className="Login-container">
      <div className="con">
        <h2 className="text">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <LoginForm login={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;*/



// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import LoginForm from "../../components/LoginForm/LoginForm";
// import { AuthContext } from "../../contexts/AuthContext";
// import "./LoginPage.css"; // Import the custom CSS

// const LoginPage = () => {
//   const [error, setError] = useState(null); // Add this line to define the error state
//   const navigate = useNavigate();

//   // Assuming you have the authentication context provider
//   const { login } = useContext(AuthContext);

//   const handleLogin = async (email, password) => {
//     try {
//       await login(email, password);
//       navigate("/some/path"); // Redirect to a path after successful login
//     } catch (err) {
//       setError("An error occurred during login."); // Update the error state with a message
//       console.error("Error occurred during login:", err);
//     }
//   };

//   // ... Rest of the code

//   return (
//     <div className="Login-container">
//       <div className="con">
//         <h2 className="text">Login</h2>
//         {error && <div className="alert alert-danger">{error}</div>}
//         <LoginForm login={handleLogin} />
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

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
      {error && <div className="alert alert-danger">{error}</div>}
      <LoginForm login={handleLogin} />
    </div>
  );
};

export default LoginPage;


