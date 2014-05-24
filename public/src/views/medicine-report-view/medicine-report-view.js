/**
 * Created by 文远 on 2014/5/19.
 */
angular.module('medicine-report-view', ['ngRoute', 'chart', 'popup-dialog'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.
			when('/production/productionMedicineReport/', {templateUrl: '/src/views/medicine-report-view/medicine-report-view.tpl.html', controller: 'medicineReportViewController'});
	}])
	.controller('medicineReportViewController', [
		'$scope',
		'$http',
		'$timeout',
		'$routeParams',
		function ($scope, $http, $timeout, $routeParams) {
			$scope.title = '药量分析';
		}]);