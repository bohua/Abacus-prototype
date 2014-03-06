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
			function getEndOfTheDay(date){
				return date + " 23:59:59";
			}

			function getStartOfTheDay(date){
				return date + " 00:00:00";
			}

			var today = "2013-05-01";

			$('.bleach-datefilter').datepicker({
				date: today, // set init date
				format: "yyyy-mm-dd", // set output format
				effect: "none", // none, slide, fade
				position: "bottom", // top or bottom
				locale: 'zhCN',
				selected: function (date) {
					$scope.start_date = getStartOfTheDay(date);
					$scope.end_date = getEndOfTheDay(date);
					$scope.$apply();
				}
			});

			$timeout(function(){
				$scope.start_date = getStartOfTheDay(today);
				$scope.end_date = getEndOfTheDay(today);

				$scope.$watch('start_date', function (newValue, oldValue) {
					$('.home-view-chart').trigger('reloadChart', {
						start_date: $scope.start_date,
						end_date: $scope.end_date
					});
				});
			}, 100);

		}]);