import { auth, database } from "./src/firebase.js";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { get, ref, set } from "firebase/database";

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

const POPUP_FALLBACK_ERROR_CODES = new Set([
  "auth/popup-blocked",
  "auth/popup-closed-by-user",
  "auth/cancelled-popup-request",
  "auth/operation-not-supported-in-this-environment",
]);

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
    if (error && POPUP_FALLBACK_ERROR_CODES.has(error.code)) {
      await signInWithRedirect(auth, provider);
      return null;
    }

    console.error("Error signing up:", error);
    throw error;
  }
};