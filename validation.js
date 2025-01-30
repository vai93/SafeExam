import { setDoc, doc,getDoc ,collection } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
    import { db } from "./firebase.js";
    document.getElementById('quizForm').addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission
            const rollNumber = document.getElementById('rollNumber').value.trim();
            sessionStorage.setItem('rollNumber', rollNumber);
            const uniqueKey = String(document.getElementById('uniqueKey').value.trim());
            try {
                const studentDoc = doc(db, 'StudentDetails', rollNumber);
                const docSnap = await getDoc(studentDoc);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    console.log(data.uniqueKey);
                    console.log(data);
                    if (String(data.uniqueKey) === uniqueKey) {
                        alert('Validation successful! Starting quiz.');
                        window.location.href = 'mcq.html'; // Redirect to quiz
                    } else {
                        alert('Invalid unique key. Please try again.');
                    }
                } else {
                    alert('Roll number not found. Please enter a valid roll number.');
                }
            } catch (error) {
                console.error('Error validating student:', error);
                alert('An error occurred during validation. Please try again later.');
            }
        });
