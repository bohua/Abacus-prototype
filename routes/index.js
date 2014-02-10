/*
 * GET home page.
 */

function formatFilePath(longPath){
	var pathArr = longPath.split('/public');
	if(pathArr.length >=2 && pathArr[0].length < longPath.length){
		return pathArr[pathArr.length -1];
	}
	return null;
}

exports.index = function (req, res) {
	var walk = require('walk');
	var jsFiles = [];
	var pathArr = __dirname.split('\\');
	pathArr.pop();
	var projectPath= pathArr.join('/');
	var result = [];

	// Walker options
	var walker  = walk.walk(projectPath+'/public/src', { followLinks: false });

	walker.on('file', function(root, stat, next) {
		// Add js file to the list of files
		var suffix = '.js';
		if(stat.name.indexOf(suffix, stat.name.length - suffix.length) !== -1){
			jsFiles.push(root + '/' + stat.name);
		}
		next();
	});

	walker.on('end', function() {
		for(var i=0; i<jsFiles.length; i++){
			var fileName = formatFilePath(jsFiles[i]);
			if(fileName){
				result.push(fileName);
			}
		}

		//console.log(result);
		res.render('index', { title: 'Express', jsFiles: result });
	});

	//
};