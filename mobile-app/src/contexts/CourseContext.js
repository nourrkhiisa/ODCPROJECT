// CourseContext.js
import React, { createContext, useState, useEffect, useCallback } from "react";
import { courseService } from "../services/courseService";

export const CourseContext = createContext();

export const CourseProvider = ({ children, authToken }) => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    if (authToken) {
      fetchCourses();
      fetchEnrolledCourses();
    }
  }, [authToken]);

  const fetchCourses = async () => {
    try {
      const service = courseService(authToken);
      const fetchedCourses = await service.fetchCourses();
      setCourses(fetchedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchEnrolledCourses = useCallback(async () => {
    try {
      const service = courseService(authToken);
      const fetchedEnrolledCourses = await service.fetchEnrolledCourses();
      setEnrolledCourses(fetchedEnrolledCourses);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  }, [authToken]);

  const enrollInCourse = async (courseId) => {
    try {
      const service = courseService(authToken);
      await service.enrollInCourse(courseId);
      setCourses(courses.filter((course) => course.id !== courseId));
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        enrolledCourses,
        fetchCourses,
        fetchEnrolledCourses,
        enrollInCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export default CourseProvider;
