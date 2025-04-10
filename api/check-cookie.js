const { db } = require("../firebase-admin-setup");
const admin = require("firebase-admin");
const cookie = require("cookie");

module.exports = async (req, res) => {
    // CORS headers (if needed)
    res.setHeader("Access-Control-Allow-Origin", "*");  // Or restrict to your domain
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    // ✅ Use cookie package to parse
    const cookies = cookie.parse(req.headers.cookie || "");
    const validStudent = cookies.validStudent === "true";

    if (validStudent) {
        return res.json({ valid: true });
    }

    return res.json({ valid: false });
};
