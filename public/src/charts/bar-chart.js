/**
 * Created by bli on 14-2-28.
 */
angular.module('bar-chart', [])
	.directive('barChart', function(){
		var BarChart = {
			restrict: 'E',
			link: function ($scope, $element, $attributes) {
				$($element).highcharts({
					chart: {
						type: 'bar'
					},
					title: {
						text: 'Fruit Consumption'
					},
					xAxis: {
						categories: ['Apples', 'Bananas', 'Oranges']
					},
					yAxis: {
						title: {
							text: 'Fruit eaten'
						}
					},
					series: [{
						name: 'Jane',
						data: [1, 0, 4]
					}, {
						name: 'John',
						data: [5, 7, 3]
					}]
				});
			}
		}


		return BarChart;
	});