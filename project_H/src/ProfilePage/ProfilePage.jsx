import React from "react";
import "./ProfilePage.css";

export default function ProfilePage() {
  return (
    <div className="profile-window">
      <div className="profile-header">
        <div className="profile-top">
          <img src="/default-pfp.jpg" alt="Profile" className="profile-pic" />

          <div className="profile-info">
            <div className="user-id">UserID</div>
            <div className="job-title">Job Title</div>
          </div>
          <div className="profile-buttons">
            <button className="pixel-button">LOG OUT</button>
            <button className="pixel-button">EDIT</button>
          </div>
        </div>

        <div className="profile-stats">
          <div>Account Created: Feb 14, 2022</div>
          <div>Account Level: 17</div>
          <div>Quests Completed: 142</div>
          <div>Memory Usage: 68%</div>
          <div>Login Streak: 5 days</div>
          <div>Messages Sent: 931</div>
        </div>

        <div className="delete-wrapper">
          <button className="pixel-button delete-button">DELETE</button>
        </div>
      </div>
    </div>
  );
}
