import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyB44lalCeugu5WDRCXS3kwsRYvAIvAS0qs",
    authDomain: "safeexam-6b2bd.firebaseapp.com",
    projectId: "safeexam-6b2bd",
    storageBucket: "safeexam-6b2bd.firebasestorage.app",
    messagingSenderId: "40444949215",
    appId: "1:40444949215:web:d239e9844c328c9acc6f6a",
    measurementId: "G-E26213WBFM",
};
console.log("in firebase sript");
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
