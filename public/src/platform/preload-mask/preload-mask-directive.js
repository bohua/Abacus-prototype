/**
 * Created by bli on 14-2-25.
 */
angular.module('preload-mask', [])
	.directive('preloadMaskDirective', ['$http', function ($http) {

		var preloadMask = {
			templateUrl: '/src/platform/preload-mask/preload-mask.tpl.html',
			scope: true,
			link: function ($scope, $element, $attributes) {
				$scope.enablePreload = true;

				function enterSystem(event, arg) {
					$($element).animate({
						//opacity: 0,
						top: '-100%'
					}, 400, function () {
						$scope.enablePreload = false;

					});
				}

				$scope.$on('emitPreloadMask', enterSystem);


				$scope.login = function () {
					$http.post('/login', {user_name: 'admin', user_pass: 'admin'})
						.success(function (result) {
							if(!result.login_success){
								alert(result.reason_number);
							}else{
								enterSystem();
							}
						});

				}
			}
		};

		return preloadMask;
	}]);
;