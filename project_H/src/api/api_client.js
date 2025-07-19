import supabase from "../SupabaseClient.js";


export async function fetchAboutUsInformation(userId) {
    const { data } = await supabase
        .from('profiles')
        .select('description')
        .eq('user_id', userId)

    return data;
}

export async function fetchAchievementsInformatin(userId) {
    const {data} = await supabase
        .from('achievements')
        .select('*')
          .eq('user_id', userId)
}

export async function fetchCertsInformation(userId) {
    const { data } = await supabase
        .from('licenses_certs')
        .select('*')
        .eq('user_id', userId)

    return data;
}

export async function fetchEducationInformation(userId) {
    const { data } = await supabase
        .from('education')
        .select('*')
        .eq('user_id', userId)

    return data;
}

export async function fetchEndorsementInformation(userId) {
    const { data } = await supabase
        .from('endorsements')
        .select(`id, created_at, endorser_id, endorsed_id, skills_id, description, profiles:endorser_id (first_name, last_name)`)
       // .select('*')
        .eq('endorsed_id', userId)

    return data;
}



export async function fetchProjectInformation(userId) {
    const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)

    return data;
}

export async function fetchSkillsInformation(userId) {
    const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)

    return data;
}

export async function fetchWorkExperienceInformation(userId) {
    const { data } = await supabase
        .from('experience')
        .select('*')
        .eq('user_id', userId)

    return data;
}











