const Articles = require("../models/Articles");

module.exports = {
   insertArticle: (req, res, next) => {
       let {id, title, summary, date, url} = req.body
       addNew ({ id, title, summary, date, url})
       function addNew(obj) {
           new Articles(obj).save((err, article) => {
               if(err)
               res.send(err)
               else if (!article)
               res.send(400)
               else {
                   return res.send(article) //_article?
               };
           });
       };
   },

}