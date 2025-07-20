import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Briefcase,
    GraduationCap,
    Code2,
    Award,
    Heart,
    X,
    ArrowLeft,
    Sparkles
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import supabase from "../SupabaseClient.js";
// ... (keep your other imports the same)

export default function HomePage({ userId, userData, onBack, returnToSelf }) {
    // ... (keep your existing state and effects)

    return (
        <div className="home-container">
            <div className="animated-bg" />

            <motion.div
                className="header"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="portfolio-title">{getDisplayTitle()}</h1>
            </motion.div>

            <div className="main-content">
                {/* Centered Character */}
                <motion.div
                    className="center-profile"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="profile-image-container">
                        <motion.img
                            src="/sprite.png"
                            alt="Profile"
                            className="profile-image"
                            whileHover={{ scale: 1.05 }}
                        />
                        <div className="profile-ring" />
                        <div className="profile-ring ring-2" />
                    </div>
                </motion.div>

                {/* Sections arranged around the character */}
                <div className="sections-grid">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.id}
                            className="section-card"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 100
                            }}
                            whileHover={{
                                scale: 1.1,
                                y: -5,
                                transition: {
                                    duration: 0.2,
                                    type: "spring",
                                    stiffness: 400
                                }
                            }}
                        >
                            <div className={`gradient-bg ${section.color}`} />
                            <section.icon className="section-icon" size={32} />
                            <h3 className="section-title">{section.title}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="navigation-buttons">
                {!isViewingOtherProfile && (
                    <motion.button
                        className="friends-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/Friends')}
                    >
                        Friends
                    </motion.button>
                )}

                {isViewingOtherProfile && onBack && (
                    <motion.button
                        className="back-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => returnToSelf ? navigate('/HomePage') : onBack()}
                    >
                        <ArrowLeft size={20} />
                        Back
                    </motion.button>
                )}
            </div>

            {/* ... (keep your modal code the same) ... */}
        </div>
    );
}