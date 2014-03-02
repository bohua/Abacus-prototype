/**
 * Created by Bli on 14-3-02.
 */
fs = require('fs');

module.exports = function (schemaPath, callback) {
	try{
		callback(JSON.parse(fs.readFileSync(schemaPath, 'utf8')), null);
	}catch(e){
		//Catch exceptions
		callback(null, e);
	}
};