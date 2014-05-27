/**
 * Created by 文远 on 2014/5/26.
 */
var Q = require('q');
var _ = require('lodash');

module.exports = function (input) {
	var deferred = Q.defer();
	var start_time = input.start_time;
	var end_time = input.end_time;

	input.db.DailyReport.findAndCountAll({
		where: {
			report_date: {
				between: [start_time, end_time]
			}
		},
		attributes: [
			'daily_sum_outbound_throughput_total'
		]
	}).complete(function (err, dailyReport) {
		if (err) {
			deferred.reject({
				message: err.message,
				code: 'CHART_DATA_QUERY_FAIL'
			});
		} else {
			var count = dailyReport.count;
			var rows = dailyReport.rows;
			var dailyOutboundThroughputArray = [];
			var sum = 0;

			for(var i= 0,maxi=rows.length; i<maxi; i++){
				var row = rows[i].dataValues;
				var daily_sum_outbound_throughput_total = row['daily_sum_outbound_throughput_total'];
				dailyOutboundThroughputArray.push(daily_sum_outbound_throughput_total);
				sum += daily_sum_outbound_throughput_total;
			}

			var max = _.max(dailyOutboundThroughputArray);
			var min = _.min(dailyOutboundThroughputArray);
			var average = Math.round((sum / count)*100)/100;
			input.chartData.series[0].data = [average, max, min];
			input.chartData.series[0].data_desc = input.data_desc;
			deferred.resolve(input.chartData);
		}
	});
	return deferred.promise;
}