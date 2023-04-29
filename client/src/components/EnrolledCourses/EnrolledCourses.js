import React, { useContext, useEffect, useState } from "react";
import { CourseContext } from "../../contexts/CourseContext";
import TakeQuiz from "../TakeQuiz/TakeQuiz";
import "@testing-library/jest-dom";

const EnrolledCourses = ({ studentId }) => {
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [filteredEnrolledCourses, setFilteredEnrolledCourses] = useState([]);
  const { enrolledCoursesWithQuizzes, fetchEnrolledCourses } =
    useContext(CourseContext);
  // console.log(
  //   "enrolledCoursesWithQuizzes from context:",
  //   enrolledCoursesWithQuizzes
  // );

  useEffect(() => {
    console.log("New filtered enrolled courses:", filteredEnrolledCourses);
  }, [filteredEnrolledCourses]);

  useEffect(() => {
    if (studentId && fetchEnrolledCourses) {
      console.log("Calling fetchEnrolledCourses with user id:", studentId);
      fetchEnrolledCourses(studentId);
      console.log("Called fetchEnrolledCourses");
    } else {
      console.log("Not calling fetchEnrolledCourses. studentId:", studentId);
    }
  }, [studentId, fetchEnrolledCourses]);

  useEffect(() => {
    console.log(
      "Processing enrolledCoursesWithQuizzes:",
      enrolledCoursesWithQuizzes
    );

    const newFilteredEnrolledCourses = enrolledCoursesWithQuizzes.filter(
      (enrolledCourse) => enrolledCourse.course
    );
    console.log("New filtered enrolled courses:", newFilteredEnrolledCourses);
    console.log("enrolledCoursesWithQuizzes:", enrolledCoursesWithQuizzes);

    setFilteredEnrolledCourses(newFilteredEnrolledCourses);
  }, [enrolledCoursesWithQuizzes]);

  const handleChange = (event) => {
    const courseId = parseInt(event.target.value, 10);
    console.log("Selected course ID:", courseId);
    setSelectedCourseId(courseId);
  };

  const onSubmit = (selectedCourseId, selectedAnswers) => {
    console.log("Quiz submitted for course ID:", selectedCourseId);
    console.log("Selected answers:", selectedAnswers);
    // You can handle the quiz submission here or pass the data to the parent component
  };
  const selectedCourse = selectedCourseId
    ? filteredEnrolledCourses.find(
        (enrolledCourse) => enrolledCourse.course.id === selectedCourseId
      )
    : null;

  return (
    <div>
      <pre>{JSON.stringify(filteredEnrolledCourses, null, 2)}</pre>
      {filteredEnrolledCourses && filteredEnrolledCourses.length > 0 ? (
        <>
          <select
            className="enrolled-courses-select"
            data-testid="enrolled-courses-select"
            value={selectedCourseId || ""}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a course
            </option>
            {filteredEnrolledCourses.map((enrolledCourse) => (
              <option
                key={enrolledCourse.course.id}
                value={enrolledCourse.course.id}
              >
                {enrolledCourse.course.title}
              </option>
            ))}
          </select>
          {selectedCourse && selectedCourse.quiz && (
            <TakeQuiz
              quiz={selectedCourse.quiz}
              selectedCourse={selectedCourse.course}
              onSubmit={onSubmit}
            />
          )}
        </>
      ) : (
        <p>Loading courses...</p>
      )}
    </div>
  );
};

export default EnrolledCourses;
