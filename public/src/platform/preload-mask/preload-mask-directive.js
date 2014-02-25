/**
 * Created by bli on 14-2-25.
 */
angular.module('preload-mask', [])
	.directive('preloadMaskDirective', function(){

	var preloadMask = {
		templateUrl: '/src/platform/preload-mask/preload-mask.tpl.html',
		scope: true,
		link: function($scope, $element, $attributes) {
			$scope.enablePreload = true;

			$scope.$on('emitPreloadMask', function(event, arg){
				$($element).animate({
					opacity: 0
				}, 500, function () {
					$scope.enablePreload = false;
				});
			});
			/*
			$scope.enablePreloadFn = function(){
				$scope.enablePreload = true;
				$scope.$apply();
			}

			$scope.disablePreloadFn = function(){
				$scope.enablePreload = false;
				$scope.$apply();
			}
			*/

		}
	};

	return preloadMask;
});