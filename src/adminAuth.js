import React from 'react'

const adminAuth = () => {
  // adminAuth.js

// Import Supabase Admin SDK
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase Admin client
const supabaseAdmin = createClient('supabase_url', 'service_role_key');

// Handle Admin Login
async function adminLogin(email, password) {
    try {
        const { user, session, error } = await supabaseAdmin.auth.signIn({
            email,
            password,
        });
        if (error) {
            throw error;
        }
        return { user, session };
    } catch (error) {
        console.error('Admin login error:', error.message);
        throw error;
    }
}

// Handle Admin Logout
async function adminLogout() {
    try {
        await supabaseAdmin.auth.signOut();
        console.log('Admin logged out successfully');
    } catch (error) {
        console.error('Admin logout error:', error.message);
        throw error;
    }
}

module.exports = {
    adminLogin,
    adminLogout,
};

}

export default adminAuth