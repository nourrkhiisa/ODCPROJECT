import React from "react";

const CourseDetails = ({ course }) => {
  return (
    <div>
      <h2>{course.title}</h2>
      <p>Description: {course.description}</p>
      <p>Category: {course.category}</p>
      <p>Duration: {course.duration} hours</p>
      <p>Coach: {course.coachName}</p>
    </div>
  );
};

export default CourseDetails;
