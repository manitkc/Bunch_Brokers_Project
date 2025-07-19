import './Achievement.css'

const achievements = [{
    name: "a1",
    description: "very easy",
    time: "2021"
},
{
    name: "a2",
    description:"very hard",
    time: "2020"
}, 
{
    name: "a3",
    description:"easy",
    time: "2022"
}]

export function Achievements() {
    return (
        <div className="achievement-container">
            <h1 className="title"> Achievements </h1>
            {achievements.map((achievement, index) => (
             <div key={index} className = "achievementEl">
                <p>{achievement.name} - {achievement.time}</p>
                <div>
                    <p>{achievement.description}</p>
                </div>
            </div>
            ))}
        </div>
    )
}