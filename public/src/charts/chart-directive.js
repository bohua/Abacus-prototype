/**
 * Created by bli on 14-2-28.
 */
angular.module('chart', [])
	.directive('chart', ['$http', function ($http) {

		var colorList = {
			//current: '#4572A7',
			current: '#179b82',
			compare: '#AA4643'
		};

		function getQueryString(queryOption) {
			var result;

			if ($.isArray(queryOption)) {
				result = JSON.stringify(queryOption);
			} else {
				result = JSON.stringify([queryOption]);
			}
			return result;
		}

		var Chart = {
			restrict: 'E',
			scope: {},
			link: function ($scope, $element, $attributes) {
				var wrapper = $($element).parents('.chart-wrapper');
				var chartWidth = wrapper.width();
				var chartHeight = wrapper.height();

				$($element).on('reloadChart', function (event, queryOption, renderOption) {
					$http.get('/getReport', {
						params: {
							reportId: $attributes.reportId,
							series: getQueryString(queryOption)
						}
					}).success(function (chartOption) {
							if ($scope.chart) {
								//destroy chart if found
								$scope.chart.destroy();
							}
							//Generate new chart
							chartOption.chart.renderTo = $element[0];
							chartOption.chart.width = chartWidth;
							chartOption.chart.height = chartHeight;

							//Set render colors for each series
							for (var seriesNew in chartOption.series) {
								chartOption.series[seriesNew].color = colorList[chartOption.series[seriesNew].data_desc];
							}

							$scope.chart = new Highcharts.Chart(chartOption);
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
