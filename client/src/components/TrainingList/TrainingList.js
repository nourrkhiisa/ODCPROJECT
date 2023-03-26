import React from "react";
import "./TrainingList.css";

const TrainingList = ({ trainings, onSelectTraining }) => {
  return (
    <div className="training-list">
      <h2>Assigned Trainings</h2>
      <ul>
        {trainings.map((training) => (
          <li key={training.id} onClick={() => onSelectTraining(training)}>
            {training.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainingList;
