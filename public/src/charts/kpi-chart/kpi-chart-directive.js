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

		function getSeriesByDesc(series, desc){
			for(var i in series){
				if(series[i].data_desc === desc){
					return series[i];
				}
			}

			return null;
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
							var kpis = [];
							for(var x in chartOption.xAxis.categories){
								var kpi = {
									label : chartOption.xAxis.categories[x]
								};

								var value = getSeriesByDesc(chartOption.series, 'current');
								if(value && value.colorful && value.colorful.enabled === false){
									kpi.colorful = false;
								}else{
									kpi.colorful = true;
								}

								if(value && value.data && value.data[x]){
									kpi.value = value.data[x];
									kpi.unit = value.dataLabels.unit;
								}
								var compare = getSeriesByDesc(chartOption.series, 'compare');
								if(compare && compare.data && compare.data[x]){
									kpi.compare = compare.data[x];
								}

								kpis.push(kpi);
							}

							$scope.title = chartOption.title.text;
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
