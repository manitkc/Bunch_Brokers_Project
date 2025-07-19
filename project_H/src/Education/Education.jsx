import './Education.css'


export function Education({data}) {
    
    console.log ( data )

    return (
        <div className="educations_total">
            {data.map((education, index) => (
                <div key={index} className="individual_education">
                    <h2 className="school_name">{education.school_name}</h2>
                    <h4 className="degree_name">{education.degree_name}</h4>
                    <h4 className="dates">{education.start_date} - {education.end_date}</h4>
                    <p>{data.description}</p>
                </div>
            ))}
        </div>
    )
}