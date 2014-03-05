/**
 * Created by Bli on 14-3-5.
 */
module.exports = function (input) {
	var start_time = input.req.query.start_time;
	var end_time = input.req.query.end_time;

	input.db.DailyReport.find({
		where: {
			report_date: {
				between: [start_time, end_time]
			}
		},
		attributes: [
			'report_date',
			'daily_sum_electron_highprofile_within_marktotal',
			'daily_sum_electron_highprofile_without_marktotal',
			'daily_sum_electron_lowprofile_within_marktotal',
			'daily_sum_electron_lowprofile_without_marktotal',
			'daily_sum_electron_lowprofile_washroom_marktotal'
		]
	}).complete(function (err, dailyReport) {
			if (err) {
				input.res.statusCode = "400";
				input.res.end({
					message: err.message,
					code: 'CHART_DATA_QUERY_FAIL'
				});
			} else {
				for (var entry in dailyReport.dataValues) {
					if(entry === 'report_date'){
						continue;
					}

					var tmpD = dailyReport.dataValues[entry];

					if (tmpD !== null) {
						input.chartData.series[0].data.push(tmpD);
					}
				}

				//add series name e.g 2013年5月1日
				var d = dailyReport.dataValues.report_date;
				input.chartData.series[0].name = d.getUTCFullYear() + "年" + (d.getUTCMonth() + 1) + "月" + d.getUTCDate() + "日";

				input.res.contentType('json');
				input.res.json(input.chartData);
			}
		});
};
