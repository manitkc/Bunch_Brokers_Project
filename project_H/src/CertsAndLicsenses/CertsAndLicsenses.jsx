import './CertsAndLicsenses.css'


export function CertsAndLicsenses({ certsData }) {
  return (
    <div className=" cert_total">
      <h1 className="cert_title">My certifications and licenses:</h1>
      {certsData.map((cert, index) => (
        <div key={index} className="certs_individual">
          <h3 className="cert_org">{cert.orgname}</h3> {/* org name variable might be different */}
          <p className='cert_name'> {cert.name}</p>
          <p className="cert_date">{cert.date}</p> 
        </div>
      ))}
    </div>
  );
}
