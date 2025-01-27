// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signOut, updateProfile } from "firebase/auth"; // Import auth methods
import { getFirestore } from "firebase/firestore"; // If you're using Firestore
import { getStorage } from "firebase/storage"; // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyBXMd1NE0UDdLtikU6J8ArQOQB0eZOQ2l8",
  authDomain: "ai-tool-682f3.firebaseapp.com",
  projectId: "ai-tool-682f3",
  storageBucket: "ai-tool-682f3.appspot.com", // Corrected storageBucket
  messagingSenderId: "819518128765",
  appId: "1:819518128765:web:0a4c84469eb0538b47e714",
  measurementId: "G-BCH629PJ3G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth, Firestore, and Storage
const auth = getAuth(app);
const db = getFirestore(app); // If you're using Firestore
const storage = getStorage(app); // Initialize Firebase Storage

// Exporting required methods for use in other components
export { auth, db, storage, signOut, updateProfile }; // Export storage