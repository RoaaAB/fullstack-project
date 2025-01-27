import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXMd1NE0UDdLtikU6J8ArQOQB0eZOQ2l8",
  authDomain: "ai-tool-682f3.firebaseapp.com",
  projectId: "ai-tool-682f3",
  storageBucket: "ai-tool-682f3.firebasestorage.app",
  messagingSenderId: "819518128765",
  appId: "1:819518128765:web:0a4c84469eb0538b47e714",
  measurementId: "G-BCH629PJ3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Analytics
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Log an event
logEvent(analytics, 'page_view', { page_path: window.location.pathname });

// Export auth and signOut for use in components
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
