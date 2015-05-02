var React = require('react');
var request = require('superagent');

var ClipMakerForm = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var duration = e.target.duration.value;
		request
			.post('/mythtv/clip')
			.send({duration: duration})
			.set('Accept', 'application/json')
			.end(function(err, result) {
				if(err==null) {
					console.log(result);	
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
