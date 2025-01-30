import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
const startButton = document.getElementById("start-button");
const submitButton = document.getElementById("submit-button");
const mcqSection = document.getElementById("mcq-section");
const timerDisplay = document.getElementById("timer");
let timer;
let timeLeft = 300;
async function checkResponseInDatabase(rollNumber) {
    try {
        const querySnapshot = await getDocs(collection(db, "StudentResponses"));

        let responseFound = false;

        querySnapshot.forEach((doc) => {
            // Check if the document ID contains the roll number
            if (doc.id.includes(rollNumber)) {
                responseFound = true;
            }
        });

        // If a document containing the roll number was found, show the alert
        if (responseFound) {
            alert(`Response already found for roll number: ${rollNumber}. Your marks for this test will not be considered.`);
        }
    } catch (error) {
        console.error("Error checking database:", error);
    }
}

const rollNumber = sessionStorage.getItem('rollNumber');
if (rollNumber) {
    checkResponseInDatabase(rollNumber); // Check if response exists for the roll number
}
async function fetchQuestions() {
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
    questions.forEach((question, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");
        const questionText = document.createElement("p");
        questionText.textContent = question.question;
        questionDiv.appendChild(questionText);
        const optionsDiv = document.createElement("div");
        optionsDiv.classList.add("options");
        question.options.forEach((option, i) => {
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
    form.dispatchEvent(new Event("submit"));
}
function forceFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()["catch"]((err) => {
            alert(`Error enabling fullscreen: ${err.message}`);
            submitTest();
        });
    }
}
function preventActions(e) {
    e.preventDefault();
    e.stopPropagation();
    alert("Action was disabled during the test.Test is being submitted.");
    submitTest();
}
function allowOnlySpecificKeys(e) {
    const allowedKeys = [];
    if (!allowedKeys.includes(e.key)) {
        e.preventDefault();
    }
}
startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    mcqSection.style.display = "block";
    submitButton.style.display = "block";
    timer = setInterval(updateTimer, 1e3);
    forceFullscreen();
    fetchQuestions();
    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement) {
            alert("Action was disabled during the test.");
            forceFullscreen();
        }
    });
    document.addEventListener("keydown", allowOnlySpecificKeys);
    document.addEventListener("contextmenu", preventActions);
});
submitButton.addEventListener("click", submitTest);
