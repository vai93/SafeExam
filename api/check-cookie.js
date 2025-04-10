module.exports = async (req, res) => {
    const cookies = req.headers.cookie || "";
    const validStudent = cookies.split("; ").find(c => c.startsWith("validStudent="))?.split("=")[1];
    if (validStudent === "true") {
        return res.json({ valid: true });
    }
    return res.json({ valid: false });
};
