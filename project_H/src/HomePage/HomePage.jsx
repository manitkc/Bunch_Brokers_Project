import { useEffect, useState } from "react";
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

    // 1) grab the logged-in user once
    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user }, error }) => {
            if (error) {
                console.error("Error fetching user:", error);
            } else if (user) {
                setUserId(user.id);
            }
        });
    }, []);

    // 2) once we have userId, fetch everything in parallel
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

                // pick out the single description
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

    return (
        <div>
            <AboutUs data={aboutMe} />
            <Achievements data={achievement} />
            <CertsAndLicsenses data={certs} />
            <Education data={education} />
            <Endorsements data={endorsement} />
            <Project data={projects} />
            <Skills data={skills} />
            <WorkExperience data={experience} />
        </div>
    );
}