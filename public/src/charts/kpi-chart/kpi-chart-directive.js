/**
 * Created by Bli on 14-3-4.
 */
angular.module('chart')
	.controller('kpiChartController', ['$scope', function($scope){
		$scope.chart = {};
		$scope.chart.label = '出厂水质';
		$scope.chart.kpi = '99%';
	}])
	.directive('kpiChart', ['$http', function ($http) {
		var KpiChart = {
			restrict: 'E',
			templateUrl: '/src/charts/kpi-chart/kpi-chart-directive.tpl.html',
			link: function ($scope, $element, $attributes) {
				var wrapper = $($element).parents('.chart-wrapper');
				var chartWidth = wrapper.width();
				var chartHeight = wrapper.height();

				function getTextSize(space, text) {
					var chartWidth = space.width();
					var chartHeight = space.height();

					var sizeHorizental = Math.round(chartWidth / text.length * 1.3);
					var sizeVertical = Math.round(chartHeight - 5);

					return sizeHorizental < sizeVertical ? sizeHorizental : sizeVertical;
				}

				$($element).on('reloadChart', function (event, queryOption, renderOption) {
					alert('reloadKPI');
					$http.get('/getReport', {
						params: {
							reportId: $attributes.reportId,
							start_time: queryOption.start_date,
							end_time: queryOption.end_date
						}
					}).success(function (chartOption) {
							$scope.chart.label = chartOption.xAxis.categories[0];
							$scope.chart.kpi = chartOption.series[0].data[0];

							if (!$scope.chart) {
								//upadate chart if found
								$scope.chart = {};

							} else {
								//Generate new chart if not found


								$($element).find('t').css('font-size', getTextSize(wrapper, $scope.chart.label + ' : ' + $scope.chart.kpi) + 'px');
							}


						});

				});

				$(window).resize(
					function () {
						$($element).find('t').css('font-size', getTextSize(wrapper, $scope.chart.label + ' : ' + $scope.chart.kpi) + 'px');
					});
			}
		};

		return KpiChart;
	}]);
