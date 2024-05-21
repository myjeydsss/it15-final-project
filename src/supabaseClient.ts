// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fnuxlkuyfgyjiomkzksy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZudXhsa3V5Zmd5amlvbWt6a3N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyMDY1NjQsImV4cCI6MjAzMTc4MjU2NH0.ER-dKXeV4Mk-nh-m9WBNveeAyUyFaTRMVw8F8Vg7zEY';

export const supabase = createClient(supabaseUrl, supabaseKey);
