/**
 * Created by Bli on 14-3-4.
 */
var Q = require('q');

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
			'report_date',
			'daily_sum_inbound_total',
			'daily_sum_consumption_cl_total',
			'daily_sum_consumption_alun_total',
			'daily_sum_consumption_alkali_total'
		]
	}).complete(function (err, DailyReport) {
			if (err) {
				deferred.reject({
					message: err.message,
					code: 'CHART_DATA_QUERY_FAIL'
				});
			} else {
				function calcConsumption(medicine, water){
					if(water <=0){
						return null;
					}

					var result = parseFloat(medicine * 1000 / water);
					if(isNaN(result)){
						return '-';
					}

					return result.toFixed(2);
				}

				function getSum(field){
					var result = 0;
					for(var i in DailyReport){
						var num = parseFloat(DailyReport[i].selectedValues[field]);
						if(isNaN(num)){
							continue;
						}
						result += num;
					}

					return result;
				}

				var total_water = getSum('daily_sum_inbound_total');
				var total_cl = getSum('daily_sum_consumption_cl_total');
				var total_alun = getSum('daily_sum_consumption_alun_total');
				var total_alkali = getSum('daily_sum_consumption_alkali_total');

				var cl_consumptions = [];
				var alun_consumptions = [];
				var alkali_consumptions = [];
				for(var i in DailyReport){
					cl_consumptions.push(calcConsumption(DailyReport[i].selectedValues['daily_sum_consumption_cl_total'],
						DailyReport[i].selectedValues['daily_sum_inbound_total']));
					alun_consumptions.push(calcConsumption(DailyReport[i].selectedValues['daily_sum_consumption_alun_total'],
						DailyReport[i].selectedValues['daily_sum_inbound_total']));
					alkali_consumptions.push(calcConsumption(DailyReport[i].selectedValues['daily_sum_consumption_alkali_total'],
						DailyReport[i].selectedValues['daily_sum_inbound_total']));
				}

				input.chartData.series[0].data.push(calcConsumption(total_alun, total_water));
				input.chartData.series[1].data.push(Math.max.apply(Math, alun_consumptions));
				input.chartData.series[2].data.push(Math.min.apply(Math, alun_consumptions));

				input.chartData.series[0].data.push(calcConsumption(total_cl, total_water));
				input.chartData.series[1].data.push(Math.max.apply(Math, cl_consumptions));
				input.chartData.series[2].data.push(Math.min.apply(Math, cl_consumptions));

				input.chartData.series[0].data.push(calcConsumption(total_alkali, total_water));
				input.chartData.series[1].data.push(Math.max.apply(Math, alkali_consumptions));
				input.chartData.series[2].data.push(Math.min.apply(Math, alkali_consumptions));

				input.chartData.series[0].data_desc = input.data_desc;
				input.chartData.series[1].data_desc = input.data_desc;
				input.chartData.series[2].data_desc = input.data_desc;

				deferred.resolve(input.chartData);
			}
		});
	return deferred.promise;
}