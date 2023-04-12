import React, { createContext, useState, useEffect, useCallback } from "react";
import courseService from "../services/courseService";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [enrolledCoursesWithQuizzes, setEnrolledCoursesWithQuizzes] = useState(
    []
  );
  const [courseRatings, setCourseRatings] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  useEffect(() => {
    fetchCourses();
    fetchCategories();
    fetchCourseRatings();
  }, []);
  const createCategory = async (category) => {
    try {
      await courseService.createCategory(category);
    } catch (error) {
      throw error;
    }
  };

  const fetchCourseRatings = async () => {
    try {
      const fetchedCourseRatings = await courseService.getAllCourseRatings();
      setCourseRatings(fetchedCourseRatings);
    } catch (error) {
      console.error("Error fetching course ratings:", error);
    }
  };
  const fetchQuiz = async (courseId) => {
    try {
      const fetchedQuiz = await courseService.getQuizByCourseId(courseId);
      setQuiz(fetchedQuiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
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

  const fetchEnrolledCourses = useCallback(
    async (studentId) => {
      console.log("Inside fetchEnrolledCourses function");
      try {
        const fetchedEnrolledCourses = await courseService.getEnrolledCourses(
          studentId
        );
        console.log("Fetched enrolled courses:", fetchedEnrolledCourses);

        // Fetch quiz data for each enrolled course

        const enrolledCoursesWithQuiz = await Promise.all(
          fetchedEnrolledCourses.map(async (enrolledCourse) => {
            if (enrolledCourse) {
              const ratingQuiz = await courseService.getQuizByCourseId(
                enrolledCourse.id
              );
              console.log(
                `RatingQuiz for enrolled course ${enrolledCourse.id}:`,
                ratingQuiz
              );
              const updatedCourse = {
                course: { ...enrolledCourse },
                quiz: ratingQuiz,
              };
              console.log("Updated course with ratingQuiz:", updatedCourse);
              return updatedCourse;
            }
            return null;
          })
        );

        console.log("Before filtering:", enrolledCoursesWithQuiz);

        // Filter out courses without quiz
        const filteredEnrolledCourses = enrolledCoursesWithQuiz.filter(
          (enrolledCourse) => enrolledCourse !== null
        );

        console.log("enrolledCoursesWithQuiz:", filteredEnrolledCourses);
        setEnrolledCoursesWithQuizzes(filteredEnrolledCourses);
        console.log(
          "Updated enrolled courses (CourseContext):",
          filteredEnrolledCourses
        );
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
    },
    [courseService.getEnrolledCourses, courseService.getQuizByCourseId]
  );

  const fetchCourses = async () => {
    const fetchedCourses = await courseService.getAllCourses();
    setCourses(fetchedCourses);
  };
  const fetchAssignedCourses = async (coachId) => {
    try {
      console.log("fetchAssignedCourses called");

      const fetchedAssignedCourses = await courseService.getAssignedCourses(
        coachId
      );
      console.log("fetchedAssignedCourses:", fetchedAssignedCourses);
      setAssignedCourses(fetchedAssignedCourses);
    } catch (error) {
      console.error("Error fetching assigned courses:", error);
    }
  };
  const enrollInCourse = async (studentId, courseId) => {
    try {
      const { data } = await courseService.enrollInCourse(studentId, courseId);
      setEnrolledCourses((prevEnrolledCourses) => [
        ...prevEnrolledCourses,
        data,
      ]);
    } catch (error) {
      console.error("Error enrolling in the course", error);
    }
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
        enrolledCoursesWithQuizzes, // Add this line
        courseRatings,
        enrolledCourses,
        fetchEnrolledCourses, // Make sure this line is here
        quiz, // Add this line
        fetchQuiz, // Add this line
        setSelectedCourseId,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
