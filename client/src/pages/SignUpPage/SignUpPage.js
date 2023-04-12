import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { AuthContext } from "../../contexts/AuthContext";
import "./SignUpPage.css";

const SignUpPage = () => {
  const [error, setError] = useState(null);
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignUp = async ({
    email,
    password,
    firstName,
    lastName,
    role,
  }) => {
    try {
      console.log("Request body from frontend:", {
        email,
        password,
        firstName,
        lastName,
        role,
      }); // Add this line to log the request body

      await signUp(email, password, firstName, lastName, role);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="sign-up-page">
      {error && <div className="alert alert-danger">{error}</div>}
      <SignUpForm onSubmit={handleSignUp} />
    </div>
  );
};

export default SignUpPage;
