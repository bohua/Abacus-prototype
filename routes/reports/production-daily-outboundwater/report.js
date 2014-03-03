/**
 * Created by Bohua on 14-3-1.
 */
module.exports = function (input) {
	var start_time = input.req.query.start_time;
	var end_time = input.req.query.end_time;

	input.db.DailyReport.find({
		where: {
			record_time: {
				between: [start_time, end_time]
			}
		},
		attributes: [
			'record_time',
			input.db.sequelize.fn('SUM', input.db.sequelize.col('outbound_throughput_1')),
			input.db.sequelize.fn('SUM', input.db.sequelize.col('outbound_throughput_2')),
			input.db.sequelize.fn('SUM', input.db.sequelize.col('outbound_throughput_oldtownregion')),
			input.db.sequelize.fn('SUM', input.db.sequelize.col('outbound_throughput_southregion')),
			input.db.sequelize.fn('SUM', input.db.sequelize.col('outbound_total'))
		]
	}).complete(function (err, dailyReport) {
			if (err) {
				input.res.statusCode = "400";
				input.res.end({
					message: err.message,
					code: 'CHART_DATA_QUERY_FAIL'
				});
			} else {
				for (var entry in dailyReport.dataValues) {
					if(entry === 'record_time'){
						continue;
					}

					var tmpD = dailyReport.dataValues[entry];

					if (tmpD !== null) {
						input.chartData.series[0].data.push(tmpD);
					}
				}

				//add series name e.g 2013年5月1日
				var d = dailyReport.dataValues.record_time;
				input.chartData.series[0].name = d.getUTCFullYear() + "年" + (d.getUTCMonth() + 1) + "月" + d.getUTCDate() + "日";

				input.res.contentType('json');
				input.res.json(input.chartData);
			}
		});
};