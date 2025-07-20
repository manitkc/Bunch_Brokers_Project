import React, { useState, useEffect } from 'react';
import supabase from "../SupabaseClient.js";
import { useNavigate } from 'react-router-dom';

import '../Registration/Registration.css';


const RegistrationAchievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [userId, setUserId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
                        
            const { data, error } = await supabase
                .from('achievements')
                .select('*')
                .eq('user_id', user?.id)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            setAchievements(data || []);
        } catch (error) {
            console.error('Error fetching achievements:', error);
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
                .from('achievements')
                .insert([{
                    ...formData,
                    user_id: user?.id
                }]);

            if (error) throw error;

            setFormData({
                title: '',
                description: ''
            });
            
            fetchAchievements();
        } catch (error) {
            console.error('Error adding achievement:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Achievements Management</h1>
            
            {/* Achievements List */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Your Achievements</h2>
                {achievements.length > 0 ? (
                    <div className="space-y-4">
                        {achievements.map((achievement) => (
                            <div key={achievement.id} className="border p-4 rounded-lg">
                                <h3 className="font-semibold">{achievement.title}</h3>
                                <p className="text-gray-600">{achievement.description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No achievements found.</p>
                )}
            </div>

            {/* Add Achievement Form */}
            <div className="border-t pt-8">
                <h2 className="text-xl font-semibold mb-4">Add New Achievement</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            rows="4"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isLoading ? 'Adding...' : 'Add Achievement'}
                    </button>
                </form>
                <button onClick={() => navigate('NextStep')}>Next Step</button>
            </div>
        </div>
    );
};

export default RegistrationAchievements;