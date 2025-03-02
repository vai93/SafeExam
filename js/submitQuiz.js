const path1="/submit.html";
let path2;
const testId=sessionStorage.getItem("testId");
if (testId=="Test765") {
    path2 = "/index.html";}
else{
    path2 = `/${testId}/index.html`;  // Correct path structure
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
    const studentName=sessionStorage.getItem("name") || "No name found";
    const violation = sessionStorage.getItem("violation") || false;

    const now = new Date();

    const answers = {};
    Array.from(quizForm.elements).forEach((element) => {
        if (element.name && element.type === "radio" && element.checked) {
            answers[element.name] = element.value;
        }
    });
    try {
        const response = await fetch("http://localhost:3000/api/submitQuiz", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                rollNumber,
                testId,
                answers,
                violation,
                studentName,
                submittedAt: now,
            }),
        });

        const result = await response.json();
        if (result.success) {
            localStorage.setItem("quizScore", result.score);
            window.location.href = path1;
        } else {
            console.error("Error submitting answers:", error.message);
        alert("Error submitting answers. Please try again.");
        window.location.href = path2;
        }
    } catch (error) {
        console.error("Error submitting quiz:", error);
        alert("Submission failed. Try again.");
        window.location.href = path2;
    }finally {
        // Hide loader after submission
        loader1.style.display = "none";
    }
});
        
