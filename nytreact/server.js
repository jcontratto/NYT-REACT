//Dependecies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const articles = require("./client/src/routes/article");
const app = express();
const axios = require("axios");
const PORT = process.env.PORT || 3002;
var articlesController = require("./client/src/server/controllers/articlesController");
var router = new express.Router();
var db = require("./client/src/server/models");


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nytreact";
mongoose.connect(MONGODB_URI);

//Static Assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
} else {
    app.use(express.static(__dirname + "/client/build"));
}

//Logging requests through morgan
app.use(logger("dev"));
//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(articles)

// //Once Heroku is added, put Heroku link here

//Starting API server here
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});