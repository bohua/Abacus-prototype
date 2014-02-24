/**
 * Created by Bli on 14-2-18.
 */
angular.module('router-guide', [])
	.controller('routerGuideController', [
		'$scope',
		'$rootScope',
		'routerGuideService',
		function ($scope, $rootScope, routerGuideService) {
			//$scope.titles = $rootScope.titleArr;
			function generateRouterGuide(model) {
				$scope.titleArr = model;
			}

			routerGuideService.bindObserver(generateRouterGuide);

			$rootScope.$on("$locationChangeStart", function(event, next, current) {
				routerGuideService.resetModelByLocation(next);
			});

			//routerGuideService.resetModel(['home']);
		}]);