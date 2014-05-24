/**
 * Created by 文远 on 2014/5/24.
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
			'daily_sum_outbound_throughput_total',
			'daily_sum_electron_highprofile_within_marktotal',
			'daily_sum_electron_highprofile_without_marktotal',
			'daily_sum_electron_lowprofile_within_marktotal',
			'daily_sum_electron_lowprofile_without_marktotal',
			'daily_sum_electron_lowprofile_washroom_marktotal'
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
			var manufactoryConsumptionArray = [];
			var pressure = 0.36;
			var sum = 0;

			for(var i= 0,maxi=rows.length; i<maxi; i++){
				var row = rows[i].dataValues;
				var daily_sum_outbound_throughput_total = row['daily_sum_outbound_throughput_total'];
				var daily_sum_electron_total = row['daily_sum_electron_highprofile_within_marktotal']
					+ row['daily_sum_electron_highprofile_without_marktotal']
					+ row['daily_sum_electron_lowprofile_within_marktotal']
					+ row['daily_sum_electron_lowprofile_without_marktotal']
					+ row['daily_sum_electron_lowprofile_washroom_marktotal'];
				var value = daily_sum_electron_total * 1000 / daily_sum_outbound_throughput_total/ pressure;
				value = Math.round(value*100)/100;
				manufactoryConsumptionArray.push(value);
				sum += value;
			}

			var max = _.max(manufactoryConsumptionArray);
			var min = _.min(manufactoryConsumptionArray);
			var average = Math.round((sum / count)*100)/100;
			input.chartData.series[0].data = [average, max, min];
			input.chartData.series[0].data_desc = input.data_desc;
			deferred.resolve(input.chartData);

//			for (var entry in dailyReport.dataValues) {
//				var tmpD = dailyReport.dataValues[entry];
//				if (isNaN(tmpD)) {
//					tmpD = 0;
//				}
//
//				if (tmpD !== null) {
//					input.chartData.series[0].data.push(tmpD);
//				}
//
//				input.chartData.series[0].data_desc = input.data_desc;
//			}
//			deferred.resolve(input.chartData);
		}
	});
	return deferred.promise;
}