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
			$scope.medicineType = 'cl';
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
					medicine_type: $scope.medicineType,
					show_max: $scope.showMax,
					show_min: $scope.showMin
				});

				return options;
			}


			$timeout(function () {
				$('.medicine-report-view-chart').trigger('reloadChart', [gatherQueryOptions($scope)]);
			}, 100);

			$scope.$watch(function(){
				return $scope.showMax;
			}, function(newValue, oldValue){
				if(newValue !== oldValue && oldValue !== null){
					$('.medicine-report-view-chart').trigger('reloadChart', [gatherQueryOptions($scope)]);
				}
			})

			$scope.$watch(function(){
				return $scope.showMin;
			}, function(newValue, oldValue){
				if(newValue !== oldValue && oldValue !== null){
					$('.medicine-report-view-chart').trigger('reloadChart', [gatherQueryOptions($scope)]);
				}
			})

			$scope.$watch(function(){
				return $scope.medicineType;
			}, function(newValue, oldValue){
				if(newValue !== oldValue && oldValue !== null){
					$('.medicine-report-view-chart').trigger('reloadChart', [gatherQueryOptions($scope)]);
				}
			})
		}]);