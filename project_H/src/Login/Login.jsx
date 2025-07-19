import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import './Login.css'; 
import { useNavigate } from 'react-router-dom';

const supabaseUrl = 'https://rqfparzhamjouldtggjf.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


export default function Login() {
    const [form, setForm] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        supabase.auth.signInWithPassword({
            email: form.username,
            password: form.password
        }).then(({ data, error }) => {console.log(data, error) })
        
        console.log('Login submitted:', form);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};