var ffmpeg = require('fluent-ffmpeg');
var path = require("path");
var config = require("config");
var uuid = require("uuid");

var TranscodeJobManager = {
	counter: 0,
	running: false,
	jobs: [],
	maxJobs: 1,
	transcode: function(jobConfig) {
		var self = this;
		var fullPath = path.join(config.mythbackend.recordings.path, jobConfig.pathname);
		var outputFilename = makeOutputFilename(jobConfig);
		var outputPath = path.join(config.clips.path, outputFilename);
console.log(outputPath);
		ffmpeg(fullPath).seekInput(jobConfig.offset).duration(jobConfig.duration).audioCodec("aac").videoCodec("libx264").videoBitrate(10000, true).on("end", function() {
			console.log('done with ' + outputPath);
			self.running = false;
			self.runJob();
		}).on("error", function(err) {
			console.log(err);	
		}).save(outputPath);;
	},
	runJob: function() {
		if(this.jobs.length>0 && !this.running) { 
			var job = this.jobs.shift();
			this.running = true;
			this.transcode(job);
		}
		else {
			console.log('all jobs done');
		}
	},
	startJob: function(jobConfig, callback) {
		this.counter++;
		jobConfig.id = uuid.v4();
		this.jobs.push(jobConfig);
		this.runJob();
		callback(null, {"id":jobConfig.id});
	}
};

function makeOutputFilename(jobConfig) {
	return jobConfig.id + ".mp4";
	/*
	var filename = jobConfig.title.split(" ").join("_") + "-" + jobConfig.starttime + "+" + jobConfig.offset + "+" + jobConfig.duration + ".mp4";
	return filename;
	*/
}

module.exports = TranscodeJobManager;
