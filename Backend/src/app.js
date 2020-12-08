var express = require("express");
var app = express();
var routes = require("../src/api/routes/index");

require("dotenv").config({ path: "../.env" })


app.use(routes.post)
app.use(routes.user)


app.listen(process.env.PORT, () => {
    console.log("live on : " + process.env.PORT);
})