import { auth, database } from "./src/firebase.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { get, ref, set } from "firebase/database";

const provider = new GoogleAuthProvider();

// Google Sign Up
export const signUpWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user already exists in Realtime Database
    const userRef = ref(database, `volunteers/${user.uid}`);
    const userSnap = await get(userRef);

    if (!userSnap.exists()) {
      // Create new volunteer profile
      await set(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        qualifications: [],
        preferences: [],
        createdAt: Date.now()
      });
    }

    return user;

  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};