/**
 * Created by 文远 on 2014/5/26.
 */
var Q = require('q');
var _ = require('lodash');

module.exports = function (input) {
	var deferred = Q.defer();
	var start_time = input.start_time;
	var end_time = input.end_time;
	var show_max = input.show_max;
	var show_min = input.show_min;
	var throughput_type = input.throughput_type;

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
			var dataArray = [];
			var seriesValueArray = [];

			for(var i= 0,maxi=rows.length; i<maxi; i++){
				var row = rows[i].dataValues;
				var report_date = row['report_date'];
				var value;
				report_date = moment(report_date).valueOf();
				if(throughput_type === 'inbound'){
					value = row['daily_sum_inbound_total'];
				}
				else{
					value = row['daily_sum_outbound_throughput_total'];
				}

				seriesValueArray.push([report_date, value]);
				dataArray.push(value);
			}

			var max = _.max(dataArray);
			var min = _.min(dataArray);

			input.chartData.series[0].data = seriesValueArray;
			input.chartData.series[0].data_desc = input.data_desc;
			if(throughput_type === 'inbound'){
				input.chartData.series[0].name = "进水量";
			}
			else{
				input.chartData.series[0].name = "出水量";
			}

			if(show_max === true){
				input.chartData.yAxis.plotLines[0].value = max;
			}

			if(show_min === true){
				input.chartData.yAxis.plotLines[1].value = min;
			}

			deferred.resolve(input.chartData);
		}
	});
	return deferred.promise;
}