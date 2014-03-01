/**
 * Created by bli on 14-2-28.
 */
var db = require(__dirname + '/../../models');

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
			var chartData = {
				xAxis: [],
				series: [
					{
						name: 'OUTBOUND',
						data: []
					}
				]
			};

			for (var entry in dailyReport) {
				var t = dailyReport[entry].record_time;
				var hour = t.getUTCHours() === 0 ? 24 : t.getUTCHours();
				var formattedT = hour +':00';

				chartData.xAxis.push(formattedT);

				chartData.series[0].data.push(dailyReport[entry].power_consumption);
			}

			res.contentType('json');
			res.json(chartData);
		});
}