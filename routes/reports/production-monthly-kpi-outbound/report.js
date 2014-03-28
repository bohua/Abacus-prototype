/**
 * Created by Bli on 14-3-4.
 */
var Q = require('q');

module.exports = function (input) {
	var deferred = Q.defer();
	var start_time = input.start_time;
	var end_time = input.end_time;

	input.db.HourlyReport.findAll({
		where: {
			record_time: {
				between: [start_time, end_time]
			}
		},
		attributes: [
			'record_time',
			'outbound_NTU',
			'outbound_leftCl',
			'outbound_PH'
		]
	}).complete(function (err, HourlyReport) {
			if (err) {
				deferred.reject({
					message: err.message,
					code: 'CHART_DATA_QUERY_FAIL'
				});
			} else {
				function getMax(arr, field) {
					var max;
					for (var i in arr) {
						if (!max || arr[i].selectedValues[field] > max.selectedValues[field]) {
							max = arr[i];
						}
					}

					var d = max.selectedValues['record_time'];
					if (!d) {
						d = null;
					} else {
						d = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
					}

					return {
						time: d,
						value: max.selectedValues[field].toFixed(2)
					};
				}

				function getMin(arr, field) {
					var min;
					for (var i in arr) {
						if (!min || arr[i].selectedValues[field] < min.selectedValues[field]) {
							min = arr[i];
						}
					}

					var d = min.selectedValues['record_time'];
					if (!d) {
						d = null;
					} else {
						d = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
					}
					return {
						time: d,
						value: min.selectedValues[field].toFixed(2)
					};
				}

				function getAvg(arr, field) {
					var sum = 0;
					var elem = 0;
					for (var i in arr) {
						if (isNaN(parseFloat(arr[i].selectedValues[field]))) {
							continue;
						}

						sum += arr[i].selectedValues[field];
						++elem;
					}

					if (elem === 0 || isNaN(elem)) {
						return null;
					}

					return parseFloat(sum / elem).toFixed(2);
				}

				input.chartData.series[0].data.push(getAvg(HourlyReport, 'outbound_NTU'));
				input.chartData.series[1].data.push(getMax(HourlyReport, 'outbound_NTU'));
				input.chartData.series[2].data.push(getMin(HourlyReport, 'outbound_NTU'));

				input.chartData.series[0].data.push(getAvg(HourlyReport, 'outbound_leftCl'));
				input.chartData.series[1].data.push(getMax(HourlyReport, 'outbound_leftCl'));
				input.chartData.series[2].data.push(getMin(HourlyReport, 'outbound_leftCl'));

				input.chartData.series[0].data.push(getAvg(HourlyReport, 'outbound_PH'));
				input.chartData.series[1].data.push(getMax(HourlyReport, 'outbound_PH'));
				input.chartData.series[2].data.push(getMin(HourlyReport, 'outbound_PH'));

				input.chartData.series[0].data_desc = input.data_desc;
				input.chartData.series[1].data_desc = input.data_desc;
				input.chartData.series[2].data_desc = input.data_desc;

				deferred.resolve(input.chartData);
			}
		});
	return deferred.promise;
}