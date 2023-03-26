import React from "react";
import "./TrainingDetails.css";

const TrainingDetails = ({ training }) => {
  if (!training) {
    return (
      <div className="training-details">Select a training to see details</div>
    );
  }

  return (
    <div className="training-details">
      <h2>{training.title}</h2>
      <p>{training.description}</p>
      <p>
        <strong>Category:</strong> {training.category}
      </p>
      <p>
        <strong>Duration:</strong> {training.duration} hours
      </p>
      <p>
        <strong>Coach:</strong> {training.coach.name}
      </p>
      {training.location && (
        <p>
          <strong>Location:</strong> {training.location}
        </p>
      )}
      {training.link && (
        <p>
          <strong>Online Link:</strong>{" "}
          <a href={training.link}>{training.link}</a>
        </p>
      )}
    </div>
  );
};

export default TrainingDetails;
