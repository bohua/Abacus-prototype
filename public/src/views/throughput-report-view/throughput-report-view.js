/**
 * Created by 文远 on 2014/5/19.
 */
angular.module('throughput-report-view', ['ngRoute', 'chart', 'popup-dialog'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.
			when('/production/productionThroughputReport', {templateUrl: '/src/views/throughput-report-view/throughput-report-view.tpl.html', controller: 'throughputReportViewController'});
	}])
	.controller('throughputReportViewController', [
		'$scope',
		'$http',
		'$timeout',
		'$routeParams',
		function ($scope, $http, $timeout, $routeParams) {
			$scope.title = '流量分析';
		}]);