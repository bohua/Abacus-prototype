/**
 * Created by Bli on 14-3-5.
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
			'report_date',
			'daily_sum_consumption_cl_total',
			'daily_sum_consumption_alun_total',
			'daily_sum_consumption_alkali_total'
		]
	}).complete(function (err, dailyReport) {
			if (err) {
				deferred.reject({
					message: err.message,
					code: 'CHART_DATA_QUERY_FAIL'
				});
			} else {
				if (input.data_desc === 'current') {
					input.chartData.series[0].data.push(
						['耗氯', dailyReport.daily_sum_consumption_cl_total],
						['耗矾', dailyReport.daily_sum_consumption_alun_total],
						['耗碱', dailyReport.daily_sum_consumption_alkali_total]
					);
				}else{
					input.chartData.series[0].data.push(
						['对比耗氯', dailyReport.daily_sum_consumption_cl_total],
						['对比耗矾', dailyReport.daily_sum_consumption_alun_total],
						['对比耗碱', dailyReport.daily_sum_consumption_alkali_total]
					);
				}

				//add series name e.g 2013年5月1日
				var d = dailyReport.report_date;
				//input.chartData.series[0].name = d.getUTCFullYear() + "年" + (d.getUTCMonth() + 1) + "月" + d.getUTCDate() + "日";
				input.chartData.series[0].data_desc = input.data_desc;
				if (input.data_desc === 'current') {
					input.chartData.series[0].size = '80%';
					input.chartData.series[0].innerSize = '50%';
				} else {
					input.chartData.series[0].size = '50%';
					input.chartData.series[0].dataLabels.formatter = function () {
						return this.point.y;
					};
				}

				deferred.resolve(input.chartData);
			}
		});

	return deferred.promise;
};
