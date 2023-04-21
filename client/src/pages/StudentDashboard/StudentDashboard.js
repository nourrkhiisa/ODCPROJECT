import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CourseContext } from "../../contexts/CourseContext";
import CourseList from "../../components/CourseList/CourseList";
import "./StudentDashboard.css";
import { useNavigate } from "react-router-dom";
import EnrolledCourses from "../../components/EnrolledCourses/EnrolledCourses";
import TakeQuiz from "../../components/TakeQuiz/TakeQuiz";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { Card } from "primereact/card"; // Import the Card component
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";


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

  const handleCourseSelect = async (courseId) => {
    const fetchedQuiz = await fetchQuiz(courseId);
    setSelectedQuiz(fetchedQuiz);
    setSelectedCourseId(courseId);
  };

  const handleQuizSubmit = (selectedCourseId, selectedAnswers) => {
    // Handle quiz submission logic here
    console.log("Quiz submitted with data:", selectedCourseId, selectedAnswers);
  };

  const courseTemplate = (course) => {
    return (
      <Card
        title={course.title}
        subTitle={`Instructor: ${course.instructor}`}
        style={{ width: "18rem", marginBottom: "1rem" }}
        className="p-shadow-2"
      >
        <p>{course.description}</p>
        <Button
          label="Enroll"
          icon="pi pi-check"
          onClick={() => handleEnrollInCourse(course.id)}
          className="p-mt-auto"
        />
      </Card>
    );
  };
  return (
    <div className="student-dashboard p-d-flex p-flex-column p-ai-center">
    {currentUser && <h2>Welcome, {currentUser.displayName}</h2>}
    <h3>Available Courses</h3>
      <Panel className="p-mb-3">
        <div className="p-grid p-justify-center">
          {filteredCourses.map((course) => (
            <div key={course.id} className="p-col-12 p-md-6 p-lg-4">
              {courseTemplate(course)}
            </div>
          ))}
        </div>
      </Panel>
{selectedQuiz ? (
<TakeQuiz
quiz={selectedQuiz}
enrolledCourses={enrolledCourses}
onSubmit={handleQuizSubmit}
selectedCourseId={selectedCourseId} // Pass selectedCourseId as a prop
/>
) : (
<p>Select a course to take the quiz...</p>
)}

<Button label="Logout" icon="pi pi-sign-out" onClick={handleLogout} className="p-mt-3" />
</div>
);
};

export default StudentDashboard;