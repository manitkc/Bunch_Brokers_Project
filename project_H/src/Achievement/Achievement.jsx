import './Achievement.css';

export function Achievements({ data }) {
    return (
        <div className="achievements-page">
            <h2 className="achievements-title">ACHIEVEMENTS UNLOCKED</h2>
            <div className="achievements-list">
                {data.map((achievement, index) => (
                    <div key={index} className="achievement-card">
                        <div className="achievement-header">
                            <div className="achievement-titles">
                                <h3 className="achievement-title">{achievement.title}</h3>
                            </div>
                        </div>
                        <div className="achievement-content">
                            <p className="achievement-name">{achievement.name}</p>
                            <p className="achievement-time">{achievement.time}</p>
                            <p className="achievement-description">{achievement.description}</p>
                        </div>
                        <div className="achievement-badge">★</div>
                    </div>
                ))}
            </div>
        </div>
    );
}