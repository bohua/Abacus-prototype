/**
 * Created by Bli on 14-2-10.
 */
var schema = "../../schema/left-menu-options-schema.json",
	fs = require('fs');

module.exports = function (req, res) {
	try{

	}

	res.contentType('json');
	res.json(schema);
};