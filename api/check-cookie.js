const { db } = require("../firebase-admin-setup");
const admin = require("firebase-admin");
const cookie = require("cookie");
module.exports = async (req, res) => {
     res.setHeader("Access-Control-Allow-Origin", "*");  // Allow all origins
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    const cookies = req.headers.cookie || "";
    const validStudent = cookies.split("; ").find(c => c.startsWith("validStudent="))?.split("=")[1];
    if (validStudent === "true") {
        return res.json({ valid: true });
    }
    return res.json({ valid: false });
};
