import { auth, db } from './firebase.js';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

/**
 * Client-Side Authentication Module for MCI Coaches Portal using Firebase
 */
const CoachAuth = {
    /**
     * Register a new user (Member or Coach).
     * Creates Auth account and Firestore user document.
     * 
     * @param {string} email 
     * @param {string} password 
     * @param {string} name 
     * @param {string} role - 'Member' or 'Coach'
     * @param {string} fitnessLevel 
     */
    registerUser: async (email, password, name, role = 'Member', fitnessLevel = 'Beginner') => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create User Document
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                role: role,
                joinDate: new Date().toISOString(),
                fitnessLevel: fitnessLevel
            });

            // If it's a member, create a member profile entry too
            if (role === 'Member') {
                await setDoc(doc(db, "members", user.uid), {
                    activePlan: null,
                    membershipStatus: 'Pending',
                    assignedCoachID: null
                });
            }

            return user;
        } catch (error) {
            console.error("Registration Failed:", error);
            throw error;
        }
    },

    /**
     * Attempt to login with email and password.
     * 
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise<boolean>}
     */
    login: async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return true;
        } catch (error) {
            console.error("Login Failed:", error.message);
            return false;
        }
    },

    /**
     * Log the user out.
     */
    logout: async () => {
        try {
            await signOut(auth);
            window.location.href = 'coach-login.html';
        } catch (error) {
            console.error("Logout Failed:", error);
        }
    },

    /**
     * Monitor authentication state.
     * 
     * @param {Function} onAuth - Callback when authenticated
     * @param {Function} onUnauth - Callback when not authenticated
     */
    monitorAuth: (onAuth, onUnauth) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Check if user has coach role if using custom claims (advanced)
                // For now, assume any authenticated user is a coach or authorized staff
                if (onAuth) onAuth(user);
            } else {
                if (onUnauth) onUnauth();
            }
        });
    }
};

// Expose to window for easy access in HTML (optional, but keeps existing pattern working with tweaks)
window.CoachAuth = CoachAuth;

export default CoachAuth;
