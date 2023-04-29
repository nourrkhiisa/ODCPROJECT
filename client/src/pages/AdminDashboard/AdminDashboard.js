import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { CourseContext } from "../../contexts/CourseContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useQuizContext } from "../../contexts/QuizContext";
import AddCategoryForm from "../../components/AddCategoryForm/AddCategoryForm";
import AddCourseForm from "../../components/AddCourseForm/AddCourseForm";
import CourseList from "../../components/CourseList/CourseList";
import "./AdminDashboard.css";
import CreateRatingQuizForm from "../../components/CreateRatingQuizForm/CreateRatingQuizForm";
import AddStudentForm from "../../components/AddStudentForm/AddStudentForm";
import courseService from "../../services/courseService";
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const { createRatingQuiz } = useQuizContext();
  const { users, students, coaches } = useContext(UserContext);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const { courses, createCourse, createCategory, categories, courseRatings } =
    useContext(CourseContext);

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleAddCourse = async (course) => {
    try {
      await createCourse(course);
      alert("Course added successfully!");
    } catch (err) {
      alert("Error adding course: " + err.message);
    }
  };
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const handleAddStudent = async (student) => {
    try {
      await courseService.addStudent(student);
      alert("Student added successfully!");
    } catch (err) {
      alert("Error adding student: " + err.message);
    }
  };

  useEffect(() => {
    console.log("Course Ratings:", courseRatings);
  }, [courseRatings]);

  const handleCreateRatingQuiz = async (questions) => {
    try {
      if (!selectedCourseId) {
        alert("Please select a course.");
        return;
      }
      await createRatingQuiz(selectedCourseId, questions);
      alert("Rating quiz created successfully!");
    } catch (err) {
      alert("Error creating rating quiz: " + err.message);
    }
  };
  const handleAddCategory = async (category) => {
    try {
      await createCategory(category); // You'll need to add createCategory to your CourseContext
      alert("Category added successfully!");
    } catch (err) {
      alert("Error adding category: " + err.message);
    }
  };
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <button onClick={handleLogout}>Logout</button>
      <div className="section">
        <h2>Create Course</h2>
        <AddCourseForm
          onSubmit={handleAddCourse}
          coaches={coaches}
          categories={categories}
        />
      </div>

      <div className="section">
        <h2>Create Category</h2>
        <AddCategoryForm onSubmit={handleAddCategory} />
      </div>

      <div className="section">
        <h2>Students</h2>
        <ul>
          {students &&
            students.length > 0 &&
            students.map((student) => (
              <li key={student.id}>
                {student.id} - {student.email}
              </li>
            ))}
        </ul>
      </div>
      <div className="section">
        <h2>Categories</h2>
        <ul>
          {categories &&
            categories.length > 0 &&
            categories.map((category) => (
              <li key={category.id}>
                {category.id}-{category.name}
              </li>
            ))}
        </ul>
      </div>
      <div className="section">
        <h2>Coaches</h2>
        <ul>
          {coaches &&
            coaches.length > 0 &&
            coaches.map((coach) => (
              <li key={coach.id}>
                {coach.id} - {coach.email}
              </li>
            ))}
        </ul>
      </div>

      <div className="section">
        <h2>Courses</h2>
        <ul>
          {courses &&
            courses.length > 0 &&
            courses.map((course) => (
              <li key={course.id}>
                <Link to={`/courses/${course.id}`}>
                  {course.id} - {course.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <select
        value={selectedCourseId}
        onChange={(e) => setSelectedCourseId(e.target.value)}
      >
        <option value="">Select a course</option>
        {courses &&
          courses.length > 0 &&
          courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
      </select>
      <h2>Create Rating Quiz</h2>
      <CreateRatingQuizForm onSubmit={handleCreateRatingQuiz} />
      {/* Add more administrative features as needed */}
      <div className="section">
        <h2>Course Ratings</h2>
        <ul>
          {courseRatings.map((rating) => (
            <li key={rating.id}>
              Student ID: {rating.studentId} - Course ID: {rating.CourseId} -
              Rating: {rating.score}
            </li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h2>Add Student</h2>
        <AddStudentForm onSubmit={handleAddStudent} />
      </div>
    </div>
  );
};

export default AdminDashboard;
