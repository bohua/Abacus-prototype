/**
 * Created by Bli on 14-3-4.
 */
module.exports = function (input) {
	input.chartData = {
		xAxis: {
			categories: ['出厂水质']
		},
		series: [
			{
				data: ['100%']
			}
		]
	}

	input.res.contentType('json');
	input.res.json(input.chartData);
}