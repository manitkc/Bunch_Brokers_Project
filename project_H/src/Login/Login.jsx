import React, { useState } from 'react';
import './Login.css'; 
import { useNavigate } from 'react-router-dom';
import supabase from "../SupabaseClient.js";

export default function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: form.username,
                password: form.password
            });

            if (error) {
                setError(error.message);
                console.error('Login error:', error);
            } else {
                console.log('Login successful:', data);
                navigate('/HomePage');
            }
        } catch (err) {
            setError('An unexpected error occurred');
            console.error('Unexpected error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <h1 className="app-title networked-effect">NETWORKED</h1>
                <div className="pixel-subtitle">
                    <div className="subtitle-content">
                        <span>ASPIRE</span>
                        <span className="bullet">•</span>
                        <span>ACHIEVE</span>
                        <span className="bullet">•</span>
                        <span className="highlight">AURAFARM</span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="email"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    className="pixel-button"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <button
                    onClick={() =>  navigate('/Registration')}
                    className="register-button"
                >
                    Register
                </button>
            </form>
        </div>
    );
}