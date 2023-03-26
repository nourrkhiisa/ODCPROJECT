import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CourseContext } from "../../contexts/CourseContext";
import CourseList from "../../components/CourseList/CourseList";
import "./StudentDashboard.css";
import { useNavigate } from "react-router-dom";
const StudentDashboard = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { courses, fetchCourses, enrollInCourse } = useContext(CourseContext);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    console.log("currentUser in CoachDashboard:", currentUser);
    if (currentUser && currentUser.id) {
      console.log("Fetching assigned courses for coach ID:", currentUser.id);
    }
  }, [currentUser]);
  useEffect(() => {
    if (courses) {
      setFilteredCourses(
        courses.filter((course) => !course.students?.includes(currentUser.id))
      );
    }
  }, [courses, currentUser]);

  return (
    <div className="student-dashboard">
      {currentUser && <h2>Welcome, {currentUser.displayName}</h2>}
      <h3>Available Courses</h3>
      <CourseList courses={filteredCourses} enrollInCourse={enrollInCourse} />
      <button onClick={handleLogout}>Logout</button>
      {/* <CourseList courses={filteredCourses} /> */}
    </div>
  );
};

export default StudentDashboard;
