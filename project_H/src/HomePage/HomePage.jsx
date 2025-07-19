import {useEffect, useState} from "react";
import {fetchAboutUsInformation} from "../apis/api_client.js";

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://rqfparzhamjouldtggjf.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


export default function HomePage() {

    const user =

    const [aboutMe, setAboutMe] = useState("");
    const [achievement, setAchievement] = useState([]);
    const [certs, setCerts] = useState([]);
    const [education, setEducation] = useState([]);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        fetchAboutUsInformation().then(data => setAboutMe(data));


    }, []);


    return (
        <div>
            <div>{aboutMe}</div>
        </div>
    )


}