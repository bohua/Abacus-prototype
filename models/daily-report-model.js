/**
 * Created by Bohua on 14-2-27.
 */

var util = require("./util.js");
var schema = require("../schema/daily-report-schema.json");

module.exports = function (sequelize, DataTypes) {
	var col_option = util.generateOption(schema);

	var DailyReport = sequelize.define(
		'DailyReport',
		col_option/*,
		 {
		 classMethods: {
		 associate: function (models) {
		 Product.belongsTo(models.SalesSlave);
		 }
		 }
		 }*/);

	return DailyReport;
};