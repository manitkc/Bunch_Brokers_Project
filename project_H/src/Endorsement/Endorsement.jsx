import './Endorsement.css'; 

export default function Endorsements({ endorsementsData }) {
  return (
    <div className="endorsements_container">
      <h2 className="endorsements_heading">Endorsements</h2>
      {endorsementsData.map((endorsement, index) => ( 
        <div key={index} className="endorsement_card">
          <h3 className="endorser_name">Endorsed by {endorsement.name}</h3>
          <h4 className="endorsed_skills">Skills: {endorsement.skills_endorsed.join(', ')}</h4>
          <p className="endorsement_text">{endorsement.description}</p>
        </div>
      ))}
    </div>
  );
}