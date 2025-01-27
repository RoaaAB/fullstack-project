// src/firebase.js or src/auth.js

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Register a new user
const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User registered:", user);
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

// Login a user
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User logged in:", user);
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

export { registerUser, loginUser };
