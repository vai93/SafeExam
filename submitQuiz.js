// Import Firebase Firestore functions
import { setDoc, doc,getDocs ,collection } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
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
  const rollNumber  = sessionStorage.getItem('rollNumber') || "No roll number found";
  const now = new Date();
  const formattedDate = `${now.getHours() < 10 ? '0' + now.getHours() : now.getHours()}.${now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()}.${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}.${(now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1)}.${now.getFullYear().toString().slice(-2)}`;

  let correctAnswers = {};
  try {
    const querySnapshot = await getDocs(collection(db, "Questions"));
    querySnapshot.forEach((doc) => {
      const questionId = doc.id; // Document ID (e.g., q1, q2, etc.)
      const correctAnswer = doc.data().answer; 
      correctAnswers[questionId] = correctAnswer;
    });
  } catch (error) {
    console.error("Error fetching correct answers: ", error);
    alert("Error fetching correct answers. Please try again.");
    return;
  }
  const answers = {
    rollNumber: rollNumber,
    q1: quizForm.q1.value || null,
    q2: quizForm.q2.value || null,
    q3: quizForm.q3.value || null,
    q4: quizForm.q4.value || null,
    q5: quizForm.q5.value || null,
    q6: quizForm.q6.value || null,
    q7: quizForm.q7.value || null,
    q8: quizForm.q8.value || null,
    q9: quizForm.q9.value || null,
    q10: quizForm.q10.value || null,
    submittedAt: new Date(),
  };

  let score = 0;
  Object.keys(correctAnswers).forEach((question) => {
    if (answers[question] === correctAnswers[question]) {
      score += 1; 
    }
  });
  localStorage.setItem("quizScore", score);

  const customDocId = `${rollNumber}_${formattedDate}`;
  try {
    await setDoc(doc(db, "StudentResponses", customDocId), { answers, score });
    console.log("Quiz submitted successfully!");
    window.location.href = "submit.html";
  } catch (error) {
    console.error("Error submitting answers: ", error);
    alert("Error submitting answers. Please try again.");
  }
});