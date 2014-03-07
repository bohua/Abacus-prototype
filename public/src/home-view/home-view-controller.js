/**
 * Created by Bli on 14-2-21.
 */
angular.module('home-view', ['ngRoute', 'chart', 'popup-dialog'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.
			when('/', {templateUrl: '/src/home-view/home-view.tpl.html', controller: 'homeViewController'});
	}])
	.controller('homeViewController', [
		'$scope',
		'$http',
		'$timeout',
		function ($scope, $http, $timeout) {

			var today = "2013-05-10";
			var compareSeries;

			function getEndOfTheDay(date) {
				return date + " 23:59:59";
			}

			function getStartOfTheDay(date) {
				return date + " 00:00:00";
			}

			function getYesterday(date){
				var timestamp = new Date(getStartOfTheDay(date)).getTime();
				timestamp -= 86400000;

				var d = new Date(timestamp);
				//var d = d0.getFullYear() + '-' + (d0.getMonth()+1) + '-' + d0.getDate();
				return d;
			}

			function gatherQueryOptions(){
				var options = [];

				if(compareSeries){
					options.push(compareSeries);
				}

				options.push({
					start_date: $scope.start_date,
					end_date: $scope.end_date
				});
			}


			$('.bleach-datefilter').datepicker({
				date: today, // set init date
				format: "yyyy-mm-dd", // set output format
				effect: "none", // none, slide, fade
				position: "bottom", // top or bottom
				locale: 'zhCN',
				weekStart: -1,
				selected: function (date) {
					$scope.start_date = getStartOfTheDay(date);
					$scope.end_date = getEndOfTheDay(date);
					$scope.$apply();
				}
			});

			$timeout(function () {
				$scope.start_date = getStartOfTheDay(today);
				$scope.end_date = getEndOfTheDay(today);

				$scope.$watch('start_date', function (newValue, oldValue) {
					$('.home-view-chart').trigger('reloadChart', gatherQueryOptions());
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

				calendarOption:{
					format: 'yyyy-mm-dd', //default 'yyyy-mm-dd'
					multiSelect: false, //default true (multi select date)
					startMode: 'day', //year, month, day
					date: getYesterday(today), //the init calendar date (example: '2013-01-01' or '2012-01')
					locale: 'zhCN', // 'ru', 'ua', 'fr' or 'en', default is $.Metro.currentLocale
					otherDays: false, // show days for previous and next months,
					weekStart: -1 //start week from sunday - 0 or monday - 1
				}
			};

			$scope.compareData = function(date){
				compareSeries = {
					start_date: getStartOfTheDay(date),
					end_date: getEndOfTheDay(date)
				};

				$('.home-view-chart').trigger('reloadChart', gatherQueryOptions());
			}
		}]);