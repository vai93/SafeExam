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
        const { rollNumber, testId, answers, violation, studentName } = req.body;
        if (!rollNumber || !testId || !answers) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const now = new Date();
        const formattedDate = `${now.getHours() < 10 ? "0" + now.getHours() : now.getHours()}:${now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()}_${now.getDate() < 10 ? "0" + now.getDate() : now.getDate()}-${ 
            now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1
        }-${now.getFullYear().toString().slice(-2)}`;

        const customDocId = `${rollNumber}_${formattedDate}`;

        // Fetch correct answers from Admin SDK
        const questiondb = `${testId}Questions`;
        const querySnapshot = await db.collection(questiondb).get();
        const correctAnswers = {};

        querySnapshot.forEach((doc) => {
            correctAnswers[doc.id] = doc.data().answer;
        });

        // Calculate score
        let score = Object.keys(correctAnswers).reduce((acc, question) => {
            return acc + (answers[question] === correctAnswers[question] ? 1 : 0);
        }, 0);

        // Save response in Admin SDK
        const responsedb = `${testId}StudentResponses`;

        await db.collection(responsedb).doc(customDocId).set({
            answers,
            score,
            rollNumber,
            studentName,
            submittedAt: now.toISOString(),
            violation,
        });

        return res.json({ success: true, score });
    } catch (error) {
        console.error("Error submitting answers:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
