/**
 * Created by bli on 14-2-28.
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
		order: 'record_time ASC',
		attributes: [
			'record_time',
			'outbound_MPA',
			'outbound_total',
			'power_consumption'
		]
	}).complete(function (err, hourlyReport) {
			if (err) {
				deferred.reject({
					message: err.message,
					code: 'CHART_DATA_QUERY_FAIL'
				});
			} else {
				for (var entry in hourlyReport) {
					var formattedT = hourlyReport[entry].record_time.getUTCHours() + ':00';

					input.chartData.xAxis.categories.push(formattedT);

					//KPI 单耗 = 用电量*1000/((0.02+出厂水压力)*出厂水总流量)
					var kpi = (hourlyReport[entry].power_consumption * 1000 / ((0.02 + hourlyReport[entry].outbound_MPA) * hourlyReport[entry].outbound_total)).toFixed(2);
					input.chartData.series[0].data.push(parseFloat(kpi));
				}

				//add series name e.g 2013年5月1日
				var d = new Date(start_time);
				input.chartData.series[0].name = d.getUTCFullYear() + "年" + (d.getUTCMonth() + 1) + "月" + d.getUTCDate() + "日";
				input.chartData.series[0].data_desc = input.data_desc;

				deferred.resolve(input.chartData);
			}
		});
	return deferred.promise;
};