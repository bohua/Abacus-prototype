/**
 * Created by Bli on 14-3-4.
 */
angular.module('chart')
	.directive('kpiChart', ['$http', function ($http) {

		function getQueryString(queryOption) {
			var result;

			if ($.isArray(queryOption)) {
				result = JSON.stringify(queryOption);
			} else {
				result = JSON.stringify([queryOption]);
			}
			return result;
		}

		var KpiChart = {
			restrict: 'E',
			scope: {},
			templateUrl: '/src/charts/kpi-chart/kpi-chart-directive.tpl.html',
			link: function ($scope, $element, $attributes) {
				var wrapper = $($element).parents('.chart-wrapper');
				var chartWidth = wrapper.width();
				var chartHeight = wrapper.height();

				$scope.chart = {};
				$scope.chart.label = ' ';
				$scope.chart.kpi = '0';

				function reloadChart(event, queryOption, renderOption) {
					$http.get('/getReport', {
						params: {
							reportId: $attributes.reportId,
							series: getQueryString(queryOption)
						}
					}).success(function (chartOption) {
							$scope.chart.label = chartOption.xAxis.categories[0];
							$scope.chart.kpi = chartOption.series[0].data[0];
						});
				}

				$($element).on('reloadChart', reloadChart);

				$scope.getStyle = function(){
					var value = parseInt($scope.chart.kpi);
					if(value == NaN){
						return 'none';
					}

					if(value >= 90){
						return 'good-value';
					}

					if(value <= 60){
						return 'bad-value';
					}
					return 'warning-value';
				}
			}
		};

		return KpiChart;
	}]);
