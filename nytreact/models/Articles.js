//Dependicies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
//Title of the articles
title: { 
    type: String,
    required: true
},
//Summary of the article
summary: {
    type: String,
    required: true
},
//The date of the article
date: {
    type: Date,
    default: Date.now
},
//URL to the article
url: {
    type: String,
    required: true
}
});

const Articles = mongoose.model("Articles", articleSchema);

module.exports = Articles;