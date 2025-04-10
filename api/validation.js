const { db } = require("../firebase-admin-setup");
const admin = require("firebase-admin");
const cookie = require("cookie");
module.exports = async (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "https://safe-exam.vercel.app");  // Allow all origins
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { rollNumber, uniqueKey } = req.body;
        if ( !rollNumber || !uniqueKey) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        
        const studentRef = await db.collection("studentDetails").doc(rollNumber).get();
        const studentSnap = studentRef.data();
        
        if (!studentSnap) {
            return res.status(404).json({ message: "Roll number not found" });
        }

        if (String(studentSnap.uniqueKey) !== String(uniqueKey)) {
            return res.status(401).json({ message: "Invalid unique key" });
        }
     res.setHeader("Set-Cookie", cookie.serialize("validStudent", "true", {
    secure: true,
    sameSite: "None",
    path: "/",
    maxAge: 60 * 60, // 1 hour
}));

        
        return res.json({ success: true, name: studentSnap.name,rollNumber:studentSnap.rollNumber });

    } catch (error) {
        console.error("Error validating student:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
