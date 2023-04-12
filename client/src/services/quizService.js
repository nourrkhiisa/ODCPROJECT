// src/services/quizService.js
import api from "./api/api";

const quizService = {
  createEvaluationQuiz: async (courseId, questions) => {
    try {
      const response = await api.post(
        `/admin/courses/${courseId}/rating-quiz`,
        {
          questions,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createRatingQuiz: async (courseId, questions) => {
    try {
      const response = await api.post(
        `/admin/courses/${courseId}/rating-quiz`, // Change this line
        {
          questions,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default quizService;
