const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const router = new express.Router();
const app = express();
const articlesController = require("../server/controllers/articlesController");



router.get("/nytarticles", (req, res, next) => {
    console.log("router.get working");
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

        res.status(200).send(headline + "||" + id + "||" + snippet + "||" + url)

         console.log(headline, "||", snippet, "||", url)
        // console.log("startres", articles.data.response.docs[3].source, "endres");
        //  res.status(200).send(headline + " || " + snippet + " || " + url);

    })
        .catch(err => {
            console.log(err, "not working");
            res.status(500).send();
        })

        next();


});

exports = module.exports = router;
