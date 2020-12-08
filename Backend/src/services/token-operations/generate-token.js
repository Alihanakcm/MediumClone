const jwt = require("jsonwebtoken");

module.exports = (user) => {
    console.log(user);
    const token = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
    return token;
}