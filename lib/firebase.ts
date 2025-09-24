
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyA9ZgNpa2O7YUHzgZfJdISyKnCnuu2vV5I",
  authDomain: "ackerbrew.firebaseapp.com",
  projectId: "ackerbrew",
  storageBucket: "ackerbrew.firebasestorage.app",
  messagingSenderId: "575697778055",
  appId: "1:575697778055:web:90c0e8b249768bf8624f22"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);