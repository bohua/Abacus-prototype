/**
 * Created by Bli on 14-2-10.
 */
angular.module('app', ['preload-mask', 'left-menu', 'router-guide', 'top-bar', 'product-view']).
	config(function ($routeProvider) {

	})
	.controller('appController', ['$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {


		$timeout(function(){
			$scope.$broadcast('emitPreloadMask', false);
		}, 400);
	}]);