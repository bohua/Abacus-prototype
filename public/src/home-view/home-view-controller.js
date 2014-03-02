/**
 * Created by Bli on 14-2-21.
 */
angular.module('home-view', ['ngRoute', 'bar-chart', 'line-chart'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.
			when('/', {templateUrl: '/src/home-view/home-view.tpl.html', controller: 'homeViewController'});
	}])
	.controller('homeViewController', [
		'$scope',
		'$http',
		'$timeout',
		function ($scope, $http, $timeout) {
			/*
			function getTomorrow(d,offset){
				if (!offset){
					offset = 1;
				}
				if(typeof(d) === "string"){
					var t = d.split("-");
					d = new Date(t[0],t[1] - 1, t[2]);
				}

				var d2 = new Date(d.setDate(d.getDate() + offset));
				//var d2 = new Date(d1.getTime() -1000);
				return d2.getFullYear()+'-'+(d2.getMonth()+1)+'-'+d2.getDate();
			}
			*/

			function getEndOfTheDay(start_date){
				return start_date.split(' ')[0] + " 23:59:59";
			}

			$scope.start_date = "2013-05-01 00:00:00";
			$scope.end_date = getEndOfTheDay($scope.start_date);

			$('.bleach-datefilter').datepicker({
				date: "2013-05-01", // set init date
				format: "yyyy-mm-dd", // set output format
				effect: "none", // none, slide, fade
				position: "bottom", // top or bottom
				locale: 'zhCN',
				selected: function (date) {
					$scope.start_date = date + " 00:00:00";
					$scope.end_date = getEndOfTheDay($scope.start_date);
					$scope.$apply();
				}
			});

			$scope.$watch('start_date', function (newValue, oldValue) {
				$('.home-view-chart').trigger('reloadChart', {
					start_date: $scope.start_date,
					end_date: $scope.end_date
				});
			});
		}]);