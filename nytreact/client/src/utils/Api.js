import axios from "axios";

const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
const APIKEY= "573f078f5a8348258eb1f9590a79e368";

export default {
    searchArticles: function(searchObj) {
        return axios.get(BASEURL, {
            params: {
                "api-key": APIKEY,
                "q": searchObj.searh,
                "begin_date": searchObj.startdate,
                "end_date": searchObj.enddate
            }
        })
    } 
}
