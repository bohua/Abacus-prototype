/**
 * Created by Bli on 14-2-18.
 */
app.controller('routerGuideController', ['$scope', '$rootScope', function ($scope, $rootScope) {
	$scope.titles = $rootScope.titleArr;
}]);