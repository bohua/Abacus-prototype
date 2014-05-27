/**
 * Created by 文远 on 2014/5/27.
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
			'daily_sum_consumption_cl_avg',
			'daily_sum_consumption_alun_avg',
			'daily_sum_consumption_alkali_avg',
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
			var clArray = [];
			var alunArray = [];
			var alkaliArray = [];

			for(var i= 0,maxi=rows.length; i<maxi; i++){
				var row = rows[i].dataValues;
				var report_date = row['report_date'];
				report_date = moment(report_date).valueOf();
				var clValue = row['daily_sum_consumption_cl_avg'];
				var alunValue = row['daily_sum_consumption_alun_avg'];
				var alkaliValue = row['daily_sum_consumption_alkali_avg'];
				clArray.push([report_date, clValue]);
				alunArray.push([report_date, alunValue]);
				alkaliArray.push([report_date, alkaliValue]);
			}

			input.chartData.series[0].data = clArray;
			input.chartData.series[0].data_desc = input.data_desc;

			input.chartData.series[1].data = alunArray;
			input.chartData.series[1].data_desc = input.data_desc;

			input.chartData.series[2].data = alkaliArray;
			input.chartData.series[2].data_desc = input.data_desc;
			deferred.resolve(input.chartData);
		}
	});
	return deferred.promise;
}