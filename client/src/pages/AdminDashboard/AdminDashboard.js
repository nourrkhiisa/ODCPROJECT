import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { CourseContext } from "../../contexts/CourseContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import AddCategoryForm from "../../components/AddCategoryForm/AddCategoryForm";
import AddCourseForm from "../../components/AddCourseForm/AddCourseForm";
import CourseList from "../../components/CourseList/CourseList";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const { users, students, coaches } = useContext(UserContext);
  const { courses, createCourse, createCategory, categories } =
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
        <AddCourseForm onSubmit={handleAddCourse} />
      </div>

      <div className="section">
        <h2>Create Category</h2>
        <AddCategoryForm onSubmit={handleAddCategory} />
      </div>

      <div className="section">
        <h2>Students</h2>
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              {student.id} - {student.email}
            </li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h2>Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              {category.id}-{category.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h2>Coaches</h2>
        <ul>
          {coaches.map((coach) => (
            <li key={coach.id}>
              {coach.id} - {coach.email}
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Courses</h2>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <Link to={`/courses/${course.id}`}>
                {course.id} -{course.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Add more administrative features as needed */}
    </div>
  );
};

export default AdminDashboard;
