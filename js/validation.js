import { setDoc, doc, getDoc, collection } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { db } from "./firebase.js";
const studentdb="FaculyDatabase";
const path1="mcq.html";
sessionStorage.removeItem("rollNumber");
sessionStorage.removeItem("name");
document.getElementById("quizForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const rollNumber = document.getElementById("rollNumber").value.trim();
    sessionStorage.removeItem("validStudent");
    sessionStorage.setItem("rollNumber", rollNumber);
    sessionStorage.removeItem("violation");
    const uniqueKey = String(document.getElementById("uniqueKey").value.trim());
   
    try {
        const studentDoc = doc(db, studentdb, rollNumber);
        const docSnap = await getDoc(studentDoc);
        if (docSnap.exists()) {
            const data = docSnap.data();
            sessionStorage.setItem('name',data.name);
            if (String(data.uniqueKey) === uniqueKey) {
                sessionStorage.setItem("validStudent", true);
                alert("Validation successful! Starting quiz.");
                window.location.href = path1;
            } else {
                alert("Invalid unique key. Please try again.");
            }
        } else {
            alert("Roll number not found. Please enter a valid roll number.");
        }
    } catch (error) {
        console.error("Error validating student:", error);
        alert("An error occurred during validation. Please try again later.");
    }
});
