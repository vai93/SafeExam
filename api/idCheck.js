const { db } = require("../firebase-admin-setup");
const admin = require("firebase-admin");
module.exports = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");  // Allow all origins
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { testId } = req.body;
        if (!testId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

       
         // 🔹 Check if test is active
         const testSnap = await db.collection("TestDetails").doc(testId).get();
        // console.log(testId);
         if (!testSnap.exists) {
             return res.status(404).json({ message: "Test not found" });
         }
        const testData = testSnap.data();
        if (!testData.isActive) {
            return res.status(403).json({ message: "Exam has not started yet." });
        }
        return res.json({ success: true, testDuration:testData.testDuration,testTitle:testData.testTitle });

    } catch (error) {
        console.error("Error validating Test:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
