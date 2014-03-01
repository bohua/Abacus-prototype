/**
 * Created by bli on 14-2-28.
 */
angular.module('line-chart', [])
	.directive('lineChart', ['$http', function ($http) {
		var LineChart = {
			restrict: 'E',
			link: function ($scope, $element, $attributes) {
				var reportId = $($element).attr('report-id');

				$scope[reportId] = new Highcharts.Chart({
					chart: {
						renderTo: $element[0],
						type: 'line'
					},
					title: {
						text: '加载数据中...'
					},
					series: [
						{
							name: '',
							data: []
						}
					]

				});

				$($element).on('reloadChart', function (event, queryOption) {
					$http.get('/getReport', {
						params: {
							reportId: reportId,
							start_time: queryOption.start_date,
							end_time: queryOption.end_date
						}
					}).success(function (data) {
							$scope[reportId].setTitle(data.title);
							$scope[reportId].xAxis[0].setCategories(data.xAxis, true);
							$scope[reportId].series[0].setData(data.series[0].data, true);
						});
				});
			}
		}
		return LineChart;
	}]);
