const Articles = require("../models/Articles");

// var article = new articleSave(request.body);
// article.save();

module.exports = {
   insertArticle: (req, res) => {
     console.log('insert article isworking')
    let {id, title, summary, date, url} = req.body
    Articles.create( { id, title, summary, date, url} ).then(article => {
        console.log(article)
        //   article.save((err, article) => {
        //        console.log("HERE", err, article)
        //        if(err)
        //        res.status(400).json(err)
        //        else if (!article)
        //        res.status(400).send("NO ARTICLE SAVED")
        //        else {
        //           res.status(200).json(article)
        //        };
        //    });
        res.status(200).json(article)
    }).catch(err => {
        console.log('err occured saving article')
        throw err;
    })
     
    },
}