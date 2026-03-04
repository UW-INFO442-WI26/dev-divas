import { auth, db } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();

// Google Sign Up
export const signUpWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user already exists in Firestore
    const userRef = doc(db, "volunteers", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // Create new volunteer profile
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        qualifications: [],
        preferences: [],
        createdAt: new Date()
      });
    }

    return user;

  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};