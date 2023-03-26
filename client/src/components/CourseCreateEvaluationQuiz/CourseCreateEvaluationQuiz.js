import React, { useContext } from "react";
import { QuizContext } from "../../contexts/QuizContext";
import CreateEvaluationQuiz from "../CreateEvaluationQuiz/CreateEvaluationQuiz";

const CourseCreateEvaluationQuiz = ({ courseId }) => {
  const { createQuiz } = useContext(QuizContext);
  const handleSubmit = (questions) => {
    console.log("Quiz submitted with questions:", questions);
    createQuiz(courseId, questions);
  };

  return (
    <div>
      <h1>Create Course Evaluation Quiz</h1>
      <CreateEvaluationQuiz courseId={courseId} onSubmit={handleSubmit} />
    </div>
  );
};

export default CourseCreateEvaluationQuiz;
