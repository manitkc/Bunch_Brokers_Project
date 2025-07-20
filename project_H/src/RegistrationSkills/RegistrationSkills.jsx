import React, { useState, useEffect } from 'react';
import supabase from "../SupabaseClient.js";
import { useNavigate } from 'react-router-dom';

import '../Registration/Registration.css';

const RegistrationSkills = () => {
    const [skills, setSkills] = useState([]);
    const [userId, setUserId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        level: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
                        
            const { data, error } = await supabase
                .from('skills')
                .select('*')
                .eq('user_id', user?.id)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            setSkills(data || []);
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            
            const { data, error } = await supabase
                .from('skills')
                .insert([{
                    ...formData,
                    user_id: user?.id
                }]);

            if (error) throw error;

            setFormData({
                name: '',
                level: ''
            });
            
            fetchSkills();
        } catch (error) {
            console.error('Error adding skill:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Skills</h1>
            
            {/* Skills List */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Your Skills</h2>
                    <div className="space-y-4">
                        {skills.map((skill) => (
                            <div key={skill.id} className="border p-4 rounded-lg">
                                <h3 className="font-semibold">{skill.name}</h3>
                                <p className="text-gray-600">Level: {skill.level}</p>
                            </div>
                        ))}
                    </div>
            </div>

            {/* Add Skill Form */}
            <div className="border-t pt-8">
                <h2 className="text-xl font-semibold mb-4">Add New Skill</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Skill Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Level</label>
                        
                        <input 
                        type="number"
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isLoading ? 'Adding...' : 'Add Skill'}
                    </button>
                </form>
                <button onClick={() => navigate('/RegistrationProjects')}>Next Step</button>
            </div>
        </div>
    );
};

export default RegistrationSkills;