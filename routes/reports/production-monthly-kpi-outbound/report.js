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
			input.db.sequelize.fn('AVG', input.db.sequelize.col('outbound_NTU')),
			input.db.sequelize.fn('MAX', input.db.sequelize.col('outbound_NTU')),
			input.db.sequelize.fn('MIN', input.db.sequelize.col('outbound_NTU')),
			input.db.sequelize.fn('AVG', input.db.sequelize.col('outbound_leftCl')),
			input.db.sequelize.fn('MAX', input.db.sequelize.col('outbound_leftCl')),
			input.db.sequelize.fn('MIN', input.db.sequelize.col('outbound_leftCl')),
			input.db.sequelize.fn('AVG', input.db.sequelize.col('outbound_PH')),
			input.db.sequelize.fn('MAX', input.db.sequelize.col('outbound_PH')),
			input.db.sequelize.fn('MIN', input.db.sequelize.col('outbound_PH'))
		]
	}).complete(function (err, HourlyReport) {
			if (err) {
				deferred.reject({
					message: err.message,
					code: 'CHART_DATA_QUERY_FAIL'
				});
			} else {
				var avg_outbound_ntu = HourlyReport.selectedValues["AVG(`outbound_NTU`)"]; if(avg_outbound_ntu){avg_outbound_ntu = avg_outbound_ntu.toFixed(2);}
				var max_outbound_ntu = HourlyReport.selectedValues["MAX(`outbound_NTU`)"]; if(max_outbound_ntu){max_outbound_ntu = max_outbound_ntu.toFixed(2);}
				var min_outbound_ntu = HourlyReport.selectedValues["MIN(`outbound_NTU`)"]; if(min_outbound_ntu){min_outbound_ntu = min_outbound_ntu.toFixed(2);}

				var avg_outbound_leftcl = HourlyReport.selectedValues["AVG(`outbound_leftCl`)"]; if(avg_outbound_leftcl){avg_outbound_leftcl = avg_outbound_leftcl.toFixed(2);}
				var max_outbound_leftcl = HourlyReport.selectedValues["MAX(`outbound_leftCl`)"]; if(max_outbound_leftcl){max_outbound_leftcl = max_outbound_leftcl.toFixed(2);}
				var min_outbound_leftcl = HourlyReport.selectedValues["MIN(`outbound_leftCl`)"]; if(min_outbound_leftcl){min_outbound_leftcl = min_outbound_leftcl.toFixed(2);}

				var avg_outbound_ph = HourlyReport.selectedValues["AVG(`outbound_PH`)"]; if(avg_outbound_ph){avg_outbound_ph = avg_outbound_ph.toFixed(2);}
				var max_outbound_ph = HourlyReport.selectedValues["MAX(`outbound_PH`)"]; if(max_outbound_ph){max_outbound_ph = max_outbound_ph.toFixed(2);}
				var min_outbound_ph = HourlyReport.selectedValues["MIN(`outbound_PH`)"]; if(min_outbound_ph){min_outbound_ph = min_outbound_ph.toFixed(2);}

				input.chartData.series[0].data.push(avg_outbound_ntu);
				input.chartData.series[1].data.push(max_outbound_ntu);
				input.chartData.series[2].data.push(min_outbound_ntu);

				input.chartData.series[0].data.push(avg_outbound_leftcl);
				input.chartData.series[1].data.push(max_outbound_leftcl);
				input.chartData.series[2].data.push(min_outbound_leftcl);

				input.chartData.series[0].data.push(avg_outbound_ph);
				input.chartData.series[1].data.push(max_outbound_ph);
				input.chartData.series[2].data.push(min_outbound_ph);

				input.chartData.series[0].data_desc = input.data_desc;
				input.chartData.series[1].data_desc = input.data_desc;
				input.chartData.series[2].data_desc = input.data_desc;

				deferred.resolve(input.chartData);
			}
		});
	return deferred.promise;
}