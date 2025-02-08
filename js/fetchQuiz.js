import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
const timerDisplay = document.getElementById("timer");
const submitButton = document.getElementById("submit-button");
const mcqSection = document.getElementById("mcq-section");
let timer;
let timeLeft = 300; //5min:5*60=300
const rollNumber = sessionStorage.getItem('rollNumber');
    if (rollNumber) {
        document.getElementById('rollnumber').innerHTML = 'Roll Number: ' + rollNumber;
    } else {
        document.getElementById('rollnumber').innerHTML = 'No roll number found.';
       }

if (rollNumber) {
    nameFind(rollNumber);
    checkResponseInDatabase(rollNumber);
}
async function nameFind(rollNumber) {
    try {
        const querySnapshot = await getDocs(collection(db, "StudentDetails2022"));
        let nameFound = false;

        querySnapshot.forEach((doc) => {
            let student = doc.data();
            if (student.rollNumber === rollNumber) {
                document.getElementById("email").innerHTML = "Email: " + student.email;
                nameFound = true;
            }
        });

        if (!nameFound) {
            document.getElementById("email").innerHTML = "No email found.";
        }
    } catch (error) {
        console.error("Error checking database:", error);
        document.getElementById("name").innerHTML = "No Name found.";
    }
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

async function fetchQuestions() {
    const mcqSection = document.getElementById("mcq-section");
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
        alert("Failed to load questions. Please refresh.");
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
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => {
        toast.style.display = "none";
    }, 50000);
}
function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        showToast("Time is up! Test is being submitted.");
        submitTest();
    } else {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

        if (timeLeft === 60) {
            let blinkInterval = setInterval(() => {
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


document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-button");


    function isIOS() {
        return /iPhone|iPad|iPod/.test(navigator.userAgent);
    }
    
    async function forceFullscreen() {
        if (isIOS()) {
            alert("Fullscreen mode is not supported on iOS Safari.");
            return;  // Skip fullscreen for iOS
        }
    
        if (!document.fullscreenElement) {
            try {
                await document.documentElement.requestFullscreen();
            } catch (err) {
                alert(`Fullscreen error: ${err.message}`);
                submitTest();
            }
        }
    }

startButton.addEventListener("click", async () => {
    startButton.style.display = "none";
    mcqSection.style.display = "block";
    submitButton.style.display = "block";
    timer = setInterval(updateTimer, 1000);
    await forceFullscreen();
    fetchQuestions();

    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement && !isIOS()) {  
            submitTest();
        }
    });
});});



submitButton.addEventListener("click", submitTest);