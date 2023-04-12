import React from "react";
import "./RatingQuiz.css";
import CourseRatingQuiz from "../CourseRatingQuiz/CourseRatingQuiz";

const RatingQuiz = ({
  ratingQuiz,
  onSubmit,
  enrolledCourses,
  assignedCoaches,
}) => {
  console.log("RatingQuiz received quiz:", ratingQuiz);
  console.log("Assigned coaches:", assignedCoaches);
  const handleRatingQuizSubmit = (
    selectedCourseId,
    selectedCoachId,
    selectedQuestions
  ) => {
    // Handle form submission here
    onSubmit(selectedCourseId, selectedCoachId, selectedQuestions);
  };

  // Check if quiz is defined before rendering the component
  if (!ratingQuiz) {
    return <div>No quiz for this course.</div>;
  }

  return (
    <div className="rating-quiz">
      <h2>{ratingQuiz.title || "Rating Quiz"}</h2>
      <CourseRatingQuiz
        enrolledCourses={enrolledCourses}
        assignedCoaches={assignedCoaches}
        questions={ratingQuiz.questions}
        onSubmit={handleRatingQuizSubmit}
      />
    </div>
  );
};

export default RatingQuiz;
