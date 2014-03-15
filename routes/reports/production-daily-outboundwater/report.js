/**
 * Created by Bohua on 14-3-1.
 */
var Q = require('q');

module.exports = function (input) {
	var deferred = Q.defer();
	var start_time = input.start_time;
	var end_time = input.end_time;

	input.db.HourlyReport.find({
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
	}).complete(function (err, hourlyReport) {
			if (err) {
				deferred.reject({
					message: err.message,
					code: 'CHART_DATA_QUERY_FAIL'
				});
			} else {
				for (var entry in hourlyReport.dataValues) {
					if(entry === 'record_time'){
						continue;
					}

					var tmpD = hourlyReport.dataValues[entry];

					if (tmpD !== null) {
						input.chartData.series[0].data.push(tmpD);
					}
				}

				//add series name e.g 2013年5月1日
				var d = new Date(start_time);
				input.chartData.series[0].name = d.getUTCFullYear() + "年" + (d.getUTCMonth() + 1) + "月" + d.getUTCDate() + "日";
				input.chartData.series[0].data_desc = input.data_desc;

				deferred.resolve(input.chartData);
			}
		});
	return deferred.promise;
};