/**
 * Created by Bli on 14-3-4.
 */
angular.module('chart')
	.directive('kpiChart', ['$http', '$timeout', function ($http, $timeout) {

		function getQueryString(queryOption) {
			var result;

			if ($.isArray(queryOption)) {
				result = JSON.stringify(queryOption);
			} else {
				result = JSON.stringify([queryOption]);
			}
			return result;
		}

		function getSeriesByDesc(series, desc){
			var result = [];
			for(var i in series){
				if(series[i].data_desc === desc){
					result.push(series[i]);
				}
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

				$scope.title = ' ';
				$scope.kpis = [{
					label: '读取中...',
					value: '...'
				}];

				function reloadChart(event, queryOption, renderOption) {
					$http.get('/getReport', {
						params: {
							reportId: $attributes.reportId,
							series: getQueryString(queryOption)
						}
					}).success(function (chartOption) {
							var series = getSeriesByDesc(chartOption.series, 'current');
							var compares = getSeriesByDesc(chartOption.series, 'compare');

							var kpis = [];
							for(var x in chartOption.xAxis.categories){
								var kpi = {
									label : chartOption.xAxis.categories[x],
									data : []
								};

								for(var i in series){
									var value = series[i];

									if(value.colorful && value.colorful.enabled === false){
										kpi.colorful = false;
									}else{
										kpi.colorful = true;
									}

									if(value.data && value.data[x]){
										var entry = {
											value: value.data[x]
										}
										kpi.data.push(entry);
									}else{
										kpi.data.push({
											value: '-'
										});
									}
								}

								for(var j in compares){
									var compare = compares[j];
									if(compare.data && compare.data[x] && kpi.data[j]){
										kpi.data[j].compare = compare.data[x];
									}
								}

								/*
								if(value.dataLabels && value.dataLabels.unit){
									kpi.unit = value.dataLabels.unit;
								}
								*/

								kpis.push(kpi);
							}

							for(var k in series){
								//Add sub tiles
								if(series[k].name){
									chartOption.title.push({text: series[k].name});
								}
							}

							$scope.titles = chartOption.title;
							$scope.kpis = kpis;
						});
				}

				$($element).on('reloadChart', reloadChart);

				$scope.getStyle = function(kpi){
					if(!kpi.colorful){
						return 'good-value';
					}
					var value = parseInt(kpi.value);
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
