var path = require("path");
var express = require("express");
var config = require("config");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());

var mythtv = require("./mythFrontendClient").create(config.mythfrontend.hostname);

var transcodeJobManager = require("./transcodeJobManager");

app.post("/mythtv/clip", function(req, res) {
	var duration = req.body.duration;
	mythtv.getStatus(function(err, frontendStatus) {
		if(err==null){
			var pathname = path.basename(frontendStatus.pathname)
			res.status(200).json({"status":"ok","duration":duration, "pathname": pathname});
		}
		else {
			res.status(400).end();
		}
	});
});

app.get("/mythtv/status", function(req, res) {
	mythtv.getStatus(function(err,frontendStatus) {
		if(err==null) {
			res.status(200).json(frontendStatus);
		}
		else {
			res.status(400).end();
		}
	});
});

app.listen(9000);
