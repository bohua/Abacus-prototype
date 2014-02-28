/**
 * Created by bli on 14-2-28.
 */
var db = require(__dirname + '/../../models');

module.exports = function (req, res) {
	var start_time = req.query.start_time;
	var end_time = req.query.end_time;

	db.DailyReport.findAll({
		where: {
			record_time: {
				between: [start_time, end_time]
			}
		},
		attributes: [
			'outbound_MPA',
			'outbound_total',
			'power_consumption'
		]
	}).success(function (dailyReport) {
			res.contentType('json');
			res.json(dailyReport);
		});
}