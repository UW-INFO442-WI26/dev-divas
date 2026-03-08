// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAF5lB2kXQjN4Tqa-2H8y6xFqBOcSHsSHg",
  authDomain: "dev-divas-7f149.firebaseapp.com",
  projectId: "dev-divas-7f149",
  databaseURL: "https://dev-divas-7f149-default-rtdb.firebaseio.com",
  storageBucket: "dev-divas-7f149.firebasestorage.app",
  messagingSenderId: "859298934624",
  appId: "1:859298934624:web:2a0255b0f9c2d1c3a6f805"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);

export default app;