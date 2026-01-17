/**
 * Simple Client-Side Authentication for MCI Coaches Portal
 * Note: This offers basic privacy but is not secure against determined inspection.
 */

const COACH_AUTH_KEY = 'mci_coach_authenticated';
// A simple hash-like check could be done, but for this level of security (client-side),
// a direct string comparison obfuscated slightly is sufficient for the requirement.
// Password: "TrainSmart2026"
// Password: "12345"
const VALID_HASH = "12345";

const CoachAuth = {
    /**
     * Attempt to login with password
     * @param {string} password 
     * @returns {boolean} true if successful
     */
    login: (password) => {
        if (password === VALID_HASH) {
            sessionStorage.setItem(COACH_AUTH_KEY, 'true');
            return true;
        }
        return false;
    },

    /**
     * Logout user
     */
    logout: () => {
        sessionStorage.removeItem(COACH_AUTH_KEY);
        window.location.href = 'coach-login.html';
    },

    /**
     * Check if user is authenticated
     * @returns {boolean}
     */
    isAuthenticated: () => {
        return sessionStorage.getItem(COACH_AUTH_KEY) === 'true';
    },

    /**
     * Protect a page - redirect if not authenticated
     */
    requireAuth: () => {
        if (!CoachAuth.isAuthenticated()) {
            window.location.href = 'coach-login.html';
        }
    },

    /**
     * Redirect connected user away from login page
     */
    redirectIfAuthenticated: () => {
        if (CoachAuth.isAuthenticated()) {
            window.location.href = 'coach-portal.html';
        }
    }
};
