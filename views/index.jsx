var React = require('react');

var DefaultLayout = require('./layouts/default');

var Index = React.createClass({
	render: function() {
		return( 
			<DefaultLayout>
				<h1>MythTv Ffmpeg Tumblr Clip</h1>
				<div id='mythtv-ffmpeg-tumblr-clip'>
				</div>
				<div id='clip'></div>
			</DefaultLayout>
		);
	}
});

module.exports = Index;
