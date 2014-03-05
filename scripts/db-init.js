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
			transformHourlyReports();
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

function transformHourlyReports() {
	var path = __dirname + "/../tests/data/综/";
	var connector = require(__dirname + "/../routes/ETL-module").bleachDataConnector;
	var schema = require("../schema/hourly-report-schema.json");
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

				var data = result.json;
				var option = {};

				//Generate hourly data table
				for (var prop in data) {
					if (data[prop] === 'hourly_records') {
						//Generate hourly data table
						var hourlyData = data.hourly_records;
						for (var j = 0; j < hourlyData.length; j++) {

							var hourlyOption = {};
							for (var k = 0; k < colList.length; k++) {
								hourlyOption[colList[k]] = hourlyData[j][colList[k]]
							}

							db.HourlyReport.create(hourlyOption).success(function (sdepold) {
								console.log(sdepold.values)
							});
						}

					}else{
						//Generate daily data table
						option[prop] = data[prop];
					}
				}

				db.DailyReport.create(option).success(function (sdepold) {
					console.log(sdepold.values)
				});
			});
		}
	});
}