// QuizContext.js
import React, { createContext, useContext, useState } from "react";
import quizService from "../services/quizService";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);

  const createQuiz = async (courseId, questions) => {
    const newQuiz = await quizService.createEvaluationQuiz(courseId, questions);
    setQuizzes((prevQuizzes) => [...prevQuizzes, newQuiz]);
  };

  const createRatingQuiz = async (courseId, questions) => {
    try {
      const newRatingQuiz = await quizService.createRatingQuiz(
        courseId,
        questions
      );
      setQuizzes((prevQuizzes) => [...prevQuizzes, newRatingQuiz]);
    } catch (error) {
      throw error;
    }
  };

  return (
    <QuizContext.Provider value={{ quizzes, createQuiz, createRatingQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  return useContext(QuizContext);
};
