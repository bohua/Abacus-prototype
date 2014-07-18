/**
 * Created by bli on 14-3-13.
 */
angular.module('app', [
	'login-session-service',
	'platform',
	'daily-report-view',
	'monthly-report-view',
	'cost-report-view',
	'medicine-report-view',
	'throughput-report-view'
]).controller('appController', [
	'$scope',
	'loginSessionService',
	function ($scope, loginSessionService) {
		/**
		 * Initialize global services
		 */
		loginSessionService.init();

		$scope.hasSignIn = loginSessionService.getLoginStatus();

		$scope.$on('loginSuccess', function () {
			$scope.hasSignIn = loginSessionService.getLoginStatus();
			$scope.$apply();
		});
	}]);