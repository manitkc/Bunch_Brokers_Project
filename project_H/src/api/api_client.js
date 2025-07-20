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

export async function fetchAchievementsInformation(userId) {
    const { data } = await supabase
        .from('achievements')
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
        .from('skills')
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

// Update an existing skill
export async function updateSkill(skillId, updates) {
    const { data, error } = await supabase
        .from('skills')
        .update(updates)
        .eq('id', skillId)
        .select()
    
    if (error) throw error;
    return data;
}

// Add a new skill
export async function addSkill(userId, skillData) {
    const { data, error } = await supabase
        .from('skills')
        .insert({
            user_id: userId,
            ...skillData
        })
        .select()
    
    if (error) throw error;
    return data;
}

// Delete a skill
export async function deleteSkill(skillId) {
    const { data, error } = await supabase
        .from('skills')
        .delete()
        .eq('id', skillId)
    
    if (error) throw error;
    return data;
}

// Update multiple skills at once
export async function updateMultipleSkills(skills) {
    const { data, error } = await supabase
        .from('skills')
        .upsert(skills)
        .select()
    
    if (error) throw error;
    return data;
}

// Update skill level (if you have a level field)
export async function updateSkillLevel(skillId, newLevel) {
    const { data, error } = await supabase
        .from('skills')
        .update({ level: newLevel })
        .eq('id', skillId)
        .select()
    
    if (error) throw error;
    return data;
}

// Example: Update skills when accepting a job offer
export async function updateSkillsFromJob(userId, jobSkills) {
    try {
        // Get current user skills
        const currentSkills = await fetchSkillsInformation(userId);
        
        // Update or add skills based on job requirements
        const updates = jobSkills.map(jobSkill => {
            const existingSkill = currentSkills.find(s => s.name === jobSkill.name);
            
            if (existingSkill) {
                // Update existing skill level
                return {
                    id: existingSkill.id,
                    user_id: userId,
                    name: jobSkill.name,
                    level: Math.min(existingSkill.level + 1, jobSkill.level) // Increment but cap at job level
                };
            } else {
                // Add new skill
                return {
                    user_id: userId,
                    name: jobSkill.name,
                    level: Math.max(1, jobSkill.level - 1) // Start slightly below job requirement
                };
            }
        });
        
        const { data, error } = await supabase
            .from('skills')
            .upsert(updates)
            .select();
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error updating skills:', error);
        throw error;
    }
}









