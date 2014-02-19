/**
 * Created by Bli on 14-2-19.
 */

var util = require("./util.js");
var schema = require("../schema/customer-schema.json");

module.exports = function (sequelize, DataTypes) {
	var col_option = util.generateOption(schema);

	var Customer = sequelize.define(
		'Customer',
		col_option/*,
		 {
		 classMethods: {
		 associate: function (models) {
		 Product.belongsTo(models.SalesSlave);
		 }
		 }
		 }*/);

	return Customer;
};