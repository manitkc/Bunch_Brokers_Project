import './skills.css';

export default function Skills({ skillsData }) {
  
  return (
    <div className="skills_total">
      <h2 className="skills_title">My skills:</h2>
      {skillsData.map((skill, index) => ( 
        <div key={index} className="individual_skills">
          <h3 className="skill_name">{skill.degree_name}</h3>
          <h4 className="skill_level">{skill.start_date} - {skill.end_date}</h4>
          <p>{skill.description}</p>
        </div>
      ))}
    </div>
  );
}