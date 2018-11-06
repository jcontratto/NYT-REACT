const Articles = require("../models/Articles");

module.exports = {
   insertArticle: (req, res) => {
     
       let {id, title, summary, date, url} = req.body
     Articles.create( { id, title, summary, date, url} ).then(article => {
         console.log(article)
        res.status(200).json(article)
     }).catch(err => {
         console.log(err)
     })
    //  console.log(article)
    //       article.save((err, article) => {
    //            console.log("HERE", err, article)
    //            if(err)
    //            res.status(400).json(err)
    //            else if (!article)
    //            res.status(400).send("NO ARTICLE SAVED")
    //            else {
    //               res.status(200).json(article)
    //            };
    //        });
       
   },

}