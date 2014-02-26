/**
 * Created by Bli on 14-2-10.
 */
angular.module('app', ['preload-mask', 'left-menu', 'router-guide', 'top-bar', 'product-view', 'home-view']).
	config(function ($routeProvider) {

	})
	.controller('appController', ['$scope', '$rootScope', '$timeout', '$location', function ($scope, $rootScope, $timeout, $location) {

		if ($location.path() !== '/') {
			$location.path('/');
		}

		/*
		$timeout(function(){
			$scope.$broadcast('emitPreloadMask', false);
		}, 400);
		*/
	}]);