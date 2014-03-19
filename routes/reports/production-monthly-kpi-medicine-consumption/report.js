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
			input.db.sequelize.fn('SUM', input.db.sequelize.col('daily_sum_inbound_total')),
			input.db.sequelize.fn('SUM', input.db.sequelize.col('daily_sum_consumption_cl_total')),
			input.db.sequelize.fn('SUM', input.db.sequelize.col('daily_sum_consumption_alun_total')),
			input.db.sequelize.fn('SUM', input.db.sequelize.col('daily_sum_consumption_alkali_total'))
		]
	}).complete(function (err, DailyReport) {
			if (err) {
				deferred.reject({
					message: err.message,
					code: 'CHART_DATA_QUERY_FAIL'
				});
			} else {

				console.log(DailyReport);
				var water = DailyReport.selectedValues["SUM(`daily_sum_inbound_total`)"];

				var cl = DailyReport.selectedValues["SUM(`daily_sum_consumption_cl_total`)"];
				var alun = DailyReport.selectedValues["SUM(`daily_sum_consumption_alun_total`)"];
				var alkali = DailyReport.selectedValues["SUM(`daily_sum_consumption_alkali_total`)"];

				if(water <=0){
					input.chartData.series[0].data.push('数据错误');
					input.chartData.series[0].data.push('数据错误');
					input.chartData.series[0].data.push('数据错误');
				}

				var alun_consumption = parseFloat(alun * 1000 / water).toFixed(2);
				var cl_consumption = parseFloat(cl * 1000 / water).toFixed(2);
				var alkali_consumption = parseFloat(alkali * 1000 / water).toFixed(2);

				input.chartData.series[0].data.push(alun_consumption);
				input.chartData.series[0].data.push(cl_consumption);
				input.chartData.series[0].data.push(alkali_consumption);

				input.chartData.series[0].data_desc = input.data_desc;

				deferred.resolve(input.chartData);
			}
		});
	return deferred.promise;
}