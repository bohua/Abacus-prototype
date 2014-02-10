/**
 * Created by Bli on 14-2-10.
 */

var bleach = angular.module('bleach',[]).controller('leftMenuController', ['$scope', '$http', function ($scope, $http) {
	$http.get('/getLeftMenu')
		.success(function(data){
			$scope.menu = data;
		});
}]);