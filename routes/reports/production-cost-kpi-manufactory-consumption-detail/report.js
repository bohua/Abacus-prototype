/**
 * Created by 文远 on 2014/5/25.
 */
var Q = require('q');
var _ = require('lodash');
var moment = require('moment');

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
			'report_date',
			'daily_sum_outbound_throughput_total',
			'daily_sum_electron_highprofile_within_marktotal',
			'daily_sum_electron_highprofile_without_marktotal',
			'daily_sum_electron_lowprofile_within_marktotal',
			'daily_sum_electron_lowprofile_without_marktotal',
			'daily_sum_electron_lowprofile_washroom_marktotal'
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
			var rows = dailyReport.rows;
			var manufactoryConsumptionArray = [];
			var pressure = 0.36;

			for(var i= 0,maxi=rows.length; i<maxi; i++){
				var row = rows[i].dataValues;
				var report_date = row['report_date'];
				report_date = moment(report_date).valueOf();
				var daily_sum_outbound_throughput_total = row['daily_sum_outbound_throughput_total'];
				var daily_sum_electron_total = row['daily_sum_electron_highprofile_within_marktotal']
					+ row['daily_sum_electron_highprofile_without_marktotal']
					+ row['daily_sum_electron_lowprofile_within_marktotal']
					+ row['daily_sum_electron_lowprofile_without_marktotal']
					+ row['daily_sum_electron_lowprofile_washroom_marktotal'];
				var value = daily_sum_electron_total * 1000 / daily_sum_outbound_throughput_total/ pressure;
				value = Math.round(value*100)/100;
				manufactoryConsumptionArray.push([report_date, value]);
			}

			input.chartData.series[0].data = manufactoryConsumptionArray;
			input.chartData.series[0].data_desc = input.data_desc;
			deferred.resolve(input.chartData);
		}
	});
	return deferred.promise;
}