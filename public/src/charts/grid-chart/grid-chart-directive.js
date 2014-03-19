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

		function inArray(arr, obj) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].name === obj.name) {
					return i;
				}
			}

			return -1;
		}

		function formatGridData(d0) {
			var grid = {
				Columns_level_1: [],
				Columns_level_2: [],
				Data: []
			};

			//Generate th array
			//x-Axis
			grid.Columns_level_1.push({name: d0.xAxis.name, colspan:1, rowspan:2});
			//series
			for (var s in d0.series) {

				if (d0.series[s].group) {
					//a double layer column header
					grid.Columns_level_2.push({name:d0.series[s].name});
					var index = inArray(grid.Columns_level_1, {name: d0.series[s].group.name});
					if ( index > -1) {
						grid.Columns_level_1[index].colspan++;
					}else{
						grid.Columns_level_1.push({name: d0.series[s].group.name, colspan:1, rowspan:1});
					}
				} else {
					//a single layer column header
					grid.Columns_level_1.push({name: d0.series[s].name, colspan:1, rowspan:2});
				}
			}
			//caps
			//$.extend(true, grid.aoColumnCap, d0.headerCaps);

			//Generate data rows
			for (var i = 0; i < d0.xAxis.categories.length; i++) {
				var row = [];

				//x-Axis data
				row.push(d0.xAxis.categories[i]);

				//series
				for (var s in d0.series) {
					var data = d0.series[s].data[i];
					if (data === null || data === undefined) {
						data = ' ';
					}
					row.push(data);
				}

				grid.Data.push(row);
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
							/*
							 $.extend(true, grid, */
							var config = {
								//"sScrollY": "250px",
								"fnInfoCallback": function (oSettings, iStart, iEnd, iMax, iTotal, sPre) {
									return "当前显示: " + iStart + "至" + iEnd + "(共" + iMax + "条)";
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
							};


							$timeout(function () {
								if ($scope.gridChart) {
									$scope.gridChart.fnDestroy();
								}
								$scope.gridChart = $($element).find(".bleach-grid-chart").dataTable(config);
							}, 1);

						});
				}

				$($element).on('reloadChart', reloadChart);

				function resize() {
					var oTable = $scope.gridChart;
					$(oTable).css({ width: $(oTable).parent().width() });
					oTable.fnAdjustColumnSizing();
				};

				$(window).resize(resize);
			}
		};
		return GridChart;
	}]);