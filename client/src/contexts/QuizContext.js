import React, { createContext, useState } from "react";
import quizService from "../services/quizService";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  // Add state and functions for handling quizzes here
  const [quizzes, setQuizzes] = useState([]);
  const createQuiz = async (courseId, questions) => {
    // Make an API call to create the quiz with the provided questions
    const newQuiz = await quizService.createEvaluationQuiz(courseId, questions);
    setQuizzes((prevQuizzes) => [...prevQuizzes, newQuiz]);
  };

  return (
    <QuizContext.Provider value={{ quizzes, createQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};
