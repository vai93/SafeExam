import { db } from "./firebase.js";
import { collection, getDocs} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
const questiondb=sessionStorage.getItem("questiondb");
const responsedb=sessionStorage.getItem("responsedb");
const examTitle=sessionStorage.getItem("examTitle");
const examDuration=sessionStorage.getItem("examDuration");
const examCode=sessionStorage.getItem("examCode");
let path1;
if (examCode) {
    path1 = "/index.html"`;  // Correct path structure
} else {
    path1 = "/index.html";
}


document.getElementById('examTitle').innerHTML = examTitle+' Test ';
document.getElementById('timer').innerHTML = "Time Left:"+ examDuration+":00";
const timerDisplay = document.getElementById("timer");
const submitButton = document.getElementById("submit-button");
const mcqSection = document.getElementById("mcq-section");
let timer;
let timeLeft = parseInt(examDuration)*60; 
const rollNumber = sessionStorage.getItem('rollNumber');
const name = sessionStorage.getItem('name');
const validStudent = sessionStorage.getItem('validStudent');
    if (rollNumber) {
        document.getElementById('rollnumber').innerHTML = 'Roll Number: ' + rollNumber;
    } else {
        document.getElementById('rollnumber').innerHTML = 'No roll number found.';
       }
    if (name) {
        document.getElementById("name").innerHTML = "Name: " + name;
    } else {
        document.getElementById("name").innerHTML = "No Name found.";
       }
    
if (rollNumber) {
    checkResponseInDatabase(rollNumber);
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.display = "block";
}

async function checkResponseInDatabase(rollNumber) {
    try {
        const querySnapshot = await getDocs(collection(db, responsedb));
        let responseFound = false;
        querySnapshot.forEach((doc) => {
            if (doc.id.includes(rollNumber)) {
                responseFound = true;
            }
        });
        if (responseFound) { 
            showToast( `Response already found for roll number: ${rollNumber}.`);}
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
        const querySnapshot = await getDocs(collection(db, questiondb));
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
    questions.forEach((question, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question-box"); // ✅ Apply CSS class for styling

        // ✅ Add Sequential Number
        const questionNumber = document.createElement("h3");
        questionNumber.textContent = `Q${index + 1}`;
        questionNumber.classList.add("question-number");
        questionDiv.appendChild(questionNumber);

        // ✅ Add Image If Exists
        if (question.imageURL && question.imageURL.trim() !== "") {
            const img = document.createElement("img");
            img.src = question.imageURL;
            img.alt = "Question Image";
            img.classList.add("question-image"); // ✅ Apply CSS for image
            questionDiv.appendChild(img);
        }

        // ✅ Add Question Text
        const questionText = document.createElement("p");
        questionText.textContent = question.question;
        questionText.classList.add("question-text");
        questionDiv.appendChild(questionText);

        // ✅ Add Options
        const optionsDiv = document.createElement("div");
        optionsDiv.classList.add("options");

        question.options.forEach((option) => {
            const label = document.createElement("label");
            label.classList.add("option-label");

            const radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.name = question.id;
            radioButton.value = option;
            radioButton.classList.add("option-radio");

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
function isIOS() {
    return /iPhone|iPad|iPod/.test(navigator.userAgent);
}

async function forceFullscreen() {
    if (isIOS()) {
        alert("Fullscreen mode permission denied by iOS; however, leaving the screen will still submit the exam.");
        return; // Skip fullscreen for iOS
    }

    if (!document.fullscreenElement) {
        try {
            await document.documentElement.requestFullscreen();
        } catch (err) {
            alert(`Fullscreen error: ${err.message}`);
            submitTest(); // Auto-submit if fullscreen fails
        }
    }
}

    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", async () => {
        startButton.style.display = "none";
        mcqSection.style.display = "block";
        submitButton.style.display = "block";
        timer = setInterval(updateTimer, 1000);
        await forceFullscreen();
        if (validStudent) {
            fetchQuestions();
        } else {
            alert("Login is required to begin the test");
            window.location.href = path1;
        }

        document.addEventListener("fullscreenchange", () => {
            if (!document.fullscreenElement && !isIOS()) {
                submitTest();
            }
        });

        violation();
    });

submitButton.addEventListener("click", () => {
        sessionStorage.removeItem("violation"); 
        submitTest(); 
    });


//////////////////////////////////////////////////////////////////////////////////////////////////////


function violation(){
    let pageLoadTime = performance.now();
    function submitTest() {
        const form = document.getElementById("quizForm");
        if (form) {
            form.dispatchEvent(new Event("submit")); // Trigger form submission
        }
    }
    
    
    document.addEventListener("webkitfullscreenchange", () => {
        if (!document.webkitFullscreenElement&& !isIOS()) {
           
            sessionStorage.setItem("violation", "Fullscreen mode changed");
            submitTest();
            showToast("Fullscreen mode is required! Your test has been submitted.");
        }
    });
    
    window.addEventListener("beforeunload", async (event) => {
        if (!isIOS()) {  // Skip on iOS
            submitTest();
        }
    });
    
    // Prevent back/forward navigation using browser history
    history.pushState(null, null, location.href);
    window.addEventListener("popstate", function () {
        history.pushState(null, null, location.href);
        sessionStorage.setItem("violation", "back/forward navigation");
       
        submitTest();
    });
    
    
    document.addEventListener("keydown", function (e) {
        if (e.key === "Meta" || e.key === "Win") {
            sessionStorage.setItem("violation", "Windows/Command key pressed");
            
            submitTest();
        }
    
        if ((e.altKey && e.key === "Tab") || (e.ctrlKey && e.key === "Tab")) {
            sessionStorage.setItem("violation", "Alt+Tab or Ctrl+Tab detected");
        
            submitTest();
        }
    
        if (e.key === "Backspace") {
            let target = e.target.tagName.toLowerCase();
            if (target !== "input" && target !== "textarea") {
                sessionStorage.setItem("violation", "Backspace pressed");
                
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
            sessionStorage.setItem("violation", "mouse back/forward");
            submitTest();
        }
    });
    
    
    
    let blurStartTime = null;
    let violationTimeout = null;
    let isAlertActive = false;
    
    // Override alert to prevent false triggers
    const originalAlert = window.alert;
    window.alert = function (message) {
        isAlertActive = true;
        setTimeout(() => (isAlertActive = false), 1000); // Reset after 1 sec
        originalAlert(message);
    };
    
    // Detect blur but ignore quick distractions (like notifications)
    window.addEventListener("blur", () => {
        if (performance.now() - pageLoadTime < 2000) {
            console.log("Ignoring blur on initial load.");
            return; // Ignore first 2 seconds
        }
        if (isAlertActive) return; // Ignore alerts
    
        blurStartTime = performance.now();
    
        // If tab is still visible after 300ms, it's a notification, so ignore
        setTimeout(() => {
            if (document.visibilityState === "visible" && document.hasFocus()) {
                console.log("Brief blur detected, likely a notification. Ignoring.");
            } else {
                sessionStorage.setItem("violation", "switched tabs or minimized");
                submitTest();
            }
        }, 300); // **300ms delay to differentiate notifications**
    });
    
    // Detect actual tab switching or minimizing
    document.addEventListener("visibilitychange", () => {
        if (performance.now() - pageLoadTime < 2000) {
            console.log("Ignoring visibility change on initial load.");
            return; // Ignore first 2 seconds
        }
    
    
        if (document.visibilityState === "hidden") {
            
            blurStartTime = performance.now();
    
            // Start a timer to check if the user is gone too long
            violationTimeout = setTimeout(() => {
                if (document.visibilityState === "hidden" && !isAlertActive) {
                    sessionStorage.setItem("violation", "switched tabs or minimized for too long");
                    submitTest();
                }
            }, 3000); // **3-second delay for real violations**
        } else {
            if (blurStartTime) {
                const timeAway = performance.now() - blurStartTime;
    
                if (timeAway < 3000) {
                    console.log(`User returned within ${Math.round(timeAway / 1000)} seconds. No penalty.`);
                    clearTimeout(violationTimeout);
                }
            }
            blurStartTime = null;
        }
    });
    
    }
