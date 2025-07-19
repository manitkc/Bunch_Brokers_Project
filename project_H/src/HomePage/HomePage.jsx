// HomePage.jsx
import { useEffect, useState, useRef } from "react";
import supabase from "../SupabaseClient.js";
import {
    fetchAboutUsInformation,
    fetchCertsInformation,
    fetchEducationInformation,
    fetchEndorsementInformation,
    fetchProjectInformation,
    fetchSkillsInformation,
    fetchWorkExperienceInformation,
} from "../api/api_client.js";
import { AboutUs } from "../AboutUs/AboutUs.jsx";
import { Achievements } from "../Achievement/Achievement.jsx";
import { CertsAndLicsenses } from "../CertsAndLicsenses/CertsAndLicsenses.jsx";
import { Education } from "../Education/Education.jsx";
import { Project } from "../Project/project.jsx";
import Skills from "../Skills/skills.jsx";

import "./HomePage.css";

export default function HomePage() {
    const [userId, setUserId] = useState(null);
    const [aboutMe, setAboutMe] = useState("");
    const [achievement, setAchievement] = useState([]);
    const [certs, setCerts] = useState([]);
    const [education, setEducation] = useState([]);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [experience, setExperience] = useState([]);
    const [popup, setPopup] = useState(null);
    const [lines, setLines] = useState([]);

    const skillsRef = useRef();
    const experienceRef = useRef();
    const projectsRef = useRef();
    const educationRef = useRef();
    const valuesRef = useRef();
    const endorsementsRef = useRef();
    const spriteRef = useRef();

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
                const [aboutRows, certRows, eduRows, endorseRows, projRows, skillRows, expRows] = await Promise.all([
                    fetchAboutUsInformation(userId),
                    fetchCertsInformation(userId),
                    fetchEducationInformation(userId),
                    fetchEndorsementInformation(userId),
                    fetchProjectInformation(userId),
                    fetchSkillsInformation(userId),
                    fetchWorkExperienceInformation(userId),
                ]);
                setAboutMe(aboutRows?.[0]?.description ?? "");
                setCerts(certRows || []);
                setEducation(eduRows || []);
                setAchievement(endorseRows || []);
                setProjects(projRows || []);
                setSkills(skillRows || []);
                setExperience(expRows || []);
            } catch (e) {
                console.error("Error loading profile data:", e);
            }
        }
        loadAll();
    }, [userId]);

    useEffect(() => {
        const updateLines = () => {
            const boxes = [skillsRef, experienceRef, projectsRef, educationRef, valuesRef, endorsementsRef];
            const spriteBox = spriteRef.current?.getBoundingClientRect();
            if (!spriteBox) return;
            const spriteCenter = {
                x: spriteBox.left + spriteBox.width / 2,
                y: spriteBox.top + spriteBox.height / 2,
            };
            const newLines = boxes.map((ref) => {
                const box = ref.current?.getBoundingClientRect();
                if (!box) return null;

                let startX, startY;

                if (ref === skillsRef) {
                    startX = box.right;
                    startY = box.bottom;
                } else if (ref === experienceRef) {
                    startX = box.left;
                    startY = box.bottom;
                } else {
                    const dx = spriteCenter.x - (box.left + box.width / 2);
                    const dy = spriteCenter.y - (box.top + box.height / 2);
                    if (Math.abs(dx) > Math.abs(dy)) {
                        startX = dx > 0 ? box.right : box.left;
                        startY = box.top + box.height / 2;
                    } else {
                        startX = box.left + box.width / 2;
                        startY = dy > 0 ? box.bottom : box.top;
                    }
                }

                return {
                    x1: startX,
                    y1: startY,
                    x2: spriteCenter.x,
                    y2: spriteCenter.y,
                };
            }).filter(Boolean);
            setLines(newLines);
        };

        updateLines();
        window.addEventListener("resize", updateLines);
        window.addEventListener("scroll", updateLines);
        return () => {
            window.removeEventListener("resize", updateLines);
            window.removeEventListener("scroll", updateLines);
        };
    }, []);

    const popupContent = {
        skills: <Skills data={skills} />,
        projects: <Project data={projects} />,
        education: <Education data={education} />,
        endorsements: <Achievements data={achievement} />,
        values: <AboutUs data={aboutMe} />,
        experience: (
            <div>
                {experience.map((exp, i) => (
                    <div key={i}>
                        <p>{exp.role} at {exp.company}</p>
                        <p>{exp.description}</p>
                    </div>
                ))}
            </div>
        ),
    };

    return (
        <div className="home-container">
            <div ref={skillsRef} className="box skills" onClick={() => setPopup("skills")}>Skills</div>
            <div ref={experienceRef} className="box experience" onClick={() => setPopup("experience")}>Experience</div>
            <div ref={projectsRef} className="box projects" onClick={() => setPopup("projects")}>Projects</div>
            <div ref={educationRef} className="box education" onClick={() => setPopup("education")}>Education</div>
            <div ref={valuesRef} className="box values" onClick={() => setPopup("values")}>Values</div>
            <div ref={endorsementsRef} className="box endorsements" onClick={() => setPopup("endorsements")}>Endorsements</div>

            <svg className="connect-svg">
                {lines.map((line, i) => (
                    <line
                        key={i}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        className="line"
                    />
                ))}
            </svg>

            <div className="sprite-container">
                <img ref={spriteRef} src="/sprite.png" alt="Character" className="sprite" />
            </div>

            <button className="pixel-button back">BACK</button>
            <button className="pixel-button edit">EDIT</button>

            {popup && (
                <div className="popup-overlay" onClick={() => setPopup(null)}>
                    <div className="popup-box" onClick={(e) => e.stopPropagation()}>
                        {popupContent[popup]}
                        <button className="pixel-button close" onClick={() => setPopup(null)}>CLOSE</button>
                    </div>
                </div>
            )}
        </div>
    );
}
