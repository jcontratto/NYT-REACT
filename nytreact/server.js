//Dependecies
const express = require("express");
const mongoose = require("mongoose");
// const logger = require("morgan");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3002;

//Middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Static Assets
if (process.env.NODE_ENV === "production") {
app.use(express.static("client/build"));
} else {
    app.use(express.static(__dirname + "/client/build"));
}


//Need to add API routes and view here
app.use(routes);

//Once Heroku is added, put Heroku link here
mongoose.connect(process.env.MONGODB_URI || "mongodb:localhost/nytreact");

//Starting API server here
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});