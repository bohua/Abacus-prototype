/**
 * Created by Bli on 14-3-4.
 */
var Q = require('q');

module.exports = function (input) {
	var deferred = Q.defer();
	var start_time = input.start_time;
	var end_time = input.end_time;

	input.db.HourlyReport.find({
		where: {
			record_time: {
				between: [start_time, end_time]
			}
		},
		attributes: [
			input.db.sequelize.fn('AVG', input.db.sequelize.col('inbound_NTU')),
			input.db.sequelize.fn('MAX', input.db.sequelize.col('inbound_NTU')),
			input.db.sequelize.fn('MIN', input.db.sequelize.col('inbound_NTU')),
			input.db.sequelize.fn('AVG', input.db.sequelize.col('inbound_PH')),
			input.db.sequelize.fn('MAX', input.db.sequelize.col('inbound_PH')),
			input.db.sequelize.fn('MIN', input.db.sequelize.col('inbound_PH'))
		]
	}).complete(function (err, HourlyReport) {
			if (err) {
				deferred.reject({
					message: err.message,
					code: 'CHART_DATA_QUERY_FAIL'
				});
			} else {

				input.chartData.series[0].data.push(HourlyReport.selectedValues["AVG(`inbound_NTU`)"].toFixed(2));
				input.chartData.series[1].data.push(HourlyReport.selectedValues["MAX(`inbound_NTU`)"].toFixed(2));
				input.chartData.series[2].data.push(HourlyReport.selectedValues["MIN(`inbound_NTU`)"].toFixed(2));

				input.chartData.series[0].data.push(HourlyReport.selectedValues["AVG(`inbound_PH`)"].toFixed(2));
				input.chartData.series[1].data.push(HourlyReport.selectedValues["MAX(`inbound_PH`)"].toFixed(2));
				input.chartData.series[2].data.push(HourlyReport.selectedValues["MIN(`inbound_PH`)"].toFixed(2));

				input.chartData.series[0].data_desc = input.data_desc;
				input.chartData.series[1].data_desc = input.data_desc;
				input.chartData.series[2].data_desc = input.data_desc;

				deferred.resolve(input.chartData);
			}
		});
	return deferred.promise;
}