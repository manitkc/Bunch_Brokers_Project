import './project.css';

export default function Project({ data }) {
    console.log(data)
  return (
    <div className="projects-page">
      <h2 className="projects-title">MY PROJECTS</h2>
      <div className="projects-list">
        {data.map((project, index) => (
          <div key={index} className="project-card">
            <h3 className="project-name">{project.project_name}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tech">
              {project.technologies && project.technologies.map((tech, i) => (
                <span key={i} className="tech-tag">{tech}</span>
              ))}
            </div>
               <button 
              className="pixel-button view-button"
              onClick={() => window.open(project.link, '_blank')}
                >
              VIEW PROJECT
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}