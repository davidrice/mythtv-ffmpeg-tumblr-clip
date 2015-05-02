var React = require('react');
var request = require('superagent');
var poll = require('when/poll');

var Clip = React.createClass({
	render: function() {
		return (
			<div class='clip'>
				<h2>{this.props.title}</h2>
				<video controls>
					<source src={this.props.uri} />
				</video>
			</div>
		);
	}
});

var ClipMakerForm = React.createClass({
	pollClipStatus: function(id) {
		var pollingIntervalId;
		pollingIntervalId = setInterval(function() {
			request
				.get('/api/mythtv/clip/' + id)
				.end(function(err, result) {
					if(err==null) {
						var clipData = JSON.parse(result.text);
						console.log(clipData);
						var title = clipData.title;
						var uri = clipData.uri;
						clearInterval(pollingIntervalId);
						React.render(
							<Clip title={title} uri={uri} />,
							document.getElementById("clip")
						);
					}
				})
			}, 5000);
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var duration = e.target.duration.value;
		var self = this;
		request
			.post('/api/mythtv/clip')
			.send({duration: duration})
			.set('Accept', 'application/json')
			.end(function(err, result) {
				if(err==null) {
					var clipData = JSON.parse(result.text);
					self.pollClipStatus(clipData.id);
				}
				else {
					console.log(err);
				}
			});
	},
	render: function() {
		console.log("rendering");
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type='text' name='duration' />
					<input type='submit' />
				</form>
			</div>
		);
	}
});

React.render(
	<ClipMakerForm />,
	document.getElementById("mythtv-ffmpeg-tumblr-clip")
);
