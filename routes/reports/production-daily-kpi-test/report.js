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
			'daily_sum_water_qulity_sediment_NTU_1'
		]
	}).complete(function (err, dailyReport) {
			if (err) {
				deferred.reject({
					message: err.message,
					code: 'CHART_DATA_QUERY_FAIL'
				});
			} else {
				var kpi = dailyReport.daily_sum_water_qulity_sediment_NTU_1;
				if(isNaN(kpi)){
					kpi = 0;
				}

				input.chartData.series[0].data.push(kpi + '%');

				deferred.resolve(input.chartData);
			}
		});
	return deferred.promise;
}