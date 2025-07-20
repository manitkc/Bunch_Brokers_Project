import React, { useState } from "react";
import supabase from "../SupabaseClient.js";
import { useNavigate } from 'react-router-dom';

import '../Registration/Registration.css';

const RegistrationTwo = () => {
const navigate = useNavigate();

    const [form, setForm] = useState({
         experience: [{
            company: "",
            title: "",
            startDate: "",
            endDate: "",
            description: "",
         }],
    });

    const [experiences, setExperiences] = useState([{
        company: "",
        title: "",
        startDate: "",
        endDate: "",
        description: "",
    }]);

    const [user_id, setUserId] = useState("");
    
    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            experience: [{
                ...prev.experience[0],
                [name]: value
            }]
        }));
    };
    
    // Data fetching should go in useEffect
    React.useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
                setUserId(data.user.id);
                console.log("User ID:", data.user.id);
                console.log(user_id);
            });

        const fetchExperiences = async () => {
            if (user_id) {
                const { data, error } = await supabase
                    .from('experience')
                    .select('*')
                    .eq('user_id', user_id);
                
                if (error) {
                    console.error("Error fetching experience:", error);
                } else {
                    setExperiences(data);
                    console.log("Fetched experiences:", data);
                }
            }
        };

        fetchExperiences();
    }, [user_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);

        supabase.from('experience').insert([
            {
                company: form.experience[0].company,
                title: form.experience[0].title,
                start_date: form.experience[0].startDate,
                end_date: form.experience[0].endDate,
                description: form.experience[0].description,
                user_id: user_id 
            }
        ]).then(({ data, error }) => {
            if (error) {
                console.error("Error inserting experience:", error);
            } else {
                setForm({
                    experience: [{
                        company: "",
                        title: "",
                        startDate: "",
                        endDate: "",
                        description: "",
                    }]
                });
                // Clear form inputs
                document.querySelector('.experience-form').reset();
                // Trigger re-fetch of experiences
                const fetchExperiences = async () => {
                    if (user_id) {
                        const { data, error } = await supabase
                            .from('experience')
                            .select('*')
                            .eq('user_id', user_id);
                        
                        if (error) {
                            console.error("Error fetching experience:", error);
                        } else {
                            setExperiences(data);
                            console.log("Fetched experiences:", data);
                        }
                    }
                };
                fetchExperiences();
                console.log("Experience added successfully:", data);
            }
        });

    };

    return (
        <div className="registration-container">
            <h2 className="form-title">EXPERIENCE</h2>
            

            {experiences.map((exp, index) => (
                <div key={index} className="experience-card">
                    <div className="card-header">
                        <h3 className="company-name">{exp.company || "Company Name"}</h3>
                        <span className="job-title">{exp.title || "Job Title"}</span>
                    </div>
                    <div className="card-body">
                        <div className="date-range">
                            <span>{exp.start_date || "Start Date"} - {exp.end_date || "End Date"}</span>
                        </div>
                        <p className="job-description">{exp.description || "Job description..."}</p>
                    </div>
                </div>
            ))}
            <form onSubmit={handleSubmit} className="experience-form">
                <div className="form-row">    
                    <label>Company:</label>
                    <input
                        type="text"
                        name="company"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-row">
                    <label>Job Title:</label>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-row">
                    <label>Start Date:</label>
                    <input
                        type="text"
                        name="startDate"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-row">
                    <label>End Date:</label>
                    <input
                        type="text"
                        name="endDate"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-row">
                    <label>Description:</label>
                    <textarea
                        name="description"
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                    <button type="submit">Add Experience</button>
                <button onClick={() => navigate('/RegistrationEducation')} className="next-step-button">Next Step</button>
                </form>
            </div>
    );
};

export default RegistrationTwo;