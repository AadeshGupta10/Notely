const jwt = require("jsonwebtoken");

const setToken = (user) => {
    const payload = {
        _id: user._id
    }

    return jwt.sign(payload, process.env.SECRET_CODE)
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.SECRET_CODE);
    } catch (error) {
        throw new Error("Invalid Token")
    }
}

module.exports = {
    setToken,
    verifyToken
}