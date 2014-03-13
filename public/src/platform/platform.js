/**
 * Created by Bli on 14-2-10.
 */
angular.module('platform', ['ngRoute', /*'preload-mask', */'left-menu', 'router-guide', 'top-bar'])
	.config(function ($routeProvider) {

	})
	.controller('platformController', ['$scope', '$rootScope', '$timeout', '$location', function ($scope, $rootScope, $timeout, $location) {

		if ($location.path() !== '/') {
			$location.path('/');
		}

		/*
		 $timeout(function(){
		 $scope.$broadcast('emitPreloadMask', false);
		 }, 400);
		 */
	}]);