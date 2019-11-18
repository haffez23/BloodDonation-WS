
// imports 
const axios = require('axios');
const request = require('request')
var querystring = require("querystring");
const { PAP_SERVER, PAP_LOGIN } = require('../app/config/base')

// Login User 
exports.signin = function (req, res) {

    let email = "haffez23m@yahoo.fr"
    let password = "haffez23m0123"

    let data = "{\"C\":\"Pap_Api_AuthService\",\"M\":\"authenticate\",\"fields\":[[\"name\",\"value\",\"values\",\"error\"],[\"username\",\"" + email + "\",null,\"\"],[\"password\",\"" + password + "\",null,\"\"],[\"roleType\",\"A\",null,\"\"],[\"isFromApi\",\"Y\",null,\"\"],[\"apiVersion\",\"c278cce45ba296bc421269bfb3ddff74\",null,\"\"]]}";

    request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: 'https://influencer.boostiny.app/scripts/server.php?D=' + data,

    }, (error, response, body) => {
        if (error) {
            res.send(error);
        } else {
            res.json(response.body);
        }
    });

}

exports.signup = function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let refid = req.body.refid;
    let session = "";

    let data = "{C:Gpf_Rpc_Server,M:run,requests:[{C:Pap_Merchants_User_AffiliateForm,M:add,fields:[[name,value],[Id,],[username," + email + "],[rpassword," + password + "],[firstname," + firstName + "],[lastname," + lastName + "],[timezoneOffset,],[useCustomTimezone,N],[lang,],[photo,],[rstatus,A],[note,],[dontSendEmail,N],[createSignupReferralComm,N],[parentuserid,],[refid," + refid + "]]}],S:" + session + "}";

    request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: 'https://influencer.boostiny.app/scripts/server.php?D=' + data,
    }, (error, response, body) => {
        if (error) {
            res.send(error);
        } else {
            res.json(response.body);
        }
    });

}

// Update User Info
exports.update = function (req, res) {
    let email = req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let city = req.body.refid;
    let phoneNumber = req.body.phoneNumber;
    let dateOfBirth = req.body.dateOfBirth;
    let gender = req.body.gender;
    let session = "";

    let data = "{\"C\":\"Gpf_Rpc_Server\", \"M\":\"run\", \"requests\":[{\"C\":\"Pap_Affiliates_Profile_PersonalDetailsForm\", \"M\":\"save\", \"fields\":[[\"name\",\"value\"],[\"Id\",\"\"],[\"username\",\"" + email + "\"],[\"rpassword\",\"\"],[\"firstname\",\"" + firstName + "\"],[\"lastname\",\"" + lastName + "\"],[\"timezoneOffset\",\"3600\"],[\"useCustomTimezone\",\"N\"],[\"lang\",\"Francais-TN (French-TN) [fr]\"],[\"notificationemail\",\"" + email + "\"],[\"data1\",\"\"],[\"data2\",\"\"],[\"data3\",\"\"],[\"data4\",\"" + city + "\"],[\"data5\",\"\"],[\"data6\",\"TN\"],[\"data7\",\"\"],[\"data8\",\"" + phoneNumber + "\"],[\"data9\",\"\"],[\"data10\",\"" + dateOfBirth + "\"],[\"data11\",\"" + gender + "\"]]}], \"S\":\"" + session + "\"}";
    request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: 'https://influencer.boostiny.app/scripts/server.php?D=' + data,
    }, (error, response, body) => {
        if (error) {
            res.send(error);
        } else {
            res.json(response.body);
        }
    });

}
exports.payout = function (req, res) {
    let agency = req.body.agency;
    let bank = req.body.bank;
    let rib = req.body.rib;
    let session = "";

    let data = "{\"C\":\"Gpf_Rpc_Server\",\"M\":\"run\",\"requests\":[{\"C\":\"Pap_Affiliates_Profile_PersonalDetailsForm\",\"M\":\"savePayouts\",\"fields\":[[\"name\",\"value\"],[\"Id\",\"\"],[\"payoutoptionid\",\"dcc2ffa7\"],[\"applyVatInvoicing\",\"N\"],[\"minimumPayoutOptions\",\"100,200,300,400,500\"],[\"minimumpayout\",\"100\"],[\"vatPercentage\",\"\"],[\"vatNumber\",\"\"],[\"amountOfRegCapital\",\"\"],[\"regNumber\",\"\"],[\"agence\",\"" + agency + "\"],[\"bank_name\",\"" + bank + "\"],[\"rib\",\"" + rib + "\"]]}],\"S\":\"" + session + "\"}";

    request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: 'https://influencer.boostiny.app/scripts/server.php?D='+data,
    }, (error, response, body) => {
        if (error) {
            res.send(error);
        } else {
            res.json(response.body);
        }
    });

}

exports.banners = function (req, res) {
    let userSession = 'si1m7jnki49okw181xy7vzkkanu8vmdi'
    var results = []
    getSession((error, sessionId) => {

        if (!error) {
            topBanners = new Promise((resolve, reject) => {
                let data = "{\"C\": \"Gpf_Rpc_Server\",\"M\": \"run\",\"requests\": [{\"C\": \"Pap_Merchants_Banner_BannersStatsGrid\"," +
                    "\"M\": \"getRows\",\"sort_col\": \"clicksUnique\",\"sort_asc\": false,\"offset\": 0,\"limit\": 2,\"columns\": " +
                    "[[\"id\"],[\"id\"],[\"banner\"],[\"rtype\"],[\"isconfirmed\"],[\"campaignname\"],[\"account\"],[\"impressionsAll\"]," +
                    "[\"impressionsRaw\"],[\"clicksUnique\"],[\"salesCount\"],[\"commissions\"],[\"rorder\"]]}, " +
                    "{\"C\": \"Pap_Merchants_Banner_BannersStatsGrid\",\"M\": \"getRows\",\"sort_col\": \"salesCount\"," +
                    "\"sort_asc\": false,\"offset\": 0,\"limit\": 2,\"columns\": [[\"id\"],[\"id\"],[\"banner\"],[\"rtype\"]," +
                    "[\"isconfirmed\"],[\"campaignname\"],[\"account\"],[\"impressionsAll\"],[\"impressionsRaw\"],[\"clicksUnique\"]," +
                    "[\"salesCount\"],[\"commissions\"],[\"rorder\"]]}],\"S\": \"" + sessionId + "\"}";

                request.post({
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    url: 'https://influencer.boostiny.app/scripts/server.php?D=' + data,
                }, (error, response, body) => {
                    if (error) {
                        results[0] = true
                    } else {
                        results[0] = response.body
                    }
                    resolve(results);
                    console.log("R1")
                });
            })


            
            loadCampaigns = new Promise((resolve, reject) => {
                let data = "{\"C\":\"Gpf_Rpc_Server\", \"M\":\"run\", \"requests\":[{\"C\":\"Pap_Affiliates_Promo_CampaignsGrid\", \"M\":\"getRows\",\"columns\":[[\"id\"],[\"campaignid\"],[\"name\"],[\"description\"],[\"logourl\"],[\"banners\"],[\"longdescriptionexists\"],[\"commissionsdetails\"],[\"rstatus\"],[\"commissionsexist\"],[\"affstatus\"],[\"dateinserted\"]]},{\"C\":\"Pap_Affiliates_Promo_BannersGrid\",\"M\":\"getRows\"}],\"S\":\"" + userSession + "\"}";
                request.post({
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    url: 'https://influencer.boostiny.app/scripts/server.php?D='+data,
                }, (error, response, body) => {
                    if (error) {
                        results[1] = true

                    } else {
                        let responseJson = JSON.parse(response.body);

                        results[1] = responseJson
                    }
                    console.log("R2")
                    resolve(results);

                });
            })
            // getAllCategories = new Promise((resolve, reject) => {
            //     let data = "{\"C\":\"Gpf_Rpc_Server\",\"M\":\"run\",\"requests\":[{\"C\":\"Pap_Features_BannersCategories_BannerInCategoriesGrid\",\"M\":\"getRows\",\"offset\":0,\"limit\":100,\"filters\":[[\"bannerid\",\"=\",\"" + banner.getId() + "\"]],\"columns\":[[\"id\"],[\"id\"],[\"name\"]]}],\"S\":\"" + PreferencesManager.getInstance().getSharedPreferences().getString("accessToken", "") + "\"}";
            //     request.post({
            //         headers: { 'content-type': 'application/x-www-form-urlencoded' },
            //         url: 'https://influencer.boostiny.app/scripts/server.php?D=' + data,
            //     }, (error, response, body) => {
            //         if (error) {
            //             results[0] = true
            //         } else {
            //             results[0] = response.body
            //         }
            //         resolve(results);
            //         console.log("R1")
            //     });
            // })
            Promise.all([loadCampaigns]).then(response=>{
                console.log("All resolved")

                 res.json(response);
            });

        } else {
            res.status(400).json({ "message": "M session expired" })
        }
    })

}
function getSession(callback) {
    const email = "dev@boostiny.me";
    const password = "Boostiny2019PAP";

    let data = "{\"C\":\"Pap_Api_AuthService\",\"M\":\"authenticate\",\"fields\":[[\"name\",\"value\",\"values\",\"error\"],[\"username\",\"" + email + "\",null,\"\"],[\"password\",\"" + password + "\",null,\"\"],[\"roleType\",\"M\",null,\"\"],[\"isFromApi\",\"Y\",null,\"\"],[\"apiVersion\",\"c278cce45ba296bc421269bfb3ddff74\",null,\"\"]]}";

    request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: 'https://influencer.boostiny.app/scripts/server.php?D=' + data,

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