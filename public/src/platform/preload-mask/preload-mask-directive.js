/**
 * Created by bli on 14-2-25.
 */
angular.module('preload-mask', [])
	.directive('preloadMaskDirective', function () {

		var preloadMask = {
			templateUrl: '/src/platform/preload-mask/preload-mask.tpl.html',
			scope: true,
			link: function ($scope, $element, $attributes) {
				$scope.enablePreload = true;

				function enterSystem(event, arg) {
					$($element).animate({
						opacity: 0,
						top: '-100%'
					}, 1000, function () {
						$scope.enablePreload = false;

					});
				}

				$scope.$on('emitPreloadMask', enterSystem);


				$scope.login = function () {
					enterSystem();
				}
			}
		};

		return preloadMask;
	})
;