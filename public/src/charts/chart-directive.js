/**
 * Created by bli on 14-2-28.
 */
angular.module('chart', [])
	.directive('chart', ['$http', function ($http) {

		var colorList = {
			current: '#4572A7',
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

		function getSeriesByName(scope, name) {
			for (var serie in scope.chart.series) {
				if (scope.chart.series[serie].data_desc === name) {
					return scope.chart.series[serie];
				}
			}
			return null;
		}


		function updateSeries(seriesOption){

		}

		var Chart = {
			restrict: 'E',
			scope: {},
			link: function ($scope, $element, $attributes) {
				var wrapper = $($element).parents('.chart-wrapper');
				var chartWidth = wrapper.width();
				var chartHeight = wrapper.height();

				$($element).on('reloadChart', function (event, queryOption, renderOption) {
					var compareMode = $('#filterPanel .btn-compare').hasClass('toggled');



					$http.get('/getReport', {
						params: {
							reportId: $attributes.reportId,
							series: getQueryString(queryOption)
						}
					}).success(function (chartOption) {
							if ($scope.chart) {
								//update chart if found
								$scope.chart.destroy();

								/*
								//update the x Axis
								$scope.chart.xAxis[0].update(chartOption.xAxis, true);



								//add or update new series
								for (var seriesNew in chartOption.series) {
									var s = getSeriesByName($scope, chartOption.series[seriesNew].data_desc);

									if(s){
										s.update(chartOption.series[seriesNew]);
									}else{
										chartOption.series[seriesNew].color = colorList[chartOption.series[seriesNew].data_desc];
										$scope.chart.addSeries(chartOption.series[seriesNew]);
									}
								}

								/*
								if(!compareMode){
									//update all compare series
									var s = getSeriesByName($scope, 'compare');
									if(s){
										s.remove(true);
									}
								}
								*/

							} //else {
								//Generate new chart if not found
								chartOption.chart.renderTo = $element[0];
								chartOption.chart.width = chartWidth;
								chartOption.chart.height = chartHeight;

								$scope.chart = new Highcharts.Chart(chartOption);
							//}
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
