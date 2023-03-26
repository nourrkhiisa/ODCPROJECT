import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CourseProvider } from "./contexts/CourseContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { UserProvider } from "./contexts/UserContext";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <Router>
    <AuthProvider>
      <UserProvider>
        <CourseProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </CourseProvider>
      </UserProvider>
    </AuthProvider>
  </Router>,
  document.getElementById("root")
);
