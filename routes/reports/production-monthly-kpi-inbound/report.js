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
				var avg_inbound_ntu = HourlyReport.selectedValues["AVG(`inbound_NTU`)"]; if(avg_inbound_ntu){avg_inbound_ntu = avg_inbound_ntu.toFixed(2)}
				var max_inbound_ntu = HourlyReport.selectedValues["MAX(`inbound_NTU`)"]; if(max_inbound_ntu){max_inbound_ntu = max_inbound_ntu.toFixed(2)}
				var min_inbound_ntu = HourlyReport.selectedValues["MIN(`inbound_NTU`)"]; if(min_inbound_ntu){min_inbound_ntu = min_inbound_ntu.toFixed(2)}

				var avg_inbound_ph = HourlyReport.selectedValues["AVG(`inbound_PH`)"]; if(avg_inbound_ph){avg_inbound_ph = avg_inbound_ph.toFixed(2)}
				var max_inbound_ph = HourlyReport.selectedValues["MAX(`inbound_PH`)"]; if(max_inbound_ph){max_inbound_ph = max_inbound_ph.toFixed(2)}
				var min_inbound_ph = HourlyReport.selectedValues["MIN(`inbound_PH`)"]; if(min_inbound_ph){min_inbound_ph = min_inbound_ph.toFixed(2)}

				input.chartData.series[0].data.push(avg_inbound_ntu);
				input.chartData.series[1].data.push(max_inbound_ntu);
				input.chartData.series[2].data.push(min_inbound_ntu);

				input.chartData.series[0].data.push(avg_inbound_ph);
				input.chartData.series[1].data.push(max_inbound_ph);
				input.chartData.series[2].data.push(min_inbound_ph);

				input.chartData.series[0].data_desc = input.data_desc;
				input.chartData.series[1].data_desc = input.data_desc;
				input.chartData.series[2].data_desc = input.data_desc;

				deferred.resolve(input.chartData);
			}
		});
	return deferred.promise;
}