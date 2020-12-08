var express = require("express");
var app = express();
var routes = require("../src/api/routes/index");
var bodyParser = require("body-parser");
require("dotenv").config({ path: "../.env" })

app.use(bodyParser.urlencoded({ extended: false }))

app.use(routes.post)
app.use(routes.user)


app.listen(process.env.PORT, () => {
    console.log("live on : " + process.env.PORT);
})