var React = require('react');

var DefaultLayout = React.createClass({
	render: function() {
		return (
			<html>
				<head>
					<title>Title</title>
				</head>
				<body>
					{this.props.children}
					<script src="static/build/mythtv-ffmpeg-tumblr-clip.js"></script>
				</body>
			</html>
		);
	}
});

module.exports = DefaultLayout;
