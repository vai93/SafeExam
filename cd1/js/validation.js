import { setDoc, doc, getDoc, collection } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { db } from "./firebase.js";
const studentdb="StudentDetails2022";

document.getElementById("quizForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const rollNumber = document.getElementById("rollNumber").value.trim();
    sessionStorage.setItem("rollNumber", rollNumber);
    sessionStorage.removeItem("violation");
    const uniqueKey = String(document.getElementById("uniqueKey").value.trim());
    try {
        const studentDoc = doc(db, studentdb, rollNumber);
        const docSnap = await getDoc(studentDoc);
        if (docSnap.exists()) {
            const data = docSnap.data();
            if (String(data.uniqueKey) === uniqueKey) {
                alert("Validation successful! Starting quiz.");
                window.location.href = "mcq.html";
            } else {
                alert("Invalid unique key. Please try again.");
            }
        } else {
            alert(rollNumber,studentdb,"Roll number not found. Please enter a valid roll number.");
        }
    } catch (error) {
        console.error("Error validating student:", error);
        alert("An error occurred during validation. Please try again later.");
    }
});
