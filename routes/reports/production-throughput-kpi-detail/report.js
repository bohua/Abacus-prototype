/**
 * Created by 文远 on 2014/5/26.
 */
var Q = require('q');
var _ = require('lodash');

module.exports = function (input) {
	var deferred = Q.defer();
	var start_time = input.start_time;
	var end_time = input.end_time;

	input.db.DailyReport.findAll({
		where: {
			report_date: {
				between: [start_time, end_time]
			}
		},
		attributes: [
			'daily_sum_inbound_total',
			'daily_sum_outbound_throughput_total',
			'report_date'
		],
		order: [
			['report_date', 'ASC']
		]
	}).complete(function (err, dailyReport) {
		if (err) {
			deferred.reject({
				message: err.message,
				code: 'CHART_DATA_QUERY_FAIL'
			});
		} else {
			var rows = dailyReport;
			var dailyInboundThroughputArray = [];
			var dailyOutbountThroughputArray = [];
			var sum = 0;

			for(var i= 0,maxi=rows.length; i<maxi; i++){
				var row = rows[i].dataValues;
				var report_date = row['report_date'];
				report_date = moment(report_date).valueOf();
				var daily_sum_inbound_throughput_total = row['daily_sum_inbound_total'];
				var daily_sum_outbound_throughput_total = row['daily_sum_outbound_throughput_total'];
				dailyInboundThroughputArray.push([report_date, daily_sum_inbound_throughput_total]);
				dailyOutbountThroughputArray.push([report_date, daily_sum_outbound_throughput_total]);
			}

			input.chartData.series[0].data = dailyInboundThroughputArray;
			input.chartData.series[0].data_desc = input.data_desc;

			input.chartData.series[1].data = dailyOutbountThroughputArray;
			input.chartData.series[1].data_desc = input.data_desc;
			deferred.resolve(input.chartData);
		}
	});
	return deferred.promise;
}