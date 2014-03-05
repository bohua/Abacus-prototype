/**
 * Created by Bohua on 14-2-27.
 */

var util = require("./util.js");
var schema = require("../schema/hourly-report-schema.json");

module.exports = function (sequelize, DataTypes) {
	var col_option = util.generateOption(schema);

	var HourlyReport = sequelize.define('HourlyReport',
		col_option
	);

	return HourlyReport;
};