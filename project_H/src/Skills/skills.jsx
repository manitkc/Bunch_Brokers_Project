import './skills.css'



export function skills({ skillsData }) {
  return (
    <div className="skills_total">
      <h2 className="skills_title">My skills:</h2>
      {skillsData.map((skills, index) => (
        <div key={index} className="individual_skills">
          <h3 className="skill_name">{skills.degree_name}</h3>
          <h4 className="skill_level">{skills.start_date} - {skills.end_date}</h4>
          <p>{skills.description}</p>
        </div>
      ))}
    </div>
  );
}
