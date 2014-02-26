/**
 * Created by bli on 14-2-26.
 */

var util = require("./util.js");
var schema = require("../schema/user-schema.json");

module.exports = function (sequelize, DataTypes) {
	var col_option = util.generateOption(schema);

	var User = sequelize.define(
		'User',
		col_option/*,
		 {
		 classMethods: {
		 associate: function (models) {
		 Product.belongsTo(models.SalesSlave);
		 }
		 }
		 }*/);

	return User;
};
