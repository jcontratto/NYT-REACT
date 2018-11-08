import axios from "axios";
//import router from "../routes/article";

export default {
    searchArticles: function (searchObj) {

        return axios.get("/nytarticles", {
            params: {
                "q": searchObj.q,
                "start_date": searchObj.start_date,
                "end_date": searchObj.end_date
            }
        })
    },

    saveArticle: function (article) {
        return axios.post("/articles", article)
    },

    getArticles: function () {
        return axios.get("/articles")
    },

    deleteArticles: function(id) {
        return axios.delete("/articles/" + id)
    }

};

