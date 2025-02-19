
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
        sessionStorage.setItem("violation", "beforeunload");
     
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

