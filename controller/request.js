const Request = require('../models/request');

let Pusher = require("pusher");

exports.new = function (req, res) {
    var request = new Request({

        bloodgroup: req.body.bloodgroup,
        place: req.body.place,
        donor: req.body.donor,
        userId: req.body.userId


    });

    var groupname = ""

    console.log("req.body.bloodgroup"+req.body.bloodgroup)
    switch (req.body.bloodgroup) {
        case "AP": groupname = "APAMOPOM"
        case "OP": groupname = "OPOM"
        case "BP": groupname = "BPBMOPOM"
        case "ABP": groupname = "ALL"
        case "AM": groupname = "AMOM"
        case "OM": groupname = "OM"
        case "BM": groupname = "BMOM"
        case "ABM": groupname = "ABMAMBMOM"
    }
    console.log("groupname === > "+groupname)

    let pusher = new Pusher({
        appId: '779439',
        key: '82be38e95b2679156d2e',
        secret: '28ddbddfc10f6dc41a63',
        cluster: 'mt1',
        encrypted: true
      });

    console.log(request.place);
    // save the post and check for errors
    request.save(function (err) {

        if (err)
            res.status(400).json(err);
        else {
            let notifReq = {
                user : request.donor,
                image : "img",
                caption : "Need Blood",
                bloodType:groupname
              }
              pusher.trigger("bloodrequest", "new-request", { 
                notif:notifReq 
              });
            res.status(200).json({
                data: request,
            });
        }

    });
};
exports.index = function (req, res) {
    Request.get(function (err, requests) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }else{
            res.json(
                requests
            );
        }
        
    });
};
