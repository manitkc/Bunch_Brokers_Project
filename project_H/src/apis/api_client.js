import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://rqfparzhamjouldtggjf.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function fetchAboutUsInformation(userId) {
  const { data } = await supabase
    .from('user')
    .select('description')
    .eq('user_id', userId)

  return data;
}

export async function fetchAboutUsInformation(userId) {
  const { data } = await supabase
      .from('user')
      .select('description')
      .eq('user_id', userId)

  return data;
}
