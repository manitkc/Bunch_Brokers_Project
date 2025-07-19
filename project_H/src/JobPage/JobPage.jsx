import React, { useState } from "react";
import "./JobPage.css";

const jobs = [
  {
    title: "Junior Pixel Engineer",
    description: "Maintain retro UI components and fix pixel misalignments.",
    compatibility: "88%",
    difficulty: "Easy",
  },
  {
    title: "Quest System Designer",
    description: "Design quest progression logic for adventure games.",
    compatibility: "73%",
    difficulty: "Medium",
  },
  {
    title: "Boss AI Programmer",
    description: "Implement behavior trees for challenging end-level bosses.",
    compatibility: "62%",
    difficulty: "Hard",
  },
];

export default function JobPage() {
  const [filter, setFilter] = useState("All");

  const filteredJobs = filter === "All" ? jobs : jobs.filter(job => job.difficulty === filter);

  return (
    <div className="job-page">
      <div className="job-header">
        <h2>Available Jobs</h2>
        <div className="job-filters">
          {["All", "Easy", "Medium", "Hard"].map((level) => (
            <button
              key={level}
              className={`pixel-button ${filter === level ? "active" : ""}`}
              onClick={() => setFilter(level)}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="job-list">
        {filteredJobs.map((job, index) => (
          <div key={index} className="job-card">
            <h3>{job.title}</h3>
            <p className="description">{job.description}</p>
            <p>Compatibility: {job.compatibility}</p>
            <p>Difficulty: {job.difficulty}</p>
            <button className="pixel-button apply-button">APPLY</button>
          </div>
        ))}
      </div>
    </div>
  );
}
