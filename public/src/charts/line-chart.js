/**
 * Created by bli on 14-2-28.
 */
angular.module('line-chart', [])
	.directive('lineChart', ['$http', function ($http) {

		var LineChart = {
			restrict: 'E',
			link: function ($scope, $element, $attributes) {
				var reportId = $($element).attr('report-id');
				var chartWidth = $($element).parents('.chart-wrapper').width();

				$($element).on('reloadChart', function (event, queryOption) {
					$http.get('/getReport', {
						params: {
							reportId: reportId,
							start_time: queryOption.start_date,
							end_time: queryOption.end_date
						}
					}).success(function (data) {
							if ($scope[reportId]) {
								//upadate chart if found
								$scope[reportId].xAxis[0].update(data.xAxis[0], true);
								$scope[reportId].series[0].update(data.series[0], true);

							} else {
								//Generate new chart if not found
								var optionObj = {
									chart:{
										renderTo: $element[0],
											width: chartWidth,
											type: 'line'
									},
									credits: {
										enabled: false
									}
								}

								$.extend(true, optionObj, data);

								$scope[reportId] = new Highcharts.Chart(optionObj);

							}
						});
				});

				var wrapper = $($element).parents('.chart-wrapper');
				$(window).resize(
					function() {
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
