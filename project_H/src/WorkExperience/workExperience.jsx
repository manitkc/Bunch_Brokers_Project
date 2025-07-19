import './workExperience.css'

export function WorkExperience({data}) {
  return (
      <div className="workExperience_total">
        {data.map((work, index) => (
            <div key={index} className="individual_experience">
              <h2 className="company_name">{work.title}</h2>
              <h4 className="description">{work.description}</h4>
              <h4 className="time">{work.start_date} - {work.end_date}</h4>
              <p>{work.description}</p>
            </div>
        ))}
      </div>
  )

}