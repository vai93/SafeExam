import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const startButton = document.getElementById('start-button');
const submitButton = document.getElementById('submit-button');
const mcqSection = document.getElementById('mcq-section');
const timerDisplay = document.getElementById('timer');
let timer;
let timeLeft = 300; // 5 minutes // 5*60


async function fetchQuestions() {
    const loader = document.getElementById('loader'); // Get the loader element
    const spinner = document.getElementById('spinner');
    loader.style.display = 'block'; // Show the loader
    spinner.style.top= '50%';
    spinner.style.left= '50%';
    spinner.style.position= 'fixed';
    try {
        const querySnapshot = await getDocs(collection(db, "Questions"));
        const questions = [];

        querySnapshot.forEach((doc) => {
            questions.push(doc.data());
        });
        shuffleQuestions(questions);
        generateForm(questions);
    } catch (error) {
        console.error("Error fetching questions:", error);
    }
    finally {
        loader.style.display = 'none'; // Hide the loader after the fetch operation is complete
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
            radioButton.name = `q${index + 1}`;
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
        alert('Time is up! Test is being submitted.');
        submitTest();
    } else {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

        if (timeLeft === 60) {
            blinkInterval = setInterval(() => {
                if (timerDisplay.style.color === 'red') {
                    timerDisplay.style.color = 'black';
                    timerDisplay.style.fontSize = '20px';
                } else {
                    timerDisplay.style.color = 'red';
                    timerDisplay.style.fontSize = '24px';
                }
            }, 500);
        }

    }
}

function submitTest() {
    const form = document.getElementById("quizForm");
    form.dispatchEvent(new Event("submit")); // Programmatically submit the form
}

function forceFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            alert(`Error enabling fullscreen: ${err.message}`);
            submitTest();
        });
    }
}

function preventActions(e) {
    e.preventDefault();
    e.stopPropagation();
    alert('Action was disabled during the test.Test is being submitted.');
    submitTest();
}

function allowOnlySpecificKeys(e) {
    const allowedKeys = [
        // ...Array.from({ length: 10 }, (_, i) => i.toString()), // '0' to '9'
        // ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)), // 'a' to 'z'
        // ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)) // 'A' to 'Z' (optional, if case-sensitive answers)
    ];

    if (!allowedKeys.includes(e.key)) {
        e.preventDefault();
    }
}
startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    mcqSection.style.display = 'block';
    submitButton.style.display = 'block';
    timer = setInterval(updateTimer, 1000);
    forceFullscreen();

    fetchQuestions();
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            alert('Action was disabled during the test.');
            forceFullscreen();
        }
    });
    document.addEventListener('keydown', allowOnlySpecificKeys);
    document.addEventListener('contextmenu', preventActions);
});
submitButton.addEventListener('click', submitTest);
