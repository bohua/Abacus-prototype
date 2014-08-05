/*
 * GET home page.
 */
function formatFilePath(longPath){
	var pathArr = longPath.split('/dist');
	if(pathArr.length >=2 && pathArr[0].length < longPath.length){
		return pathArr[pathArr.length -1];
	}
	return null;
}

module.exports = function (req, res) {
	var walk = require('walk');
	var jsFiles = [];
	var pathArr = __dirname.split('\\');
	pathArr.pop();
	pathArr.pop();
	var projectPath= pathArr.join('/');
	var result = [];

	var productCodeWalker  = walk.walk(projectPath+'/dist/src', { followLinks: false });

	productCodeWalker.on('file', function(root, stat, next) {
		// Add js file to the list of files
		var suffix = '.js';
		//var minFolder = 'minified';

		if(stat.name.indexOf(suffix, stat.name.length - suffix.length) !== -1
		/*&& root.indexOf(minFolder, root.length - minFolder.length) !== -1*/){

			jsFiles.push(root + '/' + stat.name);
		}
		next();
	});

	productCodeWalker.on('end', function() {
		for(var i=0; i<jsFiles.length; i++){
			var fileName = formatFilePath(jsFiles[i]);
			if(fileName){
				result.push(fileName);
			}
		}

		res.render('./src/platform/index/index', { title: 'Express', data: result });
	});
};