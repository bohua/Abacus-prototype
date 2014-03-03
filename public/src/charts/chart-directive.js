/**
 * Created by bli on 14-2-28.
 */
angular.module('chart', [])
	.directive('chart', ['$http', function ($http) {

		var LineChart = {
			restrict: 'E',
			link: function ($scope, $element, $attributes) {
				var reportId = $attributes.reportId;
				var chartWidth = $($element).parents('.chart-wrapper').width();
				var chartHeight = $($element).parents('.chart-wrapper').height();

				$($element).on('reloadChart', function (event, queryOption, renderOption) {
					$http.get('/getReport', {
						params: {
							reportId: reportId,
							start_time: queryOption.start_date,
							end_time: queryOption.end_date
						}
					}).success(function (chartOption) {
							if ($scope[reportId]) {
								//upadate chart if found
								$scope[reportId].xAxis[0].update(chartOption.xAxis, true);
								$scope[reportId].series[0].update(chartOption.series[0], true);

							} else {
								//Generate new chart if not found
								chartOption.chart.renderTo = $element[0];
								chartOption.chart.width = chartWidth;
								chartOption.chart.height = chartHeight;

								$scope[reportId] = new Highcharts.Chart(chartOption);
							}
						});
				});

				var wrapper = $($element).parents('.chart-wrapper');
				$(window).resize(
					function () {
						$scope[reportId].setSize(
							wrapper.width(),
							wrapper.height(),
							false
						);
					});
			}
		}
		return LineChart;
	}]);
