/**
 * Created by Bli on 14-2-19.
 */

var Sequelize = require('sequelize');

exports.generateOption = function(schema){
	var option = {};
	var col;
	var dataType;

	for (var i=0; i < schema.columns.length; i++){
		col = schema.columns[i];

		//If is decimal
		if(col.decimal_digit){
			dataType = Sequelize[col.data_type](col.decimal_digit[0], col.decimal_digit[1]);
		}
		else{
			dataType = Sequelize[col.data_type];
		}

		option[col.col_name] = dataType;
	}

	return option;
};
