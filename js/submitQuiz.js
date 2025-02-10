import { setDoc, doc, getDocs, collection, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { db } from "./firebase.js";
let quizSubmitted = false;
const quizForm = document.getElementById("quizForm");
quizForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (quizSubmitted) {
        console.log("Quiz already submitted.");
        return;
    }
    quizSubmitted = true;
    const rollNumber = sessionStorage.getItem("rollNumber") || "No roll number found";
    
    const now = new Date();
    const submittedAt = new Date();
    const formattedDate = `${now.getHours() < 10 ? "0" + now.getHours() : now.getHours()}:${now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()}_${now.getDate() < 10 ? "0" + now.getDate() : now.getDate()}-${
        now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1
    }-${now.getFullYear().toString().slice(-2)}`;
    let correctAnswers = {};
    try {
        const querySnapshot = await getDocs(collection(db, "Questions"));
        querySnapshot.forEach((doc) => {
            const questionId = doc.id;
            const correctAnswer = doc.data().answer;
            correctAnswers[questionId] = correctAnswer;
        });
    } catch (error) {
        console.error("Error fetching correct answers: ", error);
        alert("Error fetching correct answers. Please try again.");
        return;
    }
    const answers = {};
    Object.keys(correctAnswers).forEach((question) => {
        const selectedOption = quizForm.elements[question];
        answers[question] = selectedOption ? selectedOption.value || null : null;
    });
    let score = 0;
    Object.keys(correctAnswers).forEach((question) => {
        const userAnswer = answers[question] || null;
        const correctAnswer = correctAnswers[question];
        if (userAnswer !== null && userAnswer === correctAnswer) {
            score += 1;
        }
    });
    localStorage.setItem("quizScore", score);
    const violation = sessionStorage.getItem("violation") || false;
    sessionStorage.removeItem("violation");
    try {
        const studentDocRef = doc(db, "FaculyDatabase", rollNumber);
        const studentDoc = await getDoc(studentDocRef);
        if (!studentDoc.exists()) {
            throw new Error("Student not found");
        }
        const userId = studentDoc.data().userId;
        const customDocId = `${rollNumber}_${formattedDate}`;
        await setDoc(doc(db, "StudentResponses", customDocId), { answers: answers, score: score, rollNumber: rollNumber, submittedAt: submittedAt,violation:violation }, { merge: false });
        console.log("Quiz submitted successfully!");
        window.location.href = "submit.html";
    } catch (error) {
        console.error("Error submitting answers: ", error);
        alert("Error submitting answers. Please try again.");
    }
});
