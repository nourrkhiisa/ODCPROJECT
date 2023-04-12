import React, { useState } from "react";

const CourseRatingQuiz = ({
  enrolledCourses = [],
  assignedCoaches = [],
  questions,
  onSubmit,
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedCoachId, setSelectedCoachId] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState(["", "", ""]);

  const handleCourseChange = (e) => {
    setSelectedCourseId(e.target.value);
  };

  const handleCoachChange = (e) => {
    setSelectedCoachId(e.target.value);
  };

  const handleQuestionChange = (e, index) => {
    const newQuestions = [...selectedQuestions];
    newQuestions[index] = e.target.value;
    setSelectedQuestions(newQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedCourseId, selectedCoachId, selectedQuestions);
  };

  const renderAssignedCoaches = () => {
    if (!assignedCoaches.length) {
      return <option value="">No coaches assigned.</option>;
    }

    return assignedCoaches.map((coach) => (
      <option key={coach.id} value={coach.id}>
        {coach.name}
      </option>
    ));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="course">Course:</label>

      <select
        id="course"
        value={selectedCourseId}
        onChange={handleCourseChange}
      >
        <option value="">Select a course</option>
        {enrolledCourses
          .filter((course) => course !== null)
          .map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
      </select>

      <label htmlFor="coach">Coach:</label>
      <select id="coach" value={selectedCoachId} onChange={handleCoachChange}>
        <option value="">Select a coach</option>
        {renderAssignedCoaches()}
      </select>

      {questions.map((question, index) => (
        <div key={index}>
          <label htmlFor={`question-${index}`}>Question {index + 1}:</label>
          <input
            type="text"
            id={`question-${index}`}
            value={selectedQuestions[index]}
            onChange={(e) => handleQuestionChange(e, index)}
          />
        </div>
      ))}

      <button type="submit">Submit Rating Quiz</button>
    </form>
  );
};

export default CourseRatingQuiz;
