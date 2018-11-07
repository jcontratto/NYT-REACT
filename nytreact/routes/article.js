const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const router = new express.Router();
const app = express();
const articlesController = require("../server/controllers/articlesController");
const Articles = require("../server/models/Articles");

router.get("/nytarticles", (req, res) => {
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

        var articleArray = articles.data.response.docs
        var list = []

        for (var i in articleArray) {
            var headline = articleArray[i]['headline'].main
            var snippet = articleArray[i].snippet
            var date = articleArray[i].pub_date
            var url = articleArray[i].web_url
            var id = articleArray[i]['_id']
            var object = { "title": headline, "summary": snippet, "url": url, "id": id, "date": date }

            list.push(object)
        }
        console.log(list)
        res.status(200).send(list);

    }).catch(err => {
        console.log(err);
        res.status(500).send();
    })
});

//Post to MongoDb
router.post("/articles", articlesController.insertArticle)

module.exports = router;
