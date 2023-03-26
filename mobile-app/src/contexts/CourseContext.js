import React, { createContext, useState, useEffect } from "react";
import courseService from "../services/courseService";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [assignedCourses, setAssignedCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const fetchedCourses = await courseService.fetchCourses();
      setCourses(fetchedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchAssignedCourses = async (coachId) => {
    try {
      const fetchedAssignedCourses = await courseService.getAssignedCourses(
        coachId
      );
      setAssignedCourses(fetchedAssignedCourses);
    } catch (error) {
      console.error("Error fetching assigned courses:", error);
    }
  };

  const enrollInCourse = async (courseId) => {
    try {
      await courseService.enrollInCourse(courseId);
      setCourses(courses.filter((course) => course.id !== courseId));
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        assignedCourses,
        fetchCourses,
        fetchAssignedCourses,
        enrollInCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
