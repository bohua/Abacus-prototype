/**
 * Created by Bli on 14-2-10.
 */
var schemaReader = require('./readJsonSchema');
var schema = __dirname + "/../../schema/left-menu-options-schema.json";

module.exports = function (req, res) {
	schemaReader(schema, function(data, err){
		if(err){
			res.statusCode = "400";
			res.end(err.message);
		}else{
			res.contentType('json');
			res.json(data);
		}
	});
};