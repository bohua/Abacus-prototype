/**
 * Created by bli on 14-2-24.
 */
var schema = __dirname + "/../../schema/left-menu-options-schema.json",
	fs = require('fs');

function findLocation(arr, seed, path){
	for(var i=0; i< arr.length; i++){
		var loc = arr[i];

		if(loc.id === seed){
			path.push(loc);
			return path;
		}

		if(loc.submenus){
			path.push(loc)
			var result = findLocation(loc.submenus, seed, path);
			if(result){
				return path;
			}else{
				path.pop();
			}
		}
	}

	return null;
}

module.exports = function (req, res) {
	var locationId = req.query.locationId;

	try{
		var menuObj = JSON.parse(fs.readFileSync(schema, 'utf8'));

		var result = findLocation(menuObj, locationId, new Array());

		if(!result){
			throw "location not found!";
		}

		res.contentType('json');
		res.json(result);
	}catch(e){
		//Catch exceptions

		res.statusCode = "400";
		res.end(e.message);
	}
};