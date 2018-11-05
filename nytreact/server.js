//Dependecies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const articles = require("./client/src/routes/article");
const app = express();
const axios = require("axios");
const PORT = process.env.PORT || 3002;
var articlesController = require("./client/src/server/controllers/articlesController");
var router = new express.Router();

var db = require("./client/src/server/models");

//Static Assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build")); 
} else {
    app.use(express.static(__dirname + "/client/build"));
}


//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/nytarticles", function (req, res, next) {
    next();
  }) 

  app.get("/nytarticles", (req, res, next) => {
    console.log("express is working");
    const q = req.query.q;
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;
    const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    const APIKEY = "573f078f5a8348258eb1f9590a79e368";

    axios.get(BASEURL, {
        params: {
            "q": q,
            "start_date": start_date,
            "end_date": end_date,
            "api-key": APIKEY
        }

    }).then(articles => {
        console.log("then");
        var articleArray = articles.data.response.docs

       for (var i in articleArray) {
            var headline = articleArray[i]['headline'].main
            var snippet = articleArray[i].snippet
            var url = articleArray[i].web_url
            var id = articleArray[i]['_id']
            console.log(headline, " || ", snippet, " || ", url, "||", id);
        }

       // res.status(200).send(headline + "||" + id + "||" + snippet + "||" + url)

        // console.log("startres", articles.data.response.docs[3].source, "endres");
       res.status(200).send(articleArray);

    })
        .catch(err => {
            console.log(err, "not working");
            res.status(500).send();
        })

   


});


  


  




// //Need to add API routes and view here








var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nytreact";
mongoose.connect(MONGODB_URI);
// mongoose.connect("mongodb:localhost/nytreact");

router.use(function (req, res, next) {
    console.log("Logging done");
    next();
});

//Post to MongoDb
router.route("/articles").post(function (req, res) {
    console.log("adding");
    var a = new articles();
    a.id = req.body.id;
    a.title = req.body.title;
    a.summary = req.body.summary;
    a.date = req.body.date; 
    a.url= req.body.url;
    a.saved = req.body.saved;
    a.save(function (e) {
        if (e) {
            res.send(e);
        }
        console.log("Added to db");
        res.send({ message: "Articles added"})
    })
});





// //Once Heroku is added, put Heroku link here

// if (error) {
//     console.log(error);
// }
// else {
//     console.log("connected with mongoose")
// }

//Starting API server here
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});