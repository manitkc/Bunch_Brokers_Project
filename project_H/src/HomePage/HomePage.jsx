import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Briefcase, 
    GraduationCap, 
    Code2, 
    Award, 
    Heart, 
    Star, 
    X, 
    Edit3,
    ArrowLeft,
    Sparkles
} from "lucide-react";
import supabase from "../SupabaseClient.js";
import {
    fetchAboutUsInformation,
    fetchAchievementsInformation,
    fetchCertsInformation,
    fetchEducationInformation,
    fetchEndorsementInformation,
    fetchProjectInformation,
    fetchSkillsInformation,
    fetchWorkExperienceInformation,
} from "../api/api_client.js";


import {AboutUs} from "../AboutUs/AboutUs.jsx";
import {Achievements} from "../Achievement/Achievement.jsx";
import {CertsAndLicsenses} from "../CertsAndLicsenses/CertsAndLicsenses.jsx";
import {Education} from "../Education/Education.jsx";
import Project from "../Project/project.jsx";
import Skills from "../Skills/skills.jsx";
import Endorsements from "../Endorsement/Endorsement.jsx";
import {WorkExperience} from "../WorkExperience/workExperience.jsx";


import "./HomePage.css";

const sections = [
    { id: 'skills', title: 'Skills', icon: Code2, color: 'from-green-600 to-green-400' },
    { id: 'experience', title: 'Experience', icon: Briefcase, color: 'from-emerald-600 to-emerald-400' },
    { id: 'projects', title: 'Projects', icon: Sparkles, color: 'from-lime-600 to-lime-400' },
    { id: 'education', title: 'Education', icon: GraduationCap, color: 'from-teal-600 to-teal-400' },
    { id: 'values', title: 'About Me', icon: Heart, color: 'from-green-700 to-green-500' },
    { id: 'endorsements', title: 'Achievements', icon: Award, color: 'from-emerald-700 to-emerald-500' },
];


export default function HomePage() {
    const [userId, setUserId] = useState(null);
    const [aboutMe, setAboutMe] = useState("");
    const [achievement, setAchievement] = useState([]);
    const [certs, setCerts] = useState([]);
    const [education, setEducation] = useState([]);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [experience, setExperience] = useState([]);
    const [endorsement, setEndorsement] = useState([])

    const [popup, setPopup] = useState(null);
    const [hoveredSection, setHoveredSection] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);


    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user }, error }) => {
            if (error) console.error("Error fetching user:", error);
            else if (user) setUserId(user.id);
        });
    }, []);

    useEffect(() => {
        if (!userId) return;
        async function loadAll() {
            try {
                const [
                    aboutRows,
                    certRows,
                    eduRows,
                    achievements,
                    endorseRows,
                    projRows,
                    skillRows,
                    expRows,
                ] = await Promise.all([
                    fetchAboutUsInformation(userId),       // returns [{ description }]
                    fetchCertsInformation(userId),         // returns array of cert rows
                    fetchEducationInformation(userId),     // array of education rows
                    fetchAchievementsInformation(userId),
                    fetchEndorsementInformation(userId),   // array of endorsements
                    fetchProjectInformation(userId),       // array of projects
                    fetchSkillsInformation(userId),        // array of skills
                    fetchWorkExperienceInformation(userId),// array of experiences
                ]);
                setAboutMe(aboutRows?.[0]?.description ?? "");
                setCerts(certRows || []);
                setEducation(eduRows || []);
                setAchievement(achievements || []);
                setEndorsement(endorseRows || []);
                setProjects(projRows || []);
                setSkills(skillRows || []);
                setExperience(expRows || []);
                console.log(endorsement);
            } catch (e) {
                console.error("Error loading profile data:", e);
            }
        }
        loadAll();
    }, [userId]);

    const popupContent = {
        skills: <Skills data={skills} />,
        projects: <Project data={projects} />,
        education: <Education data={education} />,
        endorsements: <Achievements data={achievement} />,
        values: <AboutUs data={aboutMe} />,
        experience: (
            <div className="space-y-6">
                {experience.map((exp, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="experience-item"
                    >
                        <h3 className="text-lg font-bold text-gray-800">{exp.role}</h3>
                        <p className="text-sm text-gray-600 mb-2">{exp.company}</p>
                        <p className="text-gray-700">{exp.description}</p>
                    </motion.div>
                ))}
            </div>
        ),
    };

    return (
        <div className="home-container">
            {/* Animated background */}
            <div className="animated-bg" />
            
            {/* Mouse follower */}
            <div 
                className="mouse-follower"
                style={{
                    transform: `translate(${mousePosition.x - 200}px, ${mousePosition.y - 200}px)`
                }}
            />

            {/* Header */}
            <motion.div 
                className="header"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="portfolio-title">My Portfolio</h1>
                <p className="portfolio-subtitle">Explore my professional journey</p>
            </motion.div>

            {/* Center profile */}
            <motion.div 
                className="center-profile"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <div className="profile-image-container">
                    <img src="/sprite.png" alt="Profile" className="profile-image" />
                    <div className="profile-ring" />
                    <div className="profile-ring ring-2" />
                </div>
            </motion.div>

            {/* Section cards */}
            <div className="sections-container">
                {sections.map((section, index) => {
                    const Icon = section.icon;
                    const angle = (index * 60) - 30;
                    const radius = 280;
                    const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
                    const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
                    
                    return (
                        <motion.div
                            key={section.id}
                            className={`section-card ${hoveredSection === section.id ? 'hovered' : ''}`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ 
                                opacity: 1, 
                                scale: 1,
                                x: x,
                                y: y
                            }}
                            transition={{ 
                                duration: 0.5, 
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 100
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setPopup(section.id)}
                            onMouseEnter={() => setHoveredSection(section.id)}
                            onMouseLeave={() => setHoveredSection(null)}
                        >
                            <div className={`gradient-bg bg-gradient-to-br ${section.color}`} />
                            <Icon className="section-icon" size={32} />
                            <h3 className="section-title">{section.title}</h3>
                            
                            {hoveredSection === section.id && (
                                <motion.div 
                                    className="connection-line"
                                    layoutId="connection"
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Navigation buttons */}
            <motion.button 
                className="nav-button back-button"
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
            >
                <ArrowLeft size={20} />
                <span>Back</span>
            </motion.button>

            <motion.button 
                className="nav-button edit-button"
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
            >
                <span>Edit Profile</span>
                <Edit3 size={20} />
            </motion.button>

            {/* Modal */}
            <AnimatePresence>
                {popup && (
                    <motion.div 
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setPopup(null)}
                    >
                        <motion.div 
                            className="modal-content"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                className="modal-close"
                                onClick={() => setPopup(null)}
                            >
                                <X size={24} />
                            </button>
                            
                                                   <div className="modal-header">
                                {(() => {
                                    const section = sections.find(s => s.id === popup);
                                    const Icon = section?.icon;
                                    return (
                                        <>
                                            {Icon && <Icon size={28} />}
                                            <h2>{section?.title}</h2>
                                        </>
                                    );
                                })()}
                            </div>
                            
                            <div className="modal-body">
                                {popupContent[popup]}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}