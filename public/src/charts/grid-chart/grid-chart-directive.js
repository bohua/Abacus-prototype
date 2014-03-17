/**
 * Created by Bli on 14-3-17.
 */
angular.module('chart')
	.directive('gridChart', ['$http', function ($http) {

		function getQueryString(queryOption) {
			var result;

			if ($.isArray(queryOption)) {
				result = JSON.stringify(queryOption);
			} else {
				result = JSON.stringify([queryOption]);
			}
			return result;
		}

		function formatGridData(d0) {
			var grid = {
				headers: [],
				data_rows: []
			};

			//Generate th array
			//x-Axis
			grid.headers.push(d0.xAxis.name);
			//series
			for(var s in d0.series){
				grid.headers.push(d0.series[s].name);
			}

			//Generate data rows
			for(var i=0; i< d0.xAxis.categories.length; i++){
				var row = [];

				//x-Axis data
				row.push(d0.xAxis.categories[i]);

				//series
				for(var s in d0.series){
					row.push(d0.series[s].data[i]);
				}

				grid.data_rows.push(row);
			}

			return grid;
		}

		var GridChart = {
			restrict: 'E',
			scope: {},
			templateUrl: '/src/charts/grid-chart/grid-chart-directive.tpl.html',
			link: function ($scope, $element, $attributes) {
				function reloadChart(event, queryOption, renderOption) {
					$http.get('/getReport', {
						params: {
							reportId: $attributes.reportId,
							series: getQueryString(queryOption)
						}
					}).success(function (chartOption) {
						$scope.grid = formatGridData(chartOption);

					});
				}

				$($element).on('reloadChart', reloadChart);
			}
		};
		return GridChart;
	}]);