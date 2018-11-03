const express = require("express");
const axios = require("axios");
const router = new express.Router();

const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
const APIKEY= "573f078f5a8348258eb1f9590a79e368";

router.get("/nytarticles", (req, res) => {
    const q = req.query.q;
    const start_date = req.query.start_date;
    const end_date = req.query.end_date; 

    axios.get(BASEURL, {
        params: {
            "q": q,
            "start_date": start_date,
            "end_date": end_date,
            "api-key": APIKEY
        }
    }).then( articles =>  {
        console.log(articles.data.response.docs);
        res.status(200).json(articles.data.response.docs);

        })
        .catch(err => {
            console.log(err);
            res.status(500).send();
        }) 
}); 

exports = module.exports = router
