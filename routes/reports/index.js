/**
 * Created by bli on 14-2-28.
 */
var db = require(__dirname + '/../../models'),
	schemaReader = require(__dirname + '/../platform').readJsonSchema;

module.exports = function (req, res) {
	var requstedReport = require(__dirname + '/' + req.query.reportId + '/report.js');
	var schemJsonFile = __dirname + '/' + req.query.reportId + '/schema.json';

	var schema = schemaReader(schemJsonFile, function (chartData, err) {
		if (err) {
			res.statusCode = "400";
			res.end({
				message: err.message,
				code: 'CHART_SCHEMA_LOAD_FAIL'
			});
		}else{
			var input = {
				req: req,
				res: res,
				db: db,
				chartData: chartData
			}
			requstedReport(input);
		}
	});
}