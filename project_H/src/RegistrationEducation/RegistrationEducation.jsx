import React, { useState, useEffect } from 'react';
import supabase from "../SupabaseClient.js";
import { useNavigate } from 'react-router-dom';

const RegistrationEducation = () => {
    const [educations, setEducations] = useState([]);
    const [userId, setUserId] = useState(null);
    const [formData, setFormData] = useState({
        school_name: '',
        degree_name: '',
        start_date: '',
        end_date: '',
        description: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEducations();
    }, []);

    const fetchEducations = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
                        
                        const { data, error } = await supabase
                            .from('education')
                            .select('*')
                            .eq('user_id', user?.id)
                            .order('created_at', { ascending: false });
            
            if (error) throw error;
            setEducations(data || []);
        } catch (error) {
            console.error('Error fetching educations:', error);
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
                .from('education')
                .insert([{
                    ...formData,
                    user_id: user?.id
                }]);

            if (error) throw error;

            setFormData({
                school_name: '',
                degree_name: '',
                start_date: '',
                end_date: '',
                description: ''
            });
            
            fetchEducations();
        } catch (error) {
            console.error('Error adding education:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Education Management</h1>
            
            {/* Education List */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Your Education</h2>
                    <div className="space-y-4">
                        {educations.map((education) => (
                            <div key={education.id} className="border p-4 rounded-lg">
                                <h3 className="font-semibold">{education.degree_name}</h3>
                                <p className="text-gray-600">{education.school_name}</p>
                                <p className="text-sm text-gray-500">
                                    {education.start_date} - {education.end_date}
                                </p>
                                {education.description && (
                                    <p className="mt-2 text-gray-700">{education.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
            </div>

            {/* Add Education Form */}
            <div className="border-t pt-8">
                <h2 className="text-xl font-semibold mb-4">Add New Education</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">School Name</label>
                        <input
                            type="text"
                            name="school_name"
                            value={formData.school_name}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Degree Name</label>
                        <input
                            type="text"
                            name="degree_name"
                            value={formData.degree_name}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Start Date</label>
                            <input
                                type="text"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">End Date</label>
                            <input
                                type="text"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            placeholder="Optional description..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isLoading ? 'Adding...' : 'Add Education'}
                    </button>
                <button onClick={() => navigate('/RegistrationSkills')}>Next Step</button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationEducation;