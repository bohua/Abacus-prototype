/**
 * Created by 文远 on 2014/5/27.
 */
var Q = require('q');
var _ = require('lodash');

module.exports = function (input) {
	var deferred = Q.defer();
	var start_time = input.start_time;
	var end_time = input.end_time;
	var medicine_type = input.medicine_type;
	var show_max = input.show_max;
	var show_min = input.show_min;

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
			var seriesDataArray = [];
			var dataArray = [];

			for(var i= 0,maxi=rows.length; i<maxi; i++){
				var row = rows[i].dataValues;
				var report_date = row['report_date'];
				var value;
				report_date = moment(report_date).valueOf();

				if(medicine_type === 'cl'){
					value = row['daily_sum_consumption_cl_avg'];
				}
				else if(medicine_type === 'alun'){
					value = row['daily_sum_consumption_alun_avg'];
				}
				else{
					value = row['daily_sum_consumption_alkali_avg'];
				}

				seriesDataArray.push([report_date, value]);
				dataArray.push(value);
			}

			var max = _.max(dataArray);
			var min = _.min(dataArray);

			input.chartData.series[0].data = seriesDataArray;
			input.chartData.series[0].data_desc = input.data_desc;
			if(medicine_type === 'cl'){
				input.chartData.series[0].name = '氯单耗';
			}
			else if(medicine_type === 'alun'){
				input.chartData.series[0].name = '矾单耗';
			}
			else{
				input.chartData.series[0].name = '碱单耗';
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