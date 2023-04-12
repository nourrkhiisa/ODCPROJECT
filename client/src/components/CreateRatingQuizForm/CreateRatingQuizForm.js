import React, { useState } from "react";

const CreateRatingQuizForm = ({ onSubmit }) => {
  const [questions, setQuestions] = useState([""]);

  const addQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (e, index) => {
    const newQuestions = [...questions];
    newQuestions[index] = e.target.value;
    setQuestions(newQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(questions);
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((question, index) => (
        <div key={index}>
          <label htmlFor={`question-${index}`}>Question {index + 1}:</label>
          <input
            type="text"
            id={`question-${index}`}
            value={question}
            onChange={(e) => handleQuestionChange(e, index)}
          />
          <button type="button" onClick={() => removeQuestion(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addQuestion}>
        Add Question
      </button>
      <button type="submit">Create Rating Quiz</button>
    </form>
  );
};

export default CreateRatingQuizForm;
