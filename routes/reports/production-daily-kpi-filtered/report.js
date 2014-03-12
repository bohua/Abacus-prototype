/**
 * Created by Bli on 14-3-4.
 */
var Q = require('q');

module.exports = function (input) {
	var deferred = Q.defer();
	var start_time = input.start_time;
	var end_time = input.end_time;

	input.db.DailyReport.find({
		where: {
			report_date: {
				between: [start_time, end_time]
			}
		},
		attributes: [
			'daily_sum_water_qulity_filtered_NTU',
			'daily_sum_water_qulity_filtered_PH',
			'daily_sum_water_qulity_filtered_leftCl'
		]
	}).complete(function (err, dailyReport) {
			if (err) {
				deferred.reject({
					message: err.message,
					code: 'CHART_DATA_QUERY_FAIL'
				});
			} else {

				for (var entry in dailyReport.dataValues) {
					var tmpD = dailyReport.dataValues[entry];
					if (isNaN(tmpD)) {
						tmpD = 0;
					}

					if (tmpD !== null) {
						input.chartData.series[0].data.push(tmpD);
					}

					input.chartData.series[0].data_desc = input.data_desc;
				}
				deferred.resolve(input.chartData);
			}
		});
	return deferred.promise;
}