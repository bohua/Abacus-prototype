/**
 * Created by 文远 on 2014/5/19.
 */
angular.module('cost-report-view', ['ngRoute', 'chart', 'popup-dialog'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.
			when('/production/productionCostReport', {templateUrl: '/src/views/cost-report-view/cost-report-view.tpl.html', controller: 'costReportViewController'});
	}])
	.controller('costReportViewController', [
		'$scope',
		'$http',
		'$timeout',
		function ($scope, $http, $timeout) {
			$scope.title = '成本分析';
			$scope.showMax = true;
			$scope.showMin = true;

			$scope.startDateTime = '2013-05-01 00:00:00';
			$scope.endDateTime = '2013-06-01 00:00:00';

			function gatherQueryOptions($scope) {
				var options = [];

				options.push({
					data_desc: 'current',
					start_time: $scope.startDateTime,
					end_time: $scope.endDateTime,
					show_max: $scope.showMax,
					show_min: $scope.showMin
				});

				return options;
			}


			$timeout(function () {
				$('.cost-report-view-chart').trigger('reloadChart', [gatherQueryOptions($scope)]);
			}, 100);

			$scope.$watch(function(){
				return $scope.showMax;
			}, function(newValue, oldValue){
				if(newValue !== oldValue && oldValue !== null){
					$('.cost-report-view-chart').trigger('reloadChart', [gatherQueryOptions($scope)]);
				}
			})

			$scope.$watch(function(){
				return $scope.showMin;
			}, function(newValue, oldValue){
				if(newValue !== oldValue && oldValue !== null){
					$('.cost-report-view-chart').trigger('reloadChart', [gatherQueryOptions($scope)]);
				}
			})

		}]);