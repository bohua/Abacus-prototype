/**
 * Created by bli on 14-2-28.
 */
//module.exports.ProductionDailyWaterconsumption = require('./production-daily-waterconsumption.js');

module.exports = function (req, res) {
	var requstedReport = require('./' + req.query.reportId + '.js');

	requstedReport(req, res);
}