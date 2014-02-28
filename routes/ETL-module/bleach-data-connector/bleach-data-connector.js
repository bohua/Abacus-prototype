/**
 * Created by Bohua on 14-2-27.
 */

module.exports = function (filePath, callback) {
	var exec = require('child_process').exec;
	var script = __dirname + "/BleachDataParser.exe";
	var cmd = script + " " + filePath;

	exec(cmd,
		function (error, stdout, stderr) {
			if (!!error) {
				callback({
					success: false,
					reason: error
				});
			} else {
				try {
					var jsonObj = JSON.parse(stdout);

					callback({
						success: true,
						json: jsonObj
					});
				} catch (ex) {
					callback({
						success: false,
						reason: ex.message
					});
				}
			}
		});
}