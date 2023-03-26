import React from "react";
import "./CourseList.css";

const CourseList = ({ courses = [], enrollInCourse }) => {
  return (
    <div className="CourseList">
      <h2>Available Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.title} - {course.description}
            <button onClick={() => enrollInCourse(course.id)}>Enroll</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
