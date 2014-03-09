/**
 * Created by bli on 14-2-28.
 */
var Q = require('q');
var extend = require('extend');

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
			var promises = [];

			var series = JSON.parse(req.query.series)

			for(var arg in series){
				var input = {
					data_desc: series[arg].data_desc,
					start_time: series[arg].start_time,
					end_time: series[arg].end_time,
					db: db,
					chartData: extend(true, {}, chartData)
				}

				promises.push(requstedReport(input));
			}

			Q.allSettled(promises)
				.then(function (results) {
					var response;

					for (var result in results){
						if (results[result].state === "fulfilled") {
							if(!response){
								response = results[result].value;
							}else{
								if(results[result].value.series[0].data_desc === "current"){
									response.series.unshift(results[result].value.series[0]);
								}else{
									response.series.push(results[result].value.series[0]);
								}

							}
						}
					}

					res.contentType('json');
					res.json(response);
				});
		}
	});
}