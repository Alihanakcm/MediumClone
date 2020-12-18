const jwt = require("jsonwebtoken");
module.exports = (user) => {
    const token = jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
    return token;
}