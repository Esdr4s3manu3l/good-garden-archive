import { createClient } from '@supabase/supabase-js'

// Substitua pelas suas credenciais reais do Supabase
const SUPABASE_URL = 'https://mddhgaxvmxartovwfrya.supabase.co/rest/v1/'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kZGhnYXh2bXhhcnRvdndmcnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM1NjM3NTIsImV4cCI6MjEwOTEzOTc1Mn0.EiHFl78WEk17RX3FOfahItvunF8qMhi5iRnTT3dlCJQ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)