var React = require('react');
var request = require('superagent');

var MythTvStatus = React.createClass({
	getInitialState: function() {
		return {
			title: '',
			subtitle: ''
		}
	},
	componentDidMount: function(e) {
		request
			.get('/api/mythtv/status')
			.set('Accept', 'application/json')
			.end(function(err, result) {
				if(err==null) {
					console.log(result);	
					this.setState(result);
				}
				else {
					console.log(err);
				}
			});
	},

	render: function() {
		return (
			<div className='mythtv-status'>
				<div className='mythtv-title'>
					<h2 className='title'>
					{this.state.title}
					</h2>
				</div>
				<div className='mythtv-subtitle'>
					<h2 className='title'>
					{this.state.subtitle}
					</h2>
				</div>
			</div>
		);
	}
});

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

	<MythTvStatus />,
	document.getElementById("mythtv-ffmpeg-tumblr-clip")
);
