import React, { useState } from "react";
import "./Settings.css";

const Settings = ({ user, onUpdateProfile }) => {
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile({ password, photoUrl });
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="photoUrl">Photo URL:</label>
          <input
            type="text"
            id="photoUrl"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Settings;
