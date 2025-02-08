function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => {
        toast.style.display = "none";
    }, 50000);
}

function submitTest() {
    const form = document.getElementById("quizForm");
    if (form) {
        form.dispatchEvent(new Event("submit")); // Trigger form submission
    }
}


document.addEventListener("webkitfullscreenchange", () => {
    if (!document.webkitFullscreenElement&& !isIOS()) {
        sessionStorage.setItem("violation", true);
        submitTest();
        showToast("Fullscreen mode is required! Your test has been submitted.");
    }
});

window.addEventListener("beforeunload", async (event) => {
    if (!isIOS()) {  // Skip on iOS
        sessionStorage.setItem("violation", true);
        submitTest();
    }
});

// Prevent back/forward navigation using browser history
history.pushState(null, null, location.href);
window.addEventListener("popstate", function () {
    history.pushState(null, null, location.href);
    sessionStorage.setItem("violation", true);
    submitTest();
});


document.addEventListener("keydown", function (e) {
    if (e.key === "Meta" || e.key === "Win") {
        console.warn("Windows/Command key pressed! Auto-submitting test...");
        sessionStorage.setItem("violation", true);
        submitTest();
        showToast("Pressing Windows/Command key is not allowed! Your test has been submitted.");
    }

    if ((e.altKey && e.key === "Tab") || (e.ctrlKey && e.key === "Tab")) {
        console.warn("Alt+Tab or Ctrl+Tab detected! Auto-submitting test...");
        sessionStorage.setItem("violation", true);
        submitTest();
        showToast("Task switching is not allowed! Your test has been submitted.");
    }

    if (e.key === "Backspace") {
        let target = e.target.tagName.toLowerCase();
        if (target !== "input" && target !== "textarea") {
            sessionStorage.setItem("violation", true);
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
        sessionStorage.setItem("violation", true);
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
        sessionStorage.setItem("violation", true);
        submitTest();
    }

    lastActiveTime = performance.now();
});

let isAlertActive = false;
let blurStartTime = null;
let violationTimeout = null;

const originalAlert = window.alert;
window.alert = function (message) {
    isAlertActive = true;
    setTimeout(() => (isAlertActive = false), 1000); // Reset after 1 sec
    originalAlert(message);
};
window.addEventListener("blur", () => {
    if (isAlertActive) return; // Don't submit if an alert is open

    blurStartTime = performance.now();

    // Start a timer; submit if user doesn't return within 10 seconds
    violationTimeout = setTimeout(() => {
        if (!document.hasFocus() && !isAlertActive) {
            console.warn("Exam window lost focus for too long! Auto-submitting test...");
            sessionStorage.setItem("violation", true);
            submitTest();
            showToast("Switching to another tab for more than 10 seconds is not allowed! Your test has been submitted.");
        }
    }, 2000);  // 10-second delay
});
window.addEventListener("focus", () => {
    if (blurStartTime) {
        const timeAway = performance.now() - blurStartTime;

        if (timeAway < 10000) {
            console.log(`User returned within ${Math.round(timeAway / 1000)} seconds. No penalty.`);
        } else {
            console.warn("User returned after 10 seconds, but test was already submitted.");
        }
    }

    // Reset timers since the user is back
    clearTimeout(violationTimeout);
    blurStartTime = null;
});
