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
			'daily_sum_consumption_cl_1',
			'daily_sum_consumption_cl_2',
			'daily_sum_consumption_alun_1',
			'daily_sum_consumption_alun_2',
			'daily_sum_consumption_alun_3',
			'daily_sum_consumption_alkali_1',
			'daily_sum_consumption_alkali_2',
			'daily_sum_consumption_alkali_3'
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
						{name: '1#氯瓶', y: dailyReport.daily_sum_consumption_cl_1, color:'#00B7FF'},
						{name: '2#氯瓶', y: dailyReport.daily_sum_consumption_cl_2, color:'#00B7FF'},
						{name: '1#矾', y: dailyReport.daily_sum_consumption_alun_1, color:'#179b82'},
						{name: '2#矾', y: dailyReport.daily_sum_consumption_alun_1, color:'#179b82'},
						{name: '3#矾', y: dailyReport.daily_sum_consumption_alun_1, color:'#179b82'},
						{name: '1#碱', y: dailyReport.daily_sum_consumption_alkali_1, color:'#ffa733'},
						{name: '2#碱', y: dailyReport.daily_sum_consumption_alkali_2, color:'#ffa733'},
						{name: '3#碱', y: dailyReport.daily_sum_consumption_alkali_3, color:'#ffa733'}
					);
				} else {
					input.chartData.series[0].data.push(
						{name: '对比1#氯瓶', y: dailyReport.daily_sum_consumption_cl_1, color:'#9B177B'},
						{name: '对比2#氯瓶', y: dailyReport.daily_sum_consumption_cl_2, color:'#9B177B'},
						{name: '对比1#矾', y: dailyReport.daily_sum_consumption_alun_1, color:'#C22443'},
						{name: '对比2#矾', y: dailyReport.daily_sum_consumption_alun_1, color:'#C22443'},
						{name: '对比3#矾', y: dailyReport.daily_sum_consumption_alun_1, color:'#C22443'},
						{name: '对比1#碱', y: dailyReport.daily_sum_consumption_alkali_1, color:'#FF6C33'},
						{name: '对比2#碱', y: dailyReport.daily_sum_consumption_alkali_2, color:'#FF6C33'},
						{name: '对比3#碱', y: dailyReport.daily_sum_consumption_alkali_3, color:'#FF6C33'}
					);

					input.chartData.legend.y = 0;
				}

				//add series name e.g 2013年5月1日
				var d = new Date(start_time);
				//input.chartData.series[0].name = d.getUTCFullYear() + "年" + (d.getUTCMonth() + 1) + "月" + d.getUTCDate() + "日";
				input.chartData.series[0].data_desc = input.data_desc;
				if (input.data_desc === 'current') {
					input.chartData.series[0].size = '80%';
					input.chartData.series[0].innerSize = '50%';
				} else {

					//Set size of compare data
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
