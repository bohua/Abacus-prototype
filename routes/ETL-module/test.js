/**
 * Created by Bohua on 14-2-27.
 */
var filePath = __dirname + "/report-daily.xls";
var connector = require("./bleach-data-connector.js");

connector(filePath, function(result){
	console.log(result);
});
