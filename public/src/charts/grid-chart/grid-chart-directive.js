/**
 * Created by Bli on 14-3-17.
 */
angular.module('chart')
	.directive('gridChart', ['$http', '$timeout', function ($http, $timeout) {

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
				aoColumns: [],
				aaData: []
			};

			//Generate th array
			//x-Axis
			grid.aoColumns.push({ "sTitle": d0.xAxis.name, "sClass": "center" });
			//series
			for (var s in d0.series) {
				grid.aoColumns.push({ "sTitle": d0.series[s].name, "sClass": "center" });
			}

			//Generate data rows
			for (var i = 0; i < d0.xAxis.categories.length; i++) {
				var row = [];

				//x-Axis data
				row.push(d0.xAxis.categories[i]);

				//series
				for (var s in d0.series) {
					var data = d0.series[s].data[i];
					if(data === null || data === undefined){
						data = ' ';
					}
					row.push(data);
				}

				grid.aaData.push(row);
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
							var grid = formatGridData(chartOption);
							$.extend(true, grid, {
								//"sScrollY": "250px",
								"fnInfoCallback": function( oSettings, iStart, iEnd, iMax, iTotal, sPre ) {
									return "当前显示: " +iStart +"至"+ iEnd + "(共" + iMax +"条)";
								},
								"oLanguage": {
									"oPaginate": {
										"sPrevious": "上一页",
										"sNext": "下一页",
										"sFirst": "首页",
										"sLast": "末页"
									}
								},
								"iDisplayLength": 10,
								"bPaginate": true,
								"bLengthChange": false,
								"bFilter": false,
								"sPaginationType": "full_numbers"
							});

							if ( $scope.gridChart ) {
								$scope.gridChart.fnDestroy();
							}
							$scope.gridChart = $($element).find(".bleach-grid-chart").dataTable(grid);
						});
				}

				$($element).on('reloadChart', reloadChart);
			}
		};
		return GridChart;
	}]);