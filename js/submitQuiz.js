import { setDoc, doc, getDocs, collection, getDoc,writeBatch } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { db } from "./firebase.js";
const questiondb=sessionStorage.getItem("questiondb");
const responsedb=sessionStorage.getItem("responsedb");
const path1="/submit.html";
let path2;
const examCode=sessionStorage.getItem("examCode");
if (examCode) {
    path2 = `/${examCode}/index.html`;  // Correct path structure
} else {
    path2 = "/index.html";
}



let quizSubmitted = false;
const quizForm = document.getElementById("quizForm");
quizForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (quizSubmitted) {
        console.log("Quiz already submitted.");
        return;
    }
    quizSubmitted = true;
    loader1.style.display = "flex";
    spinner1.style.display = "block";
    const rollNumber = sessionStorage.getItem("rollNumber") || "No roll number found";
    const name=sessionStorage.getItem("name") || "No name found";
    const violation = sessionStorage.getItem("violation") || false;

    const now = new Date();
    const formattedDate = `${now.getHours() < 10 ? "0" + now.getHours() : now.getHours()}:${now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()}_${now.getDate() < 10 ? "0" + now.getDate() : now.getDate()}-${
        now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1
    }-${now.getFullYear().toString().slice(-2)}`;

    
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const correctAnswers = {};
        const querySnapshot = await getDocs(collection(db, questiondb));
        querySnapshot.forEach((doc) => {
            correctAnswers[doc.id] = doc.data().answer;
        });

    const answers = {};
    Object.keys(correctAnswers).forEach((question) => {
        const selectedOption = quizForm.elements[question];
        answers[question] = selectedOption ? selectedOption.value || null : null;
    });

    let score = Object.keys(correctAnswers).reduce((acc, question) => {
            return acc + (answers[question] === correctAnswers[question] ? 1 : 0);
        }, 0);
    localStorage.setItem("quizScore", score);
    
    
    const customDocId = `${rollNumber}_${formattedDate}`;
    const batch = writeBatch(db);
    batch.set(doc(db, responsedb, customDocId), {
        answers,
        score,
        rollNumber,
        submittedAt: now,
        violation,
        studentName: name,
    });

    await batch.commit();

        window.location.href = path1;
    } catch (error) {
        console.error("Error submitting answers:", error.message);
        alert("Error submitting answers. Please try again.");
        window.location.href = path2;
    }finally {
        // Hide loader after submission
        loader1.style.display = "none";
    }
});
