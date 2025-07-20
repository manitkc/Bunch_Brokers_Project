
import React, { useState } from "react";
import "./JobPage.css";

// Mock job data
const jobs = [
  {
    id: 1,
    title: "Cloud Infrastructure Intern",
    description: "Assist in provisioning and managing cloud-native environments.",
    fitScore: 88, // High compatibility
    applicants: 8,
    requiredSkills: [
      { name: "Terraform", level: 4 },
      { name: "Docker", level: 3 },
      { name: "Kubernetes", level: 3 }
    ]
  },
  {
    id: 2,
    title: "Backend Developer (Node.js)",
    description: "Maintain server-side logic and REST APIs using Node.js and PostgreSQL.",
    fitScore: 72, // Medium-high
    applicants: 16,
    requiredSkills: [
      { name: "Node.js", level: 3 },
      { name: "PostgreSQL", level: 4 },
      { name: "SQL", level: 3 }
    ]
  },
  {
    id: 3,
    title: "Frontend Intern (React)",
    description: "Help build interactive UIs using React and TypeScript.",
    fitScore: 60, // Medium
    applicants: 25,
    requiredSkills: [
      { name: "React", level: 3 },
      { name: "TypeScript", level: 3 },
      { name: "JavaScript", level: 4 }
    ]
  },
  {
    id: 4,
    title: "Data Analyst Assistant",
    description: "Write queries and transform data for reporting and dashboards.",
    fitScore: 80, // High
    applicants: 11,
    requiredSkills: [
      { name: "SQL", level: 5 },
      { name: "PostgreSQL", level: 5 },
      { name: "Python", level: 4 }
    ]
  },
  {
    id: 5,
    title: "DevOps Trainee",
    description: "Support CI/CD pipelines and container orchestration.",
    fitScore: 66, // Medium
    applicants: 19,
    requiredSkills: [
      { name: "Docker", level: 4 },
      { name: "Kubernetes", level: 4 },
      { name: "Coding", level: 6 }
    ]
  },
  {
    id: 6,
    title: "Junior API Engineer",
    description: "Develop and maintain APIs with modern JS frameworks.",
    fitScore: 50, // Lower compatibility
    applicants: 21,
    requiredSkills: [
      { name: "JavaScript", level: 4 },
      { name: "TypeScript", level: 5 },
      { name: "Node.js", level: 5 }
    ]
  }
];

// Possible application statuses
const statuses = ["Applied", "Interview", "Offer", "Rejected"];

export default function JobPage() {
  const [availableJobs, setAvailableJobs] = useState(jobs);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState("jobs"); // 'jobs' or 'applied'
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showSkillsPopup, setShowSkillsPopup] = useState(false);
  const [acceptedJob, setAcceptedJob] = useState(null);

  // Apply to job handler
  const handleApply = (job) => {
    setSelectedJob(job);
    setShowPopup(true);
  };

  const confirmApply = () => {
    if (selectedJob) {
      const status = statuses[0]; // Start with "Applied"
      setAppliedJobs((prev) => [...prev, { ...selectedJob, status }]);
      setAvailableJobs((prev) => prev.filter((job) => job.id !== selectedJob.id));
      setShowPopup(false);
      setSelectedJob(null);
    }
  };

  const cancelApply = () => {
    setShowPopup(false);
    setSelectedJob(null);
  };

  // Cancel application handler
  const handleCancelApplication = (jobId) => {
    const cancelledJob = appliedJobs.find(job => job.id === jobId);
    if (cancelledJob && cancelledJob.status === "Applied") {
      setAppliedJobs(prev => prev.filter(job => job.id !== jobId));
      setAvailableJobs(prev => [...prev, cancelledJob].sort((a, b) => a.id - b.id));
    }
  };

  // Accept offer handler
  const handleAcceptOffer = (job) => {
    setAcceptedJob(job);
    setShowSkillsPopup(true);
    // Remove from applied jobs after accepting
    setTimeout(() => {
      setAppliedJobs(prev => prev.filter(j => j.id !== job.id));
    }, 2000);
  };

  // Reject offer handler
  const handleRejectOffer = (jobId) => {
    setAppliedJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: "Rejected" } : job
    ));
  };

  // Simulate status progression (for demo)
  const progressStatus = (jobId) => {
    setAppliedJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        const currentIndex = statuses.indexOf(job.status);
        const nextIndex = (currentIndex + 1) % statuses.length;
        return { ...job, status: statuses[nextIndex] };
      }
      return job;
    }));
  };

  // Get skill level display
  const getSkillLevel = (level) => {
    return "★".repeat(level) + "☆".repeat(10 - level);
  };

  // Filtered list based on Fit Score
  const filteredJobs =
    filter === "All"
      ? availableJobs
      : availableJobs.filter((job) =>
          filter === "High"
            ? job.fitScore > 85
            : filter === "Medium"
            ? job.fitScore > 70
            : job.fitScore <= 70
        );

  return (
    <div className="job-page">
      <div className="job-header">
        <h2>{view === "jobs" ? "Available Jobs" : "Jobs You've Applied To"}</h2>
        <div className="header-buttons">
          <div className="view-buttons">
            <button className="pixel-button" onClick={() => setView("jobs")}>
              View Jobs
            </button>
            <button className="pixel-button" onClick={() => setView("applied")}>
              View Applied
            </button>
          </div>
          {view === "jobs" && (
            <div className="job-filters">
              {["All", "High", "Medium", "Low"].map((level) => (
                <button
                  key={level}
                  className={`pixel-button ${filter === level ? "active" : ""}`}
                  onClick={() => setFilter(level)}
                >
                  {level} Fit
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="job-content">
        {view === "jobs" ? (
          <div className="job-list">
            {filteredJobs.length === 0 ? (
              <p className="no-jobs">No jobs available with this filter.</p>
            ) : (
              filteredJobs.map((job) => (
                <div key={job.id} className="job-card">
                  <h3>{job.title}</h3>
                  <p className="description">{job.description}</p>
                  <div className="skills-section">
                    <p className="skills-title">Required Skills:</p>
                    <div className="skills-list">
                      {job.requiredSkills.map((skill, index) => (
                        <div key={index} className="skill-item">
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-level">{getSkillLevel(skill.level)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="job-stats">
                    <p>Fit Score: <span className="fit-score">{job.fitScore}%</span></p>
                    <p>Applicants: <span className="applicant-count">{job.applicants}</span></p>
                  </div>
                  <button
                    className="pixel-button apply-button"
                    onClick={() => handleApply(job)}
                  >
                    APPLY
                  </button>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="job-list">
            {appliedJobs.length === 0 ? (
              <p className="no-jobs">No jobs applied yet.</p>
            ) : (
              appliedJobs.map((job, index) => (
                <div key={index} className={`job-card applied-card status-${job.status.toLowerCase()}`}>
                                    <h3>{job.title}</h3>
                  <p className="description">{job.description}</p>
                  <div className="skills-section">
                    <p className="skills-title">Required Skills:</p>
                    <div className="skills-list">
                      {job.requiredSkills.map((skill, index) => (
                        <div key={index} className="skill-item">
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-level">{getSkillLevel(skill.level)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="job-stats">
                    <p>Status: <span className={`status status-${job.status.toLowerCase()}`}>{job.status}</span></p>
                    <p>Fit Score: <span className="fit-score">{job.fitScore}%</span></p>
                    <p>Applicants: <span className="applicant-count">{job.applicants}</span></p>
                  </div>
                  <div className="action-buttons">
                    {job.status === "Applied" && (
                      <button 
                        className="pixel-button cancel-application-button"
                        onClick={() => handleCancelApplication(job.id)}
                      >
                        CANCEL APPLICATION
                      </button>
                    )}
                    {job.status === "Offer" && (
                      <>
                        <button 
                          className="pixel-button accept-button"
                          onClick={() => handleAcceptOffer(job)}
                        >
                          ACCEPT OFFER
                        </button>
                        <button 
                          className="pixel-button reject-button"
                          onClick={() => handleRejectOffer(job.id)}
                        >
                          REJECT OFFER
                        </button>
                      </>
                    )}
                    {/* Demo button to progress status */}
                    {job.status !== "Rejected" && job.status !== "Offer" && (
                      <button 
                        className="pixel-button progress-button"
                        onClick={() => progressStatus(job.id)}
                      >
                        PROGRESS STATUS (DEMO)
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Apply Popup Modal */}
      {showPopup && selectedJob && (
        <div className="popup-overlay" onClick={cancelApply}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>Apply to {selectedJob.title}?</h3>
            <div className="popup-info">
              <p className="job-desc">{selectedJob.description}</p>
              <div className="skills-section">
                <p className="skills-title">Required Skills:</p>
                <div className="skills-list">
                  {selectedJob.requiredSkills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{getSkillLevel(skill.level)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="popup-stats">
                <div className="stat-item">
                  <span className="stat-label">Current Applicants:</span>
                  <span className="stat-value">{selectedJob.applicants}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Your Fit Score:</span>
                  <span className="stat-value">{selectedJob.fitScore}%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Estimated Chance:</span>
                  <span className={`stat-value chance-${
                    selectedJob.fitScore > 85 ? "high" : 
                    selectedJob.fitScore > 70 ? "medium" : "low"
                  }`}>
                    {selectedJob.fitScore > 85 ? "HIGH" : 
                     selectedJob.fitScore > 70 ? "MODERATE" : "LOW"}
                  </span>
                </div>
              </div>
            </div>
            <div className="popup-buttons">
              <button className="pixel-button confirm-button" onClick={confirmApply}>
                CONFIRM
              </button>
              <button className="pixel-button cancel-button" onClick={cancelApply}>
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skills Improvement Popup */}
      {showSkillsPopup && acceptedJob && (
        <div className="popup-overlay" onClick={() => setShowSkillsPopup(false)}>
          <div className="popup-content skills-popup" onClick={(e) => e.stopPropagation()}>
            <h3>Congratulations!</h3>
            <p className="congrats-text">You've joined as {acceptedJob.title}!</p>
            <div className="skills-improvement">
              <p className="improvement-title">Your skills will improve:</p>
              {acceptedJob.requiredSkills.map((skill, index) => (
                <div key={index} className="skill-improvement-item">
                  <span className="skill-name">{skill.name}</span>
                  <div className="skill-progress">
                    <span className="current-level">{getSkillLevel(Math.max(1, skill.level - 1))}</span>
                    <span className="arrow">→</span>
                    <span className="new-level">{getSkillLevel(skill.level)}</span>
                  </div>
                  <span className="improvement-text">+{Math.floor(Math.random() * 3) + 1} levels</span>
                </div>
              ))}
            </div>
            <button 
              className="pixel-button confirm-button"
              onClick={() => setShowSkillsPopup(false)}
            >
              AWESOME!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}