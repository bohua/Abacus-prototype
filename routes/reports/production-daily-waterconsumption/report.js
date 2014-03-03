/**
 * Created by bli on 14-2-28.
 */
module.exports = function (input) {
	var start_time = input.req.query.start_time;
	var end_time = input.req.query.end_time;

	input.db.DailyReport.findAll({
		where: {
			record_time: {
				between: [start_time, end_time]
			}
		},
		order: 'record_time',
		attributes: [
			'record_time',
			'outbound_MPA',
			'outbound_total',
			'power_consumption'
		]
	}).complete(function (err, dailyReport) {
			if (err) {
				input.res.statusCode = "400";
				input.res.end({
					message: err.message,
					code: 'CHART_DATA_QUERY_FAIL'
				});
			} else {
				for (var entry in dailyReport) {
					var formattedT = dailyReport[entry].record_time.getUTCHours() + ':00';

					input.chartData.xAxis.categories.push(formattedT);
					input.chartData.series[0].data.push(dailyReport[entry].power_consumption);
				}

				//add series name e.g 2013年5月1日
				var d = dailyReport[0].record_time;
				input.chartData.series[0].name = d.getUTCFullYear() + "年" + (d.getUTCMonth() + 1) + "月" + d.getUTCDate() + "日";

				input.res.contentType('json');
				input.res.json(input.chartData);
			}
		});
};