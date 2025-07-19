import './skills.css';

export default function Skills({ data }) {
  return (
    <div className="skills-page">
      <h2 className="skills-title">MY SKILLS</h2>
      <div className="skills-list">
        {data.map((skill, index) => (
          <div key={index} className="skill-card">
            <div className="skill-header">
              <h3 className="skill-name">{skill.name}</h3>
              <span className="skill-level-text">LVL: {skill.level}/10</span>
            </div>
            <div className="skill-meter">
              <div 
                className="skill-meter-fill"
                style={{ width: `${skill.level * 10}%` }}
              ></div>
              <div className="skill-meter-ticks">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="skill-meter-tick"></div>
                ))}
              </div>
            </div>
            {skill.description && <p className="skill-description">{skill.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}