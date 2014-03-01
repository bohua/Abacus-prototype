/**
 * Created by Bohua on 14-3-1.
 */
var db = require(__dirname + '/../../models');

module.exports = function (req, res) {
	var start_time = req.query.start_time;
	var end_time = req.query.end_time;

	db.DailyReport.find({
		where: {
			record_time: {
				between: [start_time, end_time]
			}
		},
		attributes: [
			db.sequelize.fn('SUM', db.sequelize.col('inbound_throughput_1')),
			db.sequelize.fn('SUM', db.sequelize.col('inbound_throughput_2')),
			db.sequelize.fn('SUM', db.sequelize.col('inbound_throughput_3'))
		]
	}).complete(function (err, dailyReport) {
			var chartData = {
				xAxis: ['1#流量计', '2#流量计', '3#流量计', '总流量'],
				series: [
					{
						name: 'OUTBOUND',
						data: []
					}
				]
			};

			var total = 0;
			for (var entry in dailyReport.dataValues) {
				var tmpD = dailyReport.dataValues[entry];
				if (tmpD !== null) {
					chartData.series[0].data.push(tmpD);
					total += tmpD;
				}
			}

			chartData.series[0].data.push(total);

			res.contentType('json');
			res.json(chartData);
		});
}