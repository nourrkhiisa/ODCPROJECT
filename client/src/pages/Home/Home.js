import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to the Learning Platform</h1>
      <p>
        Our comprehensive web-based learning platform offers courses for
        students and provides tools for coaches and administrators.
      </p>

      <div className="cta-buttons">
        <Link to="/login" className="btn btn-primary">
          Log In
        </Link>
        <Link to="/signup" className="btn btn-secondary">
          Sign Up
        </Link>
      </div>

      {/* Add more homepage content as needed */}
    </div>
  );
};

export default Home;
