
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://wimbijqrhpsqipubbapp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpbWJpanFyaHBzcWlwdWJiYXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMzIyOTMsImV4cCI6MjA4NTYwODI5M30.b8yJbJowclipg9nvbECHBVlYw_scINixRJAYlP98OkE'

export const supabase = createClient(supabaseUrl, supabaseKey)
