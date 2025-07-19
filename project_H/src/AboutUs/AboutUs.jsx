import './AboutUs.css'


export function AboutUs({data}) {
    return (
      
        <div className="about-container">
            <h1 className="title">About Me</h1>
            <p className="description">{data}</p>
        </div>
    )
}