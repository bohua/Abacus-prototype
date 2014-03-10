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

				/********************************
				 * Render Chart
				 * ******************************/
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
							//chartOption.chart.animation = false;
							chartOption.plotOptions = {series:{animation: false}};

							//Set render colors for each series
							for (var seriesNew in chartOption.series) {
								var s = chartOption.series[seriesNew];

								s.color = colorList[s.data_desc];
								s.dataLabels.enabled = $scope.toggleData;
							}

							$scope.chart = new Highcharts.Chart(chartOption);
						});
				});

				function resize() {
					$scope.chart.setSize(
						wrapper.width(),
						wrapper.height(),
						false
					);
				};

				$(window).resize(resize);


				/********************************
				 * Toggle Data Plots
				 * ******************************/
				$scope.toggleData = false;
				$($element).on('toggleData', function (event, toggle) {
					$scope.toggleData = toggle;
				});
				$scope.$watch('toggleData', function () {
					if ($scope.chart) {
						for (var seriesNew in $scope.chart.series) {
							var s = $scope.chart.series[seriesNew];
							s.options.dataLabels.enabled = $scope.toggleData;
							s.update(s.options);
						}
					}
				});

			}
		}
		return Chart;
	}]);
