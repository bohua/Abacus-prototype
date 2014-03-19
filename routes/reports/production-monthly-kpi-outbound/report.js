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
			input.db.sequelize.fn('AVG', input.db.sequelize.col('outbound_leftCl')),
			input.db.sequelize.fn('AVG', input.db.sequelize.col('outbound_PH'))
		]
	}).complete(function (err, HourlyReport) {
			if (err) {
				deferred.reject({
					message: err.message,
					code: 'CHART_DATA_QUERY_FAIL'
				});
			} else {

				for (var entry in HourlyReport.dataValues) {
					var tmpD = HourlyReport.dataValues[entry];
					if (isNaN(tmpD)) {
						tmpD = 0;
					}

					if (tmpD !== null) {
						input.chartData.series[0].data.push(parseFloat(tmpD).toFixed(2));
					}

					input.chartData.series[0].data_desc = input.data_desc;
				}
				deferred.resolve(input.chartData);
			}
		});
	return deferred.promise;
}