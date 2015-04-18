var request = require("request");
var xml2js  = require("xml2js")
var config  = require("config");
var MythFrontendClient = {
	ipAddress: "127.0.0.1",

	create: function(ipAddress) {
		this.ipAddress = ipAddress;	
		return this;
	},

	getStatus: function(callback) {
		//http://nickel:6547/Frontend/GetStatus
		request("http://" + this.ipAddress + ":6547/Frontend/GetStatus", function(err, result, body) {
			if(err==null) {
				try {
					xml2js.parseString(body, function(err, response) {
						if(err==null) {
							var frontendStatus = {};
							var states = response.FrontendStatus.State[0]['String'];
							states.forEach(function(state) {
								var key = state.Key[0];
								var value = state.Value[0];
								frontendStatus[key] = value;
							});
							callback(null, frontendStatus);
						}
					});
				}
				catch(exception) {
					console.log(exception);
				}
			}
			else {
				callback(err);
			}
		});
	}
};
module.exports = MythFrontendClient;
