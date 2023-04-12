import React, { useState } from "react";
import courseService from "../../services/courseService"; // Replace with the correct path to the courseService file
import "./TakeQuiz.css"; // Import the CSS file for styling

const TakeQuiz = ({ quiz, selectedCourse, onSubmit }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleAnswerChange = (e, index) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[index] = parseInt(e.target.value, 10);
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate the score
    const score = selectedAnswers.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    console.log("Quiz score:", score);

    try {
      const data = await courseService.submitQuizRating(
        selectedCourse.id,
        score
      );
      console.log("Quiz rating submitted:", data);
      onSubmit(selectedCourse.id, selectedAnswers, score); // You can remove this line if you don't need to use the onSubmit callback
    } catch (error) {
      console.error("Error submitting quiz rating:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Quiz for {selectedCourse.title}:</h3>
      {quiz.questions.map((question, index) => (
        <div key={index}>
          <p>{question}</p>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star}>
                <input
                  type="radio"
                  name={`answer-${index}`}
                  value={star}
                  checked={selectedAnswers[index] === star}
                  onChange={(e) => handleAnswerChange(e, index)}
                />
                <span className="star">&#9733;</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <button type="submit">Submit Quiz</button>
    </form>
  );
};

export default TakeQuiz;
