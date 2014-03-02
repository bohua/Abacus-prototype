/**
 * Created by bli on 14-2-28.
 */
var db = require(__dirname + '/../../../models');
var schemaReader = require(__dirname + '/../../platform').readJsonSchema;
var schema = __dirname + '/schema.json';

module.exports = function (req, res) {
	var start_time = req.query.start_time;
	var end_time = req.query.end_time;

	db.DailyReport.findAll({
		where: {
			record_time: {
				between: [start_time, end_time]
			}
		},
		order: 'record_time',
		attributes: [
			'record_time',
			'outbound_MPA',
			'outbound_total',
			'power_consumption'
		]
	}).complete(function (err, dailyReport) {
			schemaReader(schema, function (chartData, err) {
				if (err) {
					res.statusCode = "400";
					res.end(err.message);
				} else {
					for (var entry in dailyReport) {
						//var t = dailyReport[entry].record_time;
						//var hour = t.getUTCHours() === 0 ? 24 : t.getUTCHours();
						var formattedT = dailyReport[entry].record_time.getUTCHours() + ':00';

						chartData.xAxis.categories.push(formattedT);
						chartData.series[0].data.push(dailyReport[entry].power_consumption);
					}

					var d = dailyReport[0].record_time;
					chartData.series[0].name = d.getUTCFullYear() + "年" + (d.getUTCMonth() + 1) + "月" + d.getUTCDate() + "日";

					res.contentType('json');
					res.json(chartData);
				}
			});
		});
}