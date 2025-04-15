const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
    jwt.verify(token, "abil123", (err, decoded) => {
        if (err) {
        return res.status(403).json({ message: "Forbidden" });
        }
        console.log(decoded);
        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;