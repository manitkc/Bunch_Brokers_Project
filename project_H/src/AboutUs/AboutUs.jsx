import './AboutUs.css'

const aboutUsData = {
    description: "I'm a passionate developer who loves creating amazing web experiences. I specialize in React and enjoy solving complex problems with clean, efficient code."
}

export function AboutUs({aboutUsData}) {
    return (
      
        <div className="about-container">
            <h1 className="title">About Me</h1>
            <p className="description">{aboutUsData.description}</p>
        </div>
    )
}