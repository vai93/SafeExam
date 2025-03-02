const path1 = "/mcq.html";

sessionStorage.removeItem("rollNumber");
sessionStorage.removeItem("name");
sessionStorage.removeItem("validStudent");
const testId=sessionStorage.getItem("testId");
document.getElementById("quizForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    showLoader();
    const rollNumber = document.getElementById("rollNumber").value.trim();
    sessionStorage.setItem("rollNumber", rollNumber);
    sessionStorage.removeItem("validStudent");
    sessionStorage.removeItem("violation");
    const uniqueKey = document.getElementById("uniqueKey").value.trim();
    
    try {
        const response = await fetch("api/validation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rollNumber, uniqueKey,testId })
        });

        const data = await response.json();
        if (response.ok && data.success) {
            sessionStorage.setItem("name", data.name);
            sessionStorage.setItem("rollNumber", data.rollNumber);
            sessionStorage.setItem("validStudent", true);
            sessionStorage.setItem("testTitle", data.testTitle);
            sessionStorage.setItem("testDuration", data.testDuration);
            alert("Validation successful! Starting quiz.");
            window.location.href = path1;
        } else {
            alert(data.message || "Validation failed");
        }
    } catch (error) {
        console.error("Error validating student:", error);
        alert("An error occurred during validation. Please try again later.");
    } finally {
        hideLoader();
    }
});


function createLoader() {
    if (!document.getElementById("loader")) {
        const loaderDiv = document.createElement("div");
        loaderDiv.id = "loader";
        loaderDiv.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            font-size: 20px;
            font-weight: bold;
            color: #333;
        `;
        loaderDiv.innerHTML = `
            Login... Please wait.
            <div id="spinner" style="
                border: 8px solid #6bf3ac;
                border-top: 8px solid #3498db;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                animation: spin 2s linear infinite;
                margin-top: 10px;
            "></div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
        document.body.appendChild(loaderDiv);
    }
}

function showLoader() {
    createLoader();
    document.getElementById("loader").style.display = "flex";
}

function hideLoader() {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "none";
    }
}
