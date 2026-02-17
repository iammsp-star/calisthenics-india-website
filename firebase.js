// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Your web app's Firebase configuration
// TODO: Replace with your project's actual config keys
const firebaseConfig = {
    apiKey: "AIzaSyBwzfZWMDI27GFZ-E9GBvzMb_rvW4Lmv6o",
    authDomain: "master-calisthenics-india.firebaseapp.com",
    projectId: "master-calisthenics-india",
    storageBucket: "master-calisthenics-india.firebasestorage.app",
    messagingSenderId: "602577156316",
    appId: "1:602577156316:web:2789120d369b0b3d055c19",
    measurementId: "G-NDSKBF6GBL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
