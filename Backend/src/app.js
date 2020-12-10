var express = require("express");
var app = express();
var routes = require("../src/api/routes/index");
var bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv").config({ path: "../.env" })

app.use(bodyParser.json());

var corsOptions = {
    origin: 'http://localhost:4200',
    methods: "GET,HEAD,POST,DELETE",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

app.use(routes.user);
app.use(routes.post);
app.use(routes.like);
app.use(routes.comment);

app.listen(process.env.PORT, () => {
    console.log("live on : " + process.env.PORT);
})