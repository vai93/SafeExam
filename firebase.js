import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";  
const firebaseConfig = {
  apiKey:process.env.FIREBASE_API_KEY,
  authDomain:process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: "safeexam-6b2bd.firebasestorage.app",
  messagingSenderId: "40444949215",
  appId: "1:40444949215:web:d239e9844c328c9acc6f6a",
  measurementId: "G-E26213WBFM"
};
console.log("in firebase sript");
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);
