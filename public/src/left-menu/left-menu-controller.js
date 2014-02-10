/**
 * Created by Bohua on 14-2-10.
 */

bleach.controller('leftMenuController', ['$scope', '$http', function ($scope, $http) {
	$http.get('/getLeftMenu')
		.success(function(data){
			$scope.menu = data;
		});
}]);