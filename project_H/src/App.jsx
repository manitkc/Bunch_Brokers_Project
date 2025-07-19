// App.jsx
import Skills from './Skills/skills.jsx';

function App() {
  const skillsData = [
    {
      degree_name: "JavaScript Development",
      start_date: "2020",
      end_date: "Present",
      description: "Proficient in modern JavaScript ES6+, React, Node.js, and full-stack development. Experience with building responsive web applications and RESTful APIs."
    },
    {
      degree_name: "Python Programming", 
      start_date: "2019",
      end_date: "Present",
      description: "Advanced knowledge in Python for web development with Django/Flask, data analysis with pandas, and machine learning with scikit-learn and TensorFlow."
    },
    {
      degree_name: "Database Management",
      start_date: "2018", 
      end_date: "Present",
      description: "Experience with SQL and NoSQL databases including PostgreSQL, MongoDB, and Redis. Database design, optimization, and performance tuning."
    }
  ];

  return (
    <div className="App">
      <Skills skillsData={skillsData} />
    </div>
  );
}

export default App;