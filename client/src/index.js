import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CourseProvider } from "./contexts/CourseContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { UserProvider } from "./contexts/UserContext";
import App from "./App";
import "./index.css";
const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
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
  </Router>
  </React.StrictMode>
 
);
