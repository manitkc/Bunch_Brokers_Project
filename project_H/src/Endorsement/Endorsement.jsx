import './Endorsement.css';
export default function Endorsements({ data }) {

 console.log (data )

  return (
    <div className="endorsements_container">
      <h2 className="endorsements_heading">Endorsements</h2>
      {data.map((endorsement, index) => ( 
        <div key={index} className="endorsement_card">
          <h3 className="endorser_name">Endorsed by {endorsement.profiles.first_name} {endorsement.profiles.last_name}  </h3>
          <p className="endorsement_text">{endorsement.description}</p>
        </div>
      ))}
    </div>
  );
}