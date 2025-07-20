import React, { useState, useEffect } from 'react';
import supabase from "../SupabaseClient.js";
import { useNavigate } from 'react-router-dom';

import '../Registration/Registration.css';

const RegistrationProjects = () => {
    const [projects, setProjects] = useState([]);
    const [userId, setUserId] = useState(null);
    const [formData, setFormData] = useState({
        project_name: '',
        description: '',
        link: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
                        
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('user_id', user?.id)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            setProjects(data || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
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
                .from('projects')
                .insert([{
                    ...formData,
                    user_id: user?.id
                }]);

            if (error) throw error;

            setFormData({
                project_name: '',
                description: '',
                link: ''
            });
            
            fetchProjects();
        } catch (error) {
            console.error('Error adding project:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Projects Management</h1>
            
            {/* Projects List */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
                    <div className="space-y-4">
                        {projects.map((project) => (
                            <div key={project.id} className="border p-4 rounded-lg">
                                <h3 className="font-semibold">{project.project_name}</h3>
                                <p className="text-gray-600">{project.description}</p>
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        View Project
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
            </div>

            {/* Add Project Form */}
            <div className="border-t pt-8">
                <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Project Name</label>
                        <input
                            type="text"
                            name="project_name"
                            value={formData.project_name}
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

                    <div>
                        <label className="block text-sm font-medium mb-1">Link (optional)</label>
                        <input
                            type="text"
                            name="link"
                            value={formData.link}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            placeholder="https://example.com"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isLoading ? 'Adding...' : 'Add Project'}
                    </button>
                </form>
                <button onClick={() => navigate('/HomePage')}>Next Step</button>
            </div>
        </div>
    );
};

export default RegistrationProjects;