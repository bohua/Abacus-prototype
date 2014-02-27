/**
 * Created by Bohua on 14-2-27.
 */
var filePath = __dirname + "/../../tests/data/综/20130501综.xls";
var connector = require("./bleach-data-connector.js");

connector(filePath, function(result){
	console.log(result);
});
