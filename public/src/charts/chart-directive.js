/**
 * Created by bli on 14-2-28.
 */
angular.module('chart', [])
	.directive('chart', ['$http', function ($http) {

		var Chart = {
			restrict: 'E',
			scope: {},
			link: function ($scope, $element, $attributes) {
				var wrapper = $($element).parents('.chart-wrapper');
				var chartWidth = wrapper.width();
				var chartHeight = wrapper.height();

				$($element).on('reloadChart', function (event, queryOption, renderOption) {
					function getQueryString(queryOption){
						var result;

						if($.isArray(queryOption)){
							result = JSON.stringify(queryOption);
						}else{
							result = JSON.stringify([queryOption]);
						}

						return result;
					}

					$http.get('/getReport', {
						params: {
							reportId: $attributes.reportId,
							series: getQueryString()
						}
					}).success(function (chartOption) {
							if ($scope.chart) {
								//upadate chart if found
								$scope.chart.xAxis[0].update(chartOption.xAxis, true);
								$scope.chart.series[0].update(chartOption.series[0], true);

							} else {
								//Generate new chart if not found
								chartOption.chart.renderTo = $element[0];
								chartOption.chart.width = chartWidth;
								chartOption.chart.height = chartHeight;

								$scope.chart = new Highcharts.Chart(chartOption);
							}
						});
				});

				$(window).resize(
					function () {
						$scope.chart.setSize(
							wrapper.width(),
							wrapper.height(),
							false
						);
					});
			}
		}
		return Chart;
	}]);
