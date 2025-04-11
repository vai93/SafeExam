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
        const { rollNumber, testId } = req.body;

        if (!rollNumber || !testId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const responseDb = `${testId}StudentResponses`;
        const querySnapshot = await db.collection(responseDb).get();
        let responseFound = false;
        querySnapshot.forEach((doc) => {
            if (doc.id.includes(rollNumber)) {
                responseFound = true;
            }
        });
         const testSnap = await db.collection("TestDetails").doc(testId).get();
        // console.log(testId);
         if (!testSnap.exists) {
             return res.status(404).json({ message: "Test not found" });
         }
        const testData = testSnap.data();
        if (!testData.isActive) {
            return res.status(403).json({ message: "Exam has not started yet." });
        }
        return res.json({ success: true, responseFound });
    } catch (error) {
        console.error("Error checking response:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
