import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
const timerDisplay = document.getElementById("timer");
const submitButton = document.getElementById("submit-button");
const mcqSection = document.getElementById("mcq-section");
let timer;
let timeLeft = 300;

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => {
        toast.style.display = "none";
    }, 50000);
}

async function checkResponseInDatabase(rollNumber) {
    try {
        const querySnapshot = await getDocs(collection(db, "StudentResponses"));
        let responseFound = false;
        querySnapshot.forEach((doc) => {
            if (doc.id.includes(rollNumber)) {
                responseFound = true;
            }
        });
        if (responseFound) {
            alert(`Response already found for roll number: ${rollNumber}. Your marks for this test will not be considered.`);
        }
    } catch (error) {
        console.error("Error checking database:", error);
    }
}

const rollNumber = sessionStorage.getItem("rollNumber");
if (rollNumber) {
    checkResponseInDatabase(rollNumber);
}

async function fetchQuestions() {
    mcqSection.style.display = "block";  // Ensure section is visible
    mcqSection.innerHTML = "";  // Clear previous questions
    const loader = document.getElementById("loader");
    const spinner = document.getElementById("spinner");
    loader.style.display = "block";
    spinner.style.top = "50%";
    spinner.style.left = "50%";
    spinner.style.position = "fixed";

    try {
        const querySnapshot = await getDocs(collection(db, "Questions"));
        const questions = [];
        querySnapshot.forEach((doc) => {
            let questionData = doc.data();
            questionData.id = doc.id;
            questions.push(questionData);
        });
        shuffleQuestions(questions);
        generateForm(questions);
    } catch (error) {
        console.error("Error fetching questions:", error);
    } finally {
        loader.style.display = "none";
    }
}

function shuffleQuestions(questions) {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

function generateForm(questions) {
    questions.forEach((question) => {
      
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        const questionText = document.createElement("p");
        questionText.textContent = question.question;
        questionDiv.appendChild(questionText);

        const optionsDiv = document.createElement("div");
        optionsDiv.classList.add("options");

        question.options.forEach((option) => {
            const label = document.createElement("label");
            const radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.name = question.id;
            radioButton.value = option;
            label.appendChild(radioButton);
            label.appendChild(document.createTextNode(option));
            optionsDiv.appendChild(label);
        });

        questionDiv.appendChild(optionsDiv);
        mcqSection.appendChild(questionDiv);
    });
}

function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        alert("Time is up! Test is being submitted.");
        submitTest();
    } else {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

        if (timeLeft === 60) {
            blinkInterval = setInterval(() => {
                if (timerDisplay.style.color === "red") {
                    timerDisplay.style.color = "black";
                    timerDisplay.style.fontSize = "20px";
                } else {
                    timerDisplay.style.color = "red";
                    timerDisplay.style.fontSize = "24px";
                }
            }, 500);
        }
    }
}

function submitTest() {
    const form = document.getElementById("quizForm");
    if (form) {
        form.dispatchEvent(new Event("submit")); // Trigger form submission
    }
}

function forceFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
            alert(`Error enabling fullscreen: ${err.message}`);
            submitTest();
        });
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-button");


startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    mcqSection.style.display = "block";
    submitButton.style.display = "block";
    timer = setInterval(updateTimer, 1000);
    forceFullscreen();
    fetchQuestions();

    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement) {
            submitTest();
            showToast("Fullscreen mode is required! Your test has been submitted.");
        }
    });
});});

window.addEventListener("beforeunload", async () => {
    submitTest();
});

// Prevent back/forward navigation using browser history
history.pushState(null, null, location.href);
window.addEventListener("popstate", function () {
    history.pushState(null, null, location.href);
    submitTest();
});



document.addEventListener("keydown", function (e) {
    if (e.key === "Meta" || e.key === "Win") {
        console.warn("Windows/Command key pressed! Auto-submitting test...");
        submitTest();
        showToast("Pressing Windows/Command key is not allowed! Your test has been submitted.");
    }

    if ((e.altKey && e.key === "Tab") || (e.ctrlKey && e.key === "Tab")) {
        console.warn("Alt+Tab or Ctrl+Tab detected! Auto-submitting test...");
        submitTest();
        showToast("Task switching is not allowed! Your test has been submitted.");
    }

    if (e.key === "Backspace") {
        let target = e.target.tagName.toLowerCase();
        if (target !== "input" && target !== "textarea") {
            e.preventDefault();
        }
    }
});


let touchStartX = 0;
let touchStartY = 0;

window.addEventListener("touchstart", function (e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener("touchmove", function (e) {
    let touchEndX = e.touches[0].clientX;
    let touchEndY = e.touches[0].clientY;

    let deltaX = touchEndX - touchStartX;
    let deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        e.preventDefault(); 
    }
}, { passive: false });


// Prevent mouse back/forward button navigation
window.addEventListener("mousedown", function (e) {
    if (e.button === 3 || e.button === 4) { // 3 = Back button, 4 = Forward button
        e.preventDefault();
        submitTest();
    }
});


let lastActiveTime = performance.now();
document.addEventListener("visibilitychange", async () => {
    const timeElapsed = performance.now() - lastActiveTime;

    if (document.hidden) {
        console.log("Page hidden.");

        // If time gap is too large, assume system sleep happened (e.g., > 10 sec)
        if (timeElapsed > 10000) {
            console.log("System likely went to sleep. Ignoring event.");
            return;
        }

        submitTest();
    }

    lastActiveTime = performance.now();
});

submitButton.addEventListener("click", submitTest);
