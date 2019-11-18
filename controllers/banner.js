// Imports
const request = require('request')
var fs = require('fs');
const Category = require('../models/category')

const { PAP_SERVER, LOCAL_PATH_DATA,M_USERNAME,M_PASSWORD } = require('../app/config/base')

exports.saveBanners = function (req, res) {
    //let userSession = 't5dyjgnwru51y6jsoy89gcdfnvpzi7k3'
    let userSession = ''
    var results = []
    // Login as Mershant and return session id 
    getSession((error, sessionId) => {
        if (!error) {
            // Get Top Banner From PAP using Merchant session id 
            topBanners = new Promise((resolve, reject) => {
                let data = "{\"C\": \"Gpf_Rpc_Server\",\"M\": \"run\",\"requests\": [{\"C\": \"Pap_Merchants_Banner_BannersStatsGrid\"," +
                    "\"M\": \"getRows\",\"sort_col\": \"clicksUnique\",\"sort_asc\": false,\"offset\": 0,\"limit\": 2,\"columns\": " +
                    "[[\"id\"],[\"id\"],[\"banner\"],[\"rtype\"],[\"isconfirmed\"],[\"campaignname\"],[\"account\"],[\"impressionsAll\"]," +
                    "[\"impressionsRaw\"],[\"clicksUnique\"],[\"salesCount\"],[\"commissions\"],[\"rorder\"]]}, " +
                    "{\"C\": \"Pap_Merchants_Banner_BannersStatsGrid\",\"M\": \"getRows\",\"sort_col\": \"salesCount\"," +
                    "\"sort_asc\": false,\"offset\": 0,\"limit\": 3,\"columns\": [[\"id\"],[\"id\"],[\"banner\"],[\"rtype\"]," +
                    "[\"isconfirmed\"],[\"campaignname\"],[\"account\"],[\"impressionsAll\"],[\"impressionsRaw\"],[\"clicksUnique\"]," +
                    "[\"salesCount\"],[\"commissions\"],[\"rorder\"]]}],\"S\": \"" + sessionId + "\"}";
                request.post({
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    url: PAP_SERVER + data,
                }, (error, response, body) => {
                    if (error) {
                        results[0] = true
                        reject(results)
                    } else {
                        results[0] = response.body
                        resolve(results);
                    }
                });
            })

            // Get All Campaigns From PAP using Affiliate session id 
            loadCampaigns = new Promise((resolve, reject) => {
                let data = "{\"C\":\"Gpf_Rpc_Server\", \"M\":\"run\", \"requests\":[" +
                    "{\"C\":\"Pap_Affiliates_Promo_CampaignsGrid\", \"M\":\"getRows\",\"columns\":[[\"id\"],[\"campaignid\"],[\"name\"],[\"description\"],[\"logourl\"],[\"banners\"],[\"longdescriptionexists\"],[\"commissionsdetails\"],[\"rstatus\"],[\"commissionsexist\"],[\"affstatus\"],[\"dateinserted\"]]}],\"S\":\"" + userSession + "\"}";
                request.post({
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    url: PAP_SERVER + data,
                }, (error, response, body) => {
                    if (error) {
                        results[1] = true
                        reject(results)
                    } else {
                        let responseJson = JSON.parse(response.body)[0]['rows'];
                        responseJson.shift()
                        results[1] = responseJson
                        resolve(results);
                    }

                });
            })
            // Get Categories From PAP where bannersCount greater than 0 using Affiliate session id 
            getAllCategories = new Promise((resolve, reject) => {
                let dataAllCats = "{\"C\":\"Gpf_Rpc_Server\",\"M\":\"run\",\"requests\":[{\"C\":\"Pap_Features_BannersCategories_BannerCategoriesFilterGrid\",\"M\":\"getRows\",\"offset\":0,\"filters\":[[\"bannersCount\",\"NE\",\ null\ ]],\"limit\":100,\"columns\":[[\"id\"],[\"id\"],[\"name\"],[\"bannersCount\"]]}],\"S\":\"" + userSession + "\"}";

                request.post({
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    url: PAP_SERVER + dataAllCats,
                }, (error, response, body) => {
                    if (error) {
                        results[2] = true
                    } else {
                        var categories = []
                        let categoriesJSONArray = JSON.parse(response.body)[0]['rows'];
                        let getbanner = "{\"C\":\"Gpf_Rpc_Server\",\"M\":\"run\",\"requests\":["
                        categoriesJSONArray.shift()
                        categoriesJSONArray.forEach(categoryJson => {
                            // new CategoryObject
                            var category = new Category();
                            category.id = categoryJson[0]
                            category.code = categoryJson[1]
                            category.state = categoryJson[2]
                            category.name = categoryJson[3]
                            category.depth = categoryJson[4]
                            category.bannersCount = categoryJson[5]
                            categories.push(category.toJSON())
                            // get id of category and create params of request getBanners with this id 
                            getbanner += "{\"C\":\"Pap_Affiliates_Promo_BannersGrid\",\"M\":\"getRows\",\"offset\":0,\"limit\":300,\"filters\":[[\"bannercategoryid\",\"IN\",\"" + category.id + "\"]],\"columns\":[[\"id\"],[\"id\"],[\"destinationurl\"],[\"name\"],[\"campaignid\"],[\"campaignname\"],[\"bannercode\"],[\"bannerdirectlinkcode\"],[\"bannerpreview\"],[\"rtype\"],[\"displaystats\"],[\"channelcode\"],[\"campaigndetails\"],[\"urlData1\"],[\"urlData2\"]]},"

                        });
                        getbanner = getbanner.substr(0, getbanner.length - 1)
                        getbanner += "],\"S\":\"" + userSession + "\"}"
                        request.post({
                            headers: { 'content-type': 'application/x-www-form-urlencoded' },
                            url: PAP_SERVER + getbanner,
                        }, (errorBanner, responseBanner, body) => {
                            if (errorBanner) {
                                results[2] = true
                            } else {
                                let bannersJSONArray = JSON.parse(responseBanner.body)
                                results[2] = bannersJSONArray
                                results[3] = categories
                                resolve(results);
                            }
                        })
                    }
                });
            })
            Promise.all([loadCampaigns, getAllCategories]).then(response => {
               let jsonCategories = response[1][3]
                let jsonBanners = response[1][2]
                let jsonCampaigns = response[1][1]
                let jsonTopBanners = response[1][0]

                // Assign for each category their banner 
                for (i = 0; i < jsonCategories.length; i++) {
                    let json = jsonCategories[i]
                    let JSONBannersArray = jsonBanners[i]['rows']
                    JSONBannersArray.shift()
                    json.banners = []

                    // Assign for each banner a campaign 
                    JSONBannersArray.forEach(banner => {
                        let campaign = jsonCampaigns.find(function (campaign) {
                            return campaign[0] == banner[3];
                        });
                        banner[36] = campaign
                        json.banners.push(banner);

                    });
                }
                fs.writeFile(LOCAL_PATH_DATA+"banners.json", JSON.stringify(jsonCategories), function (err) {
                    if (err) {
                       
                    }
                });
                
            });

        } else {
            res.status(400).json({ "message": "M session expired" })
        }
    })

}

exports.getBanners = function (req,res){
    var bannersText = fs.readFileSync(LOCAL_PATH_DATA+'banners.json').toString()
    res.json(JSON.parse(bannersText));
}

// Return Merchant session Id 
function getSession(callback) {

    const email = M_USERNAME;
    const password = M_PASSWORD;

    let data = "{\"C\":\"Pap_Api_AuthService\",\"M\":\"authenticate\",\"fields\":[[\"name\",\"value\",\"values\",\"error\"],[\"username\",\"" + email + "\",null,\"\"],[\"password\",\"" + password + "\",null,\"\"],[\"roleType\",\"M\",null,\"\"],[\"isFromApi\",\"Y\",null,\"\"],[\"apiVersion\",\"c278cce45ba296bc421269bfb3ddff74\",null,\"\"]]}";
    request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: PAP_SERVER + data,

    }, (error, response, body) => {
        if (error) {
            callback(true, null)
        } else {
            let responseJson = JSON.parse(response.body);
            if (responseJson.success === "Y") {
                let fields = responseJson.fields;
                callback(false, fields[7][1])
            } else {
                callback(true, null)
            }
        }
    });
}


