/**
 * Created by bli on 14-2-26.
 */
var db = require('../models');
var fs = require('fs');

db
	.sequelize
	.sync({ force: true })
	.complete(function (err) {
		if (err) {
			throw err;
		} else {
			generateUser();
			transformDailyReports();
		}
	});


function generateUser() {
	db.User.create({
		user_name: 'admin',
		user_pass: 'admin'
	}).success(function (sdepold) {
			console.log(sdepold.values)
		});
}

function getColumns(schema) {
	var cols = [];
	for (var i = 0; i < schema.columns.length; i++) {
		cols.push(schema.columns[i].col_name);
	}

	return cols;
}

function transformDailyReports() {
	var path = __dirname + "/../tests/data/综/";
	var connector = require(__dirname + "/../routes/ETL-module/bleach-data-connector.js");
	var schema = require("../schema/daily-report-schema.json");
	var colList = getColumns(schema);

	fs.readdir(path, function (err, files) {
		if (err) {
			console.log("error:" + err);
			return;
		}

		for (var i = 0; i < files.length; i++) {
			connector(__dirname + "/../tests/data/综/" + files[i], function (result) {
				if (!result.success) {
					console.log("error:" + result.reason);
					return;
				}

				var data = result.json.hourly_records;
				for (var j = 0; j < data.length; j++) {

					var option = {};
					for (var k = 0; k < colList.length; k++) {
						option[colList[k]] = data[j][colList[k]]
					}

					db.DailyReport.create(option).success(function (sdepold) {
						console.log(sdepold.values)
					});
				}
			});
		}
	});
}