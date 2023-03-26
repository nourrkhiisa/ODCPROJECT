import React, { useState } from "react";

const EvaluationQuiz = ({ courseId, questions, onSubmit }) => {
  const [answers, setAnswers] = useState(new Array(questions.length).fill(""));

  const handleChange = (event, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(answers);
  };

  return (
    <div>
      <h2>Evaluation Quiz</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={question.id}>
            <p>{question.text}</p>
            {question.options.map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answers[index] === option}
                  onChange={(event) => handleChange(event, index)}
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EvaluationQuiz;
