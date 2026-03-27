import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = supabaseUrl
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export const submitLead = async (data) => {
  if (!supabase) {
    // Dev mode: log and return success
    console.log('[Supabase not configured] Lead data:', data)
    return { success: true, mock: true }
  }
  try {
    const { error } = await supabase.from('leads').insert([{
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      sector: data.sector,
      pain_points: data.painPoints || [],
      message: data.message || null,
      plan_interest: data.plan || null,
      status: 'new',
    }])
    if (error) throw error
    return { success: true }
  } catch (err) {
    console.error('Supabase error:', err)
    return { success: false, error: err.message }
  }
}
