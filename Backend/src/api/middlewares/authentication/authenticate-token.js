const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../../../.env" })

module.exports = (req, res, next) => {
    const header = req.headers["authorization"];
    const token = header.split(' ')[1];
    if (token == null)
        res.send(401);
    else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) res.send(403);
            req.user = user;
            next();
        });
    }

}