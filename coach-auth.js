/**
 * Client-Side Authentication Module for MCI Coaches Portal
 * 
 * Provides basic session management and obfuscated credential checking.
 * Note: Client-side security is inherently limited. This acts as a deterrent
 * rather than a fortress.
 * 
 * @module CoachAuth
 */

// Base64 encoded password ("TrainSmart2026")
// This prevents casual shoulder-surfing or quick source code glances from revealing the password.
const ENCODED_HASH = "VHJhaW5TbWFydDIwMjY=";
const SESSION_KEY = 'mci_coach_authenticated';

const CoachAuth = {
    /**
     * Attempt to login with the provided password.
     * Compares the Base64 encoded input against the stored hash.
     * 
     * @param {string} password - The plain text password entered by the user.
     * @returns {boolean} - Returns true if authentication is successful, false otherwise.
     */
    login: (password) => {
        try {
            // Encode the input to compare against the stored hash
            const inputHash = btoa(password);
            if (inputHash === ENCODED_HASH) {
                sessionStorage.setItem(SESSION_KEY, 'true');
                return true;
            }
        } catch (e) {
            console.error("Auth Error", e);
        }
        return false;
    },

    /**
     * Log the user out by clearing the session storage
     * and redirecting to the login page.
     */
    logout: () => {
        sessionStorage.removeItem(SESSION_KEY);
        window.location.href = 'coach-login.html';
    },

    /**
     * Check if the current user has an active authenticated session.
     * 
     * @returns {boolean} - True if authenticated.
     */
    isAuthenticated: () => {
        return sessionStorage.getItem(SESSION_KEY) === 'true';
    },

    /**
     * Route Guuard: Redirects unauthenticated users to the login page.
     * Should be called at the top of protected pages.
     */
    requireAuth: () => {
        if (!CoachAuth.isAuthenticated()) {
            window.location.href = 'coach-login.html';
        }
    },

    /**
     * Guest Guard: Redirects authenticated users away from public auth pages (like login).
     * Should be called on the login page.
     */
    redirectIfAuthenticated: () => {
        if (CoachAuth.isAuthenticated()) {
            window.location.href = 'coach-portal.html';
        }
    }
};
