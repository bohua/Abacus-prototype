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
		function ($scope, $http) {
		}]);