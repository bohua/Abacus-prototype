/**
 * Created by Bli on 14-2-18.
 */
angular.module('router-guide', [])
	.controller('routerGuideController', [
		'$scope',
		'$rootScope',
		'$location',
		'routerGuideService',
		function ($scope, $rootScope,$location, routerGuideService) {
			//$scope.titles = $rootScope.titleArr;
			function generateRouterGuide(model) {
				$scope.titleArr = model;
			}

			routerGuideService.bindObserver(generateRouterGuide);

			$rootScope.$on("$locationChangeStart", function(event, next, current) {
				routerGuideService.resetModelByLocation(next);
			});

			routerGuideService.resetModelByLocation($location.$$absUrl);
		}]);