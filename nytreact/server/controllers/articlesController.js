const Articles = require("../models/Articles");

module.exports = {
    insertArticle: (req, res) => {
        console.log('insert article isworking')
        let { id, title, summary, date, url } = req.body
        Articles.create({ id, title, summary, date, url }).then(article => {
            res.status(200).json(article)
        }).catch(err => {
            console.log('err occured saving article')
            throw err;
        })
    },

    getArticles: (req, res) => {
        Articles.find({}, (err, result) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).json(result)
            }
        })
    },

    deleteArticles: (req, res) => {
        Articles.deleteOne({_id: req.params.id}, (err, result) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send()
            }
        })
    }
}