const { verifyToken } = require("../services/authentication");

function checkForAuthentication() {
    return (req, res, next) => {
        const tokenCookie = localStorage.getItem("token");

        if (tokenCookie == null) {
            return res.status(401).send("Token Not Available");
        }

        try {
            const user = verifyToken(tokenCookie);
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).send("Token Invalid"); // Use 401 Unauthorized
        }
    }
}

module.exports = { checkForAuthentication }