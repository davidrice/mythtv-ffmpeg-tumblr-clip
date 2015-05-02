var React = require('react');
var path = require("path");
var express = require("express");
var config = require("config");
var bodyParser = require("body-parser");
var app = express();
var routes = require('./routes');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine({beautify:true}));

app.use('/clips', express.static(__dirname + "/clips"));
app.use('/static', express.static(__dirname + "/public"));
app.use(bodyParser.json());

var mythtv = require("./mythFrontendClient").create(config.mythfrontend.hostname);

var transcodeJobManager = require("./transcodeJobManager");

app.get('/', routes.index);
app.post("/mythtv/clip", function(req, res) {
	var duration = req.body.duration;
	mythtv.getStatus(function(err, frontendStatus) {
		if(err==null){
			var offset = frontendStatus.playedtime;
			var pathname = path.basename(frontendStatus.pathname)
			var starttime = frontendStatus.starttime;
			var title = frontendStatus.title;
			if(duration && offset && pathname && starttime && title) {
				transcodeJobManager.startJob({
					"status":"ok",
					"duration":duration,
					"offset": offset,
					"pathname": pathname,
					"starttime": starttime,
					"title": title
				}, function(err,result) {
					if(err==null) {
						res.status(200).json(result);
					}
					else {
						res.status(400).json({"error":"job not done"});
					}
				});
			}
			else {
				res.status(400).end();
			}
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
