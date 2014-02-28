/**
 * Created by bli on 14-2-28.
 */
angular.module('line-chart', [])
	.directive('lineChart', ['$http', function ($http) {
		var LineChart = {
			restrict: 'E',
			controller: function ($scope, $element) {
				$scope.reloadChart = function () {
					var reportId = $($element).attr('report-id');
					$http.get('/getReport', {
						params: {
							reportId: reportId,
							start_time: "20130501",
							end_time: "20130502"
						}
					}).success(function (data) {
							$scope.chart.xAxis[0].setCategories(data.xAxis.categories, true);
							$scope.chart.series[0].setData(data.series[0].data, true);
						});
				}
			},
			link: function ($scope, $element, $attributes) {
				var reportId = $($element).attr('report-id');

				$scope.chart = new Highcharts.Chart({
					chart: {
						renderTo: $element[0],
						type: 'line'
					},
					title: {
						text: 'Fruit Consumption'
					},
					xAxis: {
						categories: ['Apples', 'Bananas', 'Oranges'],
						labels: {
							rotation: 45
						}
					},
					yAxis: {
						title: {
							text: 'Fruit eaten'
						}
					},
					series: [
						{
							name: 'Jane',
							data: [1, 0, 4]
						}
					]

				});

				$scope.reloadChart();
			}
		}
		return LineChart;
	}]);
