const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    const header = req.headers["authorization"];
    const token = header.split(' ')[1];
    if (token == null || token == undefined)
        res.send(401);
    else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) res.send(403);
            else {
                req.user = user;
                next();
            }
        });
    }

}