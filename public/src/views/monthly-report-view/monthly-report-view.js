/**
 * Created by Bli on 14-2-21.
 */
angular.module('monthly-report-view', ['ngRoute', 'chart', 'popup-dialog'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.
			when('/production/productionMonthlyReport', {templateUrl: '/src/views/monthly-report-view/monthly-report-view.tpl.html', controller: 'monthlyReportViewController'});
	}])
	.controller('monthlyReportViewController', [
		'$scope',
		'$http',
		'$timeout',
		function ($scope, $http, $timeout) {

			var today = "2013-05";
			$scope.compareSeries = null;

			function getEndOfTheMonth(date) {
				var d0 = new Date(getStartOfTheMonth(date));
				var d1 = new Date(d0.setMonth(d0.getMonth() + 1));
				var d2 = new Date(d1.setDate(d1.getDate() - 1));
				return    new Date(d2).format("yyyy-mm-dd");
				//return lastday.getFullYear() + '-' + (lastday.getMonth()+1) + '-' + lastday.getDate();
			}

			function getStartOfTheMonth(date) {
				var d0 = new Date(date);
				var d2 = new Date(d0.setDate(1));
				return    new Date(d2).format("yyyy-mm-dd");
			}

			/*
			 function getYesterday(date) {
			 var timestamp = new Date(getStartOfTheDay(date)).getTime();
			 timestamp -= 86400000;

			 var d = new Date(timestamp);
			 //var d = d0.getFullYear() + '-' + (d0.getMonth()+1) + '-' + d0.getDate();
			 return d;
			 }
			 */

			function gatherQueryOptions($scope) {
				var options = [];

				if ($scope.compareSeries) {
					options.push($.extend(true, {}, $scope.compareSeries));
				}

				options.push({
					data_desc: 'current',
					start_time: $scope.start_time,
					end_time: $scope.end_time
				});

				return options;
			}


			$('.bleach-datefilter').datepicker({
				date: today, // set init date
				format: "yyyy-mm", // set output format
				selectMode: 'month',
				effect: "none", // none, slide, fade
				position: "bottom", // top or bottom
				locale: 'zhCN',
				weekStart: -1,
				selected: function (date) {
					$scope.start_time = getStartOfTheMonth(date);
					$scope.end_time = getEndOfTheMonth(date);
					$scope.$apply();

					$('.monthly-report-view-chart').trigger('reloadChart', [gatherQueryOptions($scope)]);
				}
			});

			$timeout(function () {
				$scope.start_time = getStartOfTheMonth(today);
				$scope.end_time = getEndOfTheMonth(today);

				$scope.$watch('start_time', function (newValue, oldValue) {
					//if(newValue === oldValue)return;

					$('.monthly-report-view-chart').trigger('reloadChart', [gatherQueryOptions($scope)]);
				});
			}, 100);

			$scope.comparisonDialogConfig = {
				dialogOption: {
					overlay: true,
					shadow: true,
					flat: true,
					icon: '<i class="icon-copy"></i>',
					title: '比较模式选择',
					padding: 10,
					width: 326,
					height: 450
				},

				calendarOption: {
					format: 'yyyy-mm-dd', //default 'yyyy-mm-dd'
					multiSelect: false, //default true (multi select date)
					startMode: 'day', //year, month, day
					//date: getYesterday(today), //the init calendar date (example: '2013-01-01' or '2012-01')
					locale: 'zhCN', // 'ru', 'ua', 'fr' or 'en', default is $.Metro.currentLocale
					otherDays: false, // show days for previous and next months,
					weekStart: -1 //start week from sunday - 0 or monday - 1
				}
			};

			$scope.enableCompare = function (date) {
				$scope.compareSeries = {
					data_desc: 'compare',
					start_time: getStartOfTheMonth(date),
					end_time: getEndOfTheMonth(date)
				};

				var icon = $('#filterPanel .btn-compare');
				icon.addClass('toggled');

				$('.monthly-report-view-chart').trigger('reloadChart', [gatherQueryOptions($scope)]);
			}

			$scope.disableCompare = function () {
				$scope.compareSeries = null;

				var icon = $('#filterPanel .btn-compare');
				icon.removeClass('toggled');
				$('.monthly-report-view-chart').trigger('reloadChart', [gatherQueryOptions($scope)]);
			}

			$scope.toggleData = true;
			$scope.toggleDataFun = function ($event) {
				var target = $($event.currentTarget);
				target.toggleClass('toggled');
				$scope.toggleData = target.hasClass('toggled');
			}
		}]);