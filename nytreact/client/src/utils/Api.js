import axios from "axios";

export default {
    searchArticles: function(searchObj) {
        return axios.get("/nytarticles", {
            params: {
                "q": searchObj.q,
                "start_date": searchObj.start_date,
                "end_date": searchObj.end_date
            }
        })
    } 
}
