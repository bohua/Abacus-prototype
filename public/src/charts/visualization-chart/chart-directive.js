/**
 * Created by bli on 14-2-28.
 */
angular.module('chart', ['ngSanitize'])
	.directive('chart', ['$http', function ($http) {

		var colorList = (function () {

			//current: '#4572A7',
			//compare: '#AA4643'

			return {
				current: ['#179b82', '#ffa733', '#00B7FF'],
				compare: ['#C22443', '#FF6C33', '#9B177B'],
				current_flag: 0,
				compare_flag: 0,

				getColorByDesc: function (desc) {
					var colors = this[desc];
					if (this[desc + '_flag'] === null || !colors) {
						return '000000';
					}

					if (this[desc + '_flag'] >= colors.length){
						this[desc + '_flag'] = 0;
					}

					return colors[this[desc + '_flag']++];
				},

				resetFlagByDesc: function(desc){
					if(this[desc + '_flag']){
						this[desc + '_flag'] = 0;
					}
				},

				resetFlags : function(){
					this.current_flag = 0;
					this.compare_flag= 0;
				}
			};
		})();

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
			scope: {
				toggleData: '='
			},
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
							var plotOption = {
								series: {
									animation: false
								}
							}
							if (!chartOption.plotOptions) {
								chartOption.plotOptions = {};
							}
							$.extend(true, chartOption.plotOptions, plotOption);

							//Set render colors for each series
							colorList.resetFlags();
							for (var seriesNew in chartOption.series) {
								var s = chartOption.series[seriesNew];

								s.color = colorList.getColorByDesc(s.data_desc);
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
				/*
				 $scope.toggleData = false;
				 $($element).on('toggleData', function (event, toggle) {
				 $scope.toggleData = toggle;
				 });
				 */
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
