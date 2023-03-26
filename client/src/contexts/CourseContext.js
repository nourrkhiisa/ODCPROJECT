import React, { createContext, useState, useEffect } from "react";
import courseService from "../services/courseService";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    console.log("test");
    fetchCourses();
    fetchCategories();
  }, []);
  const createCategory = async (category) => {
    try {
      await courseService.createCategory(category);
    } catch (error) {
      throw error;
    }
  };
  const fetchCategories = async () => {
    try {
      const fetchedCategories = await courseService.getAllCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchCourses = async () => {
    const fetchedCourses = await courseService.getAllCourses();
    setCourses(fetchedCourses);
  };
  const fetchAssignedCourses = async (coachId) => {
    try {
      console.log("fetchAssignedCourses called"); // Update this line

      const fetchedAssignedCourses = await courseService.getAssignedCourses(
        coachId
      );
      console.log("fetchedAssignedCourses:", fetchedAssignedCourses);
      setAssignedCourses(fetchedAssignedCourses);
    } catch (error) {
      console.error("Error fetching assigned courses:", error);
    }
  };
  const enrollInCourse = async (courseId) => {
    await courseService.enrollInCourse(courseId);
    fetchCourses();
  };
  const createCourse = async (course) => {
    await courseService.createCourse(course);
    fetchCourses();
  };
  return (
    <CourseContext.Provider
      value={{
        courses,
        fetchCourses,
        enrollInCourse,
        createCourse,
        createCategory,
        categories,
        fetchCategories,
        assignedCourses, // Add this line
        fetchAssignedCourses,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
