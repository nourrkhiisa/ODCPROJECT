import React, { useState } from "react";

const AddCourseForm = ({ onSubmit, coaches, categories }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [CategoryId, setCategoryId] = useState("");
  const [coachId, setCoachId] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxStudents, setMaxStudents] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const locationString = `${location} (${latitude}, ${longitude})`;

    onSubmit({
      title,
      description,
      startDate,
      endDate,
      maxStudents,
      isOnline,
      location: locationString,
      link,
      CategoryId,
      coachId,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="maxStudents">Max Students:</label>
        <input
          type="number"
          id="maxStudents"
          name="maxStudents"
          value={maxStudents}
          onChange={(event) => setMaxStudents(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="isOnline">Is Online:</label>
        <input
          type="checkbox"
          id="isOnline"
          name="isOnline"
          checked={isOnline}
          onChange={(event) => setIsOnline(event.target.checked)}
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="latitude">Latitude:</label>
        <input
          type="text"
          id="latitude"
          name="latitude"
          value={latitude}
          onChange={(event) => setLatitude(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="longitude">Longitude:</label>
        <input
          type="text"
          id="longitude"
          name="longitude"
          value={longitude}
          onChange={(event) => setLongitude(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="link">Link:</label>
        <input
          type="text"
          id="link"
          name="link"
          value={link}
          onChange={(event) => setLink(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="CategoryId">Category:</label>
        <select
          id="CategoryId"
          name="CategoryId"
          value={CategoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="coachId">Coach:</label>
        <select
          id="coachId"
          name="coachId"
          value={coachId}
          onChange={(event) => setCoachId(event.target.value)}
          required
        >
          <option value="">Select a coach</option>
          {coaches.map((coach) => (
            <option key={coach.id} value={coach.id}>
              {coach.firstName} {coach.lastName}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Add Course</button>
    </form>
  );
};

export default AddCourseForm;
