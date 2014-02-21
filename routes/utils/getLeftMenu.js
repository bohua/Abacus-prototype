/**
 * Created by Bli on 14-2-10.
 */
var schema = __dirname + "/../../schema/left-menu-options-schema.json",
	fs = require('fs');

module.exports = function (req, res) {
	try{
		var menuObj = JSON.parse(fs.readFileSync(schema, 'utf8'));

		res.contentType('json');
		res.json(menuObj);
	}catch(e){
		//Catch exceptions

		res.statusCode = "400";
		res.end(e.message);
	}
};