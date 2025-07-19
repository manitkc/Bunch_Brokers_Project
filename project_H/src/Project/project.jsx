import './Project.css'



export function Project({ projectData }) {
  return (
    <div className="project_total">
      <h2 className="project_title">My projects:</h2>
      {projectData.map((project, index) => (
        <div key={index} className="project_individual">
          <h3 className="project_name">{project.name}</h3>
          <p>{project.description}</p>
          <p><a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a></p>
          <p className="project_img"><img src={project.img} alt={project.name} /></p>
        </div>
      ))}
    </div>
  );
}
