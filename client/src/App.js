import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import CoachDashboard from "./pages/CoachDashboard/CoachDashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider, UserContext } from "./contexts/UserContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { CourseProvider } from "./contexts/CourseContext";
import { QuizProvider } from "./contexts/QuizContext";
import CreateEvaluationQuiz from "./components/CreateEvaluationQuiz/CreateEvaluationQuiz";

function App() {
  const { setCurrentUser } = React.useContext(UserContext); // <-- Get setCurrentUser from UserContext

  return (
    <div className="App">
      <AuthProvider>
        <UserProvider>
          <NotificationProvider>
            <CourseProvider>
              <QuizProvider>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route
                    path="/student-dashboard"
                    element={<StudentDashboard />}
                  />
                  <Route path="/coach-dashboard" element={<CoachDashboard />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route
                    path="/create-quiz"
                    element={<CreateEvaluationQuiz />}
                  />
                </Routes>
                {/* <AdminDashboard/>*/}
              </QuizProvider>
            </CourseProvider>
          </NotificationProvider>
        </UserProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
