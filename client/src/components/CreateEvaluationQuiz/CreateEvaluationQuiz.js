import React, { useState } from "react";
import "./CreateEvaluationQuiz.css";

const CreateEvaluationQuiz = ({ courseId, onSubmit }) => {
  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""] },
  ]);

  const handleChangeQuestionText = (event, index) => {
    const newQuestions = [...questions];
    newQuestions[index].text = event.target.value;
    setQuestions(newQuestions);
  };

  const handleChangeOptionText = (event, questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: "", options: ["", "", "", ""] }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(questions);
  };

  return (
    <div className="create-evaluation-quiz">
      <h2>Create Evaluation Quiz</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <p>
              <input
                type="text"
                placeholder={`Question ${questionIndex + 1}`}
                value={question.text}
                onChange={(event) =>
                  handleChangeQuestionText(event, questionIndex)
                }
              />
            </p>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <input
                  type="text"
                  placeholder={`Option ${optionIndex + 1}`}
                  value={option}
                  onChange={(event) =>
                    handleChangeOptionText(event, questionIndex, optionIndex)
                  }
                />
              </div>
            ))}
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateEvaluationQuiz;
