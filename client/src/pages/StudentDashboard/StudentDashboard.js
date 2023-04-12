import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CourseContext } from "../../contexts/CourseContext";
import CourseList from "../../components/CourseList/CourseList";
import "./StudentDashboard.css";
import { useNavigate } from "react-router-dom";
import EnrolledCourses from "../../components/EnrolledCourses/EnrolledCourses";
import TakeQuiz from "../../components/TakeQuiz/TakeQuiz"; // Import TakeQuiz instead of RatingQuiz

const StudentDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const {
    courses,
    fetchCourses,
    enrollInCourse,
    fetchQuiz,
    quiz,
    fetchEnrolledCourses,
    enrolledCourses,
  } = useContext(CourseContext);
  const [selectedCourseId, setSelectedCourseId] = useState("");
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

  const handleEnrollInCourse = async (courseId) => {
    try {
      await enrollInCourse(currentUser.id, courseId);
      setSelectedCourseId(courseId);
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  useEffect(() => {
    if (enrolledCourses && enrolledCourses.length > 0) {
      const firstNonNullEnrolledCourse = enrolledCourses.find(
        (course) => course !== null
      );
      if (firstNonNullEnrolledCourse) {
        setSelectedCourseId(firstNonNullEnrolledCourse.courseId);
      }
    }
  }, [enrolledCourses]);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      fetchEnrolledCourses(currentUser.id);
    }
  }, [currentUser, fetchEnrolledCourses]);

  useEffect(() => {
    if (courses) {
      setFilteredCourses(
        courses.filter((course) => !course.students?.includes(currentUser.id))
      );
    }
  }, [courses, currentUser]);

  const handleCourseSelect = (courseId) => {
    const course = enrolledCourses.find(
      (enrolledCourse) => enrolledCourse.courseId === courseId
    );
    if (course) {
      setSelectedQuiz(course.quiz);
    }
  };

  const handleQuizSubmit = (selectedCourseId, selectedAnswers) => {
    // Handle quiz submission logic here
    console.log("Quiz submitted with data:", selectedCourseId, selectedAnswers);
  };

  return (
    <div className="student-dashboard">
      {currentUser && <h2>Welcome, {currentUser.displayName}</h2>}
      <h3>Available Courses</h3>
      <CourseList
        courses={filteredCourses}
        enrollInCourse={handleEnrollInCourse}
      />
      <h3>Enrolled Courses</h3>
      <EnrolledCourses
        studentId={currentUser && currentUser.id}
        onSelectCourse={handleCourseSelect}
      />
      {selectedQuiz ? (
        <TakeQuiz
          quiz={selectedQuiz} // Pass selectedQuiz instead of quiz
          enrolledCourses={enrolledCourses}
          onSubmit={handleQuizSubmit}
        />
      ) : (
        <p>Select a course to take the quiz...</p>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default StudentDashboard;
