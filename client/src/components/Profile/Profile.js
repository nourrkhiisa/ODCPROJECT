import React from "react";
import "./Profile.css";

const Profile = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div className="profile">
      <img src={user.photoUrl} alt="User avatar" className="profile-image" />
      <div className="profile-info">
        <h3>{user.name}</h3>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
      </div>
    </div>
  );
};

export default Profile;
