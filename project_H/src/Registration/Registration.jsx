import React, { useState } from "react";
import supabase from "../SupabaseClient.js";
import { useNavigate } from 'react-router-dom';
import './Registration.css';


const Registration = () => {
const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        dob: "",
        aboutMe: "",
        profile_url: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        supabase.auth.signUp({
            email: form.email,
            password: form.password,
        }).then(({ data, error }) => {
            if (error) {
                console.error("Error signing up:", error);
            }
            if (!error) {
                console.log("User signed up successfully:", data);
                console.log(data.user.id);
                supabase.from('profiles').insert([
                    {
                        user_id: data.user.id,
                        first_name: form.firstname,
                        last_name: form.lastname,
                        dob: form.dob,
                        description: form.aboutMe,
                        profile_url: form.profile_url,
                    }
                ]).then(({ data, error }) => {
                    if (error) {
                        console.error("Error inserting profile:", error);
                    } else {
                        console.log("Profile created successfully:", data);
                    }
                })
                navigate('/HomePage');
            }
        });
    };

    return (
 <form class="registration-form">
        <h2 class="form-title">REGISTRATION</h2>
        
        <div class="form-row">
            <label>Email</label>
            <input
                type="email"
                name="email"
                required
            />
        </div>

        <div class="form-row">
            <label>First Name</label>
            <input
                type="text"
                name="firstname"
                required
            />
        </div>

        <div class="form-row">
            <label>Last Name</label>
            <input
                type="text"
                name="lastname"
                required
            />
        </div>

        <div class="form-row">
            <label>Password</label>
            <input
                type="password"
                name="password"
                required
            />
        </div>

        <div class="form-row">
            <label>Date of Birth:</label>
            <input
                type="text"
                name="dob"
                placeholder="YYYY-MM-DD"
                required
            />
        </div>

        <div class="form-row">
            <label>About Me:</label>
            <textarea
                name="aboutMe"
                rows="4"
            ></textarea>
        </div>

        <div class="form-row">
            <label>Profile URL:</label>
            <input
                type="text"
                name="profile_url"
            />
        </div>

        <button type="submit">Register</button>
    </form>
    );
};

export default Registration;