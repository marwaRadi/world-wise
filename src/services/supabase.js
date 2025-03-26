import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zxbkgthfqicgpbqajhym.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4YmtndGhmcWljZ3BicWFqaHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5OTA5ODYsImV4cCI6MjA1ODU2Njk4Nn0.gEsEZa6S4d5owTjKGqaToIjEsa_GxudZ2tep2QRR88E";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
